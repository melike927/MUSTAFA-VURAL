import re
import requests

url = "https://avesis.omu.edu.tr/Content/mainpage/vendor/searchkit/researcher-search"
text = requests.get(url, timeout=30).text
print("len", len(text))

keys = [
    "searchUrl",
    "proxy/search",
    "fetch(",
    "axios",
    "XMLHttpRequest",
    "Algolia",
    "elastic",
    "host",
    "Authorization",
    "apiKey",
    "index",
    "researcher",
]
for k in keys:
    print(k, text.find(k))

print("\n--- lines with proxy/search ---")
for m in re.finditer(r".{0,120}proxy/search.{0,200}", text, re.IGNORECASE):
    print(m.group(0))

print("\n--- lines with searchkit ---")
for m in re.finditer(r".{0,100}searchkit.{0,180}", text, re.IGNORECASE):
    s = m.group(0)
    if "Content/mainpage/vendor/searchkit" not in s:
        print(s)

print("\n--- possible urls ---")
urls = sorted(set(re.findall(r"https?://[^\"'\s)]+", text)))
for u in urls[:100]:
    print(u)
