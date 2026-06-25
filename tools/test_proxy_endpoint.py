import requests

u = "https://avesis.omu.edu.tr/proxy/search"
tests = [
    ("GET", None, None),
    ("POST_JSON", {"query": "sinan"}, "json"),
    ("POST_FORM", {"query": "sinan"}, "form"),
    ("POST_RAW", "{}", "raw"),
]

s = requests.Session()
s.headers.update(
    {
        "User-Agent": "Mozilla/5.0",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://avesis.omu.edu.tr/arastirmaci-arama",
    }
)

for name, payload, kind in tests:
    try:
        if name == "GET":
            r = s.get(u, timeout=20)
        elif kind == "json":
            r = s.post(u, json=payload, timeout=20)
        elif kind == "form":
            r = s.post(u, data=payload, timeout=20)
        else:
            r = s.post(
                u,
                data=payload,
                headers={"Content-Type": "application/json"},
                timeout=20,
            )
        print(name, r.status_code, r.url, r.headers.get("content-type"))
        print(r.text[:180].replace("\n", " "))
    except Exception as e:
        print(name, "ERR", e)
