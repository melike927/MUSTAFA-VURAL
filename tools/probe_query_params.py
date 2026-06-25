import requests
from bs4 import BeautifulSoup

name = "Mehmet Tütüncü"
params_list = [
    {"q": name},
    {"query": name},
    {"text": name},
    {"keyword": name},
    {"name": name},
    {"search": name},
    {"term": name},
    {"filter": name},
    {"scope": "All", "q": name},
]

for params in params_list:
    url = "https://avesis.omu.edu.tr/arastirmaci-arama"
    r = requests.get(url, params=params, timeout=30)
    txt = r.text
    soup = BeautifulSoup(txt, "lxml")
    hrefs = []
    for a in soup.find_all("a", href=True):
        h = a["href"]
        if h.startswith("https://avesis.omu.edu.tr/"):
            h = h.replace("https://avesis.omu.edu.tr", "")
        if h.startswith("/") and h.count("/") == 1 and h not in ["/hakkinda", "/iletisim", "/researcher"]:
            hrefs.append(h)
    print("params", params, "status", r.status_code, "len", len(txt), "contains_name", ("Mehmet" in txt or "Tütün" in txt), "hrefs", sorted(set(hrefs))[:10])
