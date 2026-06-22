# Randevu Entegrasyon Notlari

Online randevu formu su an entegrasyona hazir durumdadir.

## 1) Webhook ile baglama
- `assets/js/app.js` icindeki `config.webhookUrl` degerine endpoint URL yazin.
- Form JSON olarak POST edilir.

## 2) Google Sheets ile baglama
- Google Drive'da yeni bir Google Sheets olusturun.
- Extensions > Apps Script acin.
- Projedeki `GOOGLE_APPS_SCRIPT_CODE.gs` icerigini yapistirin.
- `NOTIFICATION_EMAIL` degerini kendi e-posta adresinizle degistirin.
- Deploy > New Deployment > Web app secin.
- Execute as: Me, Who has access: Anyone secin.
- Deploy edin ve URL'yi kopyalayin.
- `randevu.html` dosyasinda `window.MV_CONFIG.googleAppsScriptUrl` alanina URL'yi yapistirin.
- Form verileri `FormData` olarak Google Sheets'e gonderilir.
- Her yeni kayitta belirttiginiz e-posta adresine otomatik bildirim gider.

Ornek:
```html
<script>
	window.MV_CONFIG = {
		webhookUrl: "",
		googleAppsScriptUrl: "BURAYA_APPS_SCRIPT_URL"
	};
</script>
```

## 3) Entegrasyon yoksa ne olur?
- Form verisi tarayici `localStorage` icine kaydedilir.
- Anahtar: `mv_appointment_requests`

## Oneri
- Canli kullanimda `file:///` yerine Live Server kullanin.
- HTTPS endpoint kullanin.
