# Mustafa Vural - Proje Demo

Bu rehber, öğretmene uygulamalı göstermek için hızlı demo adımlarını içerir. Amaç: proje Docker ile ayağa kalksın, MySQL içinde `appointments` tablosu görünsün ve front-end formu `/api/randevu` endpointine veri göndersin.

Ön koşullar
- Windows veya Linux bilgisayar
- Docker & Docker Compose kurulu
- DBeaver (isteğe bağlı, ama demo için gerekli)

Hızlı başlatma
1. `.env.example` dosyasını kopyalayın ve güvenli şifrelerle `.env` oluşturun:

```powershell
copy .env.example .env
# ardından Notepad ile .env içindeki şifreleri değiştirin
```

2. Docker ile uygulamayı ayağa kaldırın:

```powershell
docker-compose up -d --build
```

3. Health kontrol (tarayıcıda veya terminalde):

```powershell
Invoke-RestMethod http://localhost:3000/api/health
# json { "ok": true } dönmesi beklenir
```

Öğretmene göstermelik adımlar
- Terminalde `docker-compose ps` çıktısını gösterin (db ve app çalışıyor).
- `curl` veya PowerShell ile aşağıdaki örnek POST isteğini gönderin:

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3000/api/randevu -ContentType 'application/json' -Body (@{ adSoyad='Demo Ogrenci'; telefon='+900000000000'; email='demo@example.com'; tedavi='Kontrol'; tarih='2026-06-15'; saat='10:00'; not='Demo' } | ConvertTo-Json)
```

- Başarılı yanıt geldiyse DBeaver ile veritabanına bağlanıp `mv_clinic.appointments` tablosundaki kaydı gösterin.

DBeaver bağlantı bilgileri
- Host: `localhost`
- Port: `3306`
- Database: `mv_clinic`
- User / Password: `.env` içindeki `MYSQL_USER` / `MYSQL_PASSWORD`

Eğer başka bilgisayarda gösterecekseniz
- Proje klasörünü paylaşın (zip veya git). Alıcı:
  - `.env` dosyasını oluşturacak
  - `docker-compose up -d --build` çalıştıracak
  - DBeaver ile bağlanacak

Demo kontrol listesi (sınav anında gösterilecek)
1. `docker-compose ps` — konteynerlerin çalıştığını göster
2. `http://localhost:3000/api/health` — API sağlığı
3. Formu kullanarak randevu gönder (site üzerinden veya curl/Invoke-RestMethod)
4. DBeaver ile tabloyu açıp kaydı doğrula

Notlar ve ipuçları
- `.env` dosyasını paylaşmayın; örnek `.env.example` kullanın.
- Eğer API erişimi hata verirse `docker logs` ile `backend` servisinin loglarını gösterin.
- Production için MySQL'i yönetilen bir servis (RDS/Cloud SQL) kullanın.
# Mustafa Vural Dis Kliniği Web Sitesi

Bu proje, kliniğin tanıtım sitesi ve online randevu sistemini bir arada sunar.

## Bilesenler

- HTML/CSS/JS tabanlı çok sayfalı web sitesi
- Node.js + Express API
- MySQL veritabanı
- Docker ve Docker Compose ile taşınabilir kurulum
- DBeaver ile veritabanı yönetimi

## Hızlı Başlangıç

1. `.env.example` dosyasını `.env` olarak kopyalayın ve gerekirse değerleri düzenleyin.
2. Bağımlılıkları kurun:

```bash
npm install
```

3. Sunucuyu çalıştırın:

```bash
npm start
```

4. Tarayıcıda açın:

```text
http://localhost:3000
```

## Docker ile Çalıştırma

```bash
docker compose --env-file .env up -d --build
```

Sonra siteyi şu adresten açın:

```text
http://localhost:3000
```

## DBeaver Bağlantısı

- Host: `localhost`
- Port: `3306`
- Database: `mustafa_vural_clinic`
- User: `.env` içindeki `MYSQL_USER`
- Password: `.env` içindeki `MYSQL_PASSWORD`

## Randevu Akışı

- Form verisi önce `/api/randevu` adresine gider.
- API yoksa form tarayıcıda geçici olarak saklanır.
- MySQL tablosu `appointments` adını kullanır.

## Admin Paneli

- Yönetim ekranı için `admin.html` sayfası eklendi.
- Panel, anasayfa, hizmetler, tedaviler, ekip, yorumlar, randevu ve yasal sayfalar dahil olmak üzere tüm site içeriğini tek yerden düzenler.
- Varsayılan demo parolası `panel1234` olarak ayarlanmıştır; üretimde `.env` içinden `ADMIN_PASSWORD` belirleyin.
- Panel ve randevu verileri `db.json` dosyasında saklanır; hoca bilgisayarında ek veritabanı kurulumu gerekmez.

## Sonraki Adım

Bu temel yapı hazır olduktan sonra otomasyon sistemi için e-posta, WhatsApp, SMS ya da panel tarafını ekleyebiliriz.