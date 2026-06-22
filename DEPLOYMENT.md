# Vercel Deployment Rehberi

## Ön Adımlar

1. Projeyi GitHub'a push et:

```bash
git add .
git commit -m "Admin panel Vercel Functions + KV integration"
git push
```

2. [Vercel Dashboard](https://vercel.com/dashboard) açıp **"Add New..."** → **"Project"** seç
3. GitHub depoyu seç ve **"Import"** butonuna tıkla

## Vercel KV Konfigürasyonu

1. Yeni import edilen projenin dashboard'ında **"Storage"** sekmesini seç
2. **"Create"** butonuna tıkla → **"KV"** seç
3. İsim: `redis-store` (veya istediğin ad)
4. Region: En yakın bölgeyi seç (örn. `ewr1` US için)
5. **"Create"** butonuna tıkla
6. KV başarıyla oluşturulduktan sonra otomatik olarak `.env.production.local` güncellenir

## Environment Variables

KV oluşturulduktan sonra aşağıdaki env vars otomatik olarak set edilir:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

Eğer manuel olarak eklemek gerekirse:

1. Proje ayarları → **"Environment Variables"**
2. KV dashboard'ından değerleri kopyala-yapıştır

## Deployment Tamamlama

1. KV setup tamamlandıktan sonra Vercel otomatik olarak redeploy yapacak
2. Deployment sekmesinde durumu takip et
3. Tamamlandığında `https://your-project.vercel.app/` adresine git

## Admin Paneline Erişim

- URL: `https://your-project.vercel.app/admin.html`
- Parola: `.env.production` içindeki `ADMIN_PASSWORD` (varsayılan: `panel1234`)

## Public Sayfalara Erişim

- Ana sayfa: `https://your-project.vercel.app/`
- Tüm diğer sayfalar normal şekilde çalışacak

## Vercel Functions API Endpoints

Tüm API endpoint'leri `/api/` altında çalışır:

- `GET /api/health` — Sağlık kontrol
- `POST /api/admin/login` — Admin giriş
- `GET /api/admin/content` — Tüm içeriği al (admin)
- `GET/PUT /api/content/[pageKey]` — Sayfa içeriği
- `GET/POST /api/randevu` — Randevu listesi / yeni randevu

## Sorun Giderme

### KV Bağlantı Hatası

KV henüz sync edilmemişse projeyi yeniden deploy et:

```
Vercel Dashboard → Deployments → [Son deployment] → Redeploy
```

### Admin Girişi Başarısız

1. `KV_REST_API_URL` ve `KV_REST_API_TOKEN` env vars'ında set olduğundan emin ol
2. Vercel dashboard'da **"Functions"** sekmesini açıp error log'larını kontrol et

### Randevu Kaydı Başarısız

Lokal ortamda test et:

```bash
npm install
npm start
```

Lokal olarak `http://localhost:3000/admin.html` açıp admin panelini test et.

## Lokal Development

Lokal olarak çalıştırmak için:

```bash
npm install
npm start
# Sunucu: http://localhost:3000
```

Bu durumda veri `db.json` dosyasında saklanır (KV değil).
