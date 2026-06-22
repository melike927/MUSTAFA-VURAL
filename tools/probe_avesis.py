import re
import requests
from bs4 import BeautifulSoup

urls = [
    "https://avesis.omu.edu.tr/arastirmaci-arama",
    "https://avesis.omu.edu.tr/arama",
    "https://avesis.omu.edu.tr/detayli-arama",
]

for url in urls:
    print("\n===", url)
    r = requests.get(url, timeout=30)
    print("status", r.status_code, "len", len(r.text))
    soup = BeautifulSoup(r.text, "lxml")
    hrefs = []
    for a in soup.find_all("a", href=True):
        h = a["href"].strip()
        if h.startswith("/") and h.count("/") == 1 and len(h) > 1:
            hrefs.append(h)
        if h.startswith("https://avesis.omu.edu.tr/"):
            tail = h.replace("https://avesis.omu.edu.tr", "")
            if tail.startswith("/") and tail.count("/") == 1 and len(tail) > 1:
                hrefs.append(tail)
    uniq = sorted(set(hrefs))
    print("single-segment href count", len(uniq))
    print("sample", uniq[:40])

    if "Sinan" in r.text or "Şafak" in r.text:
        print("contains sample name text")

    # Print probable API endpoints found in scripts
    scripts_text = "\n".join((s.get_text(" ", strip=True) or "") + " " + (s.get("src") or "") for s in soup.find_all("script"))
    apis = sorted(set(re.findall(r"/[A-Za-z0-9_\-]+(?:/[A-Za-z0-9_\-]+)*(?:\?[A-Za-z0-9_\-=&%]+)?", scripts_text)))
    apis = [x for x in apis if any(k in x.lower() for k in ["arama", "search", "research", "user", "profile", "mail", "contact"])]
    print("api-like", apis[:40])
