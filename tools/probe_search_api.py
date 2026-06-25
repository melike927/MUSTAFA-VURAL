import json
import re
import requests

base = "https://avesis.omu.edu.tr"
js_url = base + "/Content/mainpage/vendor/searchkit/researcher-search"
js = requests.get(js_url, timeout=30).text
print("js status len", len(js))
for token in ["/proxy/search", "search/getdepartments", "search/getprograms", "_search", "researchers", "email", "mail"]:
    if token in js:
        print("contains", token)

# Print some lines around proxy/search
idx = js.find("/proxy/search")
if idx != -1:
    print("\ncontext around /proxy/search:")
    print(js[max(0, idx-300):idx+500])

# Try a few likely API payloads
candidates = [
    {"url": base + "/proxy/search", "json": {"query": "sinan"}},
    {"url": base + "/proxy/search", "json": {"q": "sinan"}},
    {"url": base + "/proxy/search", "json": {"scope": "All", "query": "sinan"}},
    {"url": base + "/proxy/search", "json": {"size": 5, "query": {"match": {"name": "sinan"}}}},
]
for i, c in enumerate(candidates, 1):
    try:
        r = requests.post(c["url"], json=c["json"], timeout=30)
        print(f"cand {i} status", r.status_code, "ct", r.headers.get("content-type"))
        print(r.text[:300])
    except Exception as e:
        print("cand", i, "err", e)
