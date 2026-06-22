var NOTIFICATION_EMAIL = 'ornek@mail.com';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Randevular');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Randevular');
      sheet.appendRow(['TarihSaat', 'AdSoyad', 'Telefon', 'Email', 'Tedavi', 'Tarih', 'Saat', 'Not']);
    }

    var data = e.parameter;
    sheet.appendRow([
      new Date(),
      data.adSoyad || '',
      data.telefon || '',
      data.email || '',
      data.tedavi || '',
      data.tarih || '',
      data.saat || '',
      data.not || ''
    ]);

    // Yeni randevu kaydi olusunca klinik e-posta adresine bildirim gonderilir.
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== 'ornek@mail.com') {
      var subject = 'Yeni Online Randevu Talebi';
      var body =
        'Yeni bir randevu talebi alindi.\n\n' +
        'Ad Soyad: ' + (data.adSoyad || '-') + '\n' +
        'Telefon: ' + (data.telefon || '-') + '\n' +
        'E-posta: ' + (data.email || '-') + '\n' +
        'Tedavi: ' + (data.tedavi || '-') + '\n' +
        'Tarih: ' + (data.tarih || '-') + '\n' +
        'Saat: ' + (data.saat || '-') + '\n' +
        'Not: ' + (data.not || '-');

      MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
