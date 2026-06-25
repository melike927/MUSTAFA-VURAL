const DEFAULT_CONTENT = {
  site: {
    topStrip: "Acil Dis Destegi: 7/24 Danisma Hatti",
    phone: "+90 555 555 00 00",
    address: "Atakum / Samsun",
    email: "iletisim@mustafavuraldis.com",
    footerTitle: "MUSTAFA VURAL",
    footerDescription: "Modern dis hekimligi yaklasimi ile guvenli ve konforlu tedavi deneyimi.",
    footerYear: "2026 Mustafa Vural Dis Klinigi. Tum haklari saklidir.",
  },
  home: {
    title: "ANASAYFA",
    kicker: "MODERN DIS KLINIGI",
    heroTitle: "Gülüşünüzü planlayan profesyonel diş hekimliği deneyimi.",
    summary:
      "Dijital tanı, estetik planlama ve şeffaf iletişim ile size özel bir tedavi deneyimi sunuyoruz.",
    buttons: [
      { label: "Online Randevu Al", href: "randevu.html" },
      { label: "Hakkımızda", href: "about.html" },
    ],
    stats: [
      { value: "15+", label: "Yıl Deneyim" },
      { value: "4.9/5", label: "Hasta Memnuniyeti" },
      { value: "7/24", label: "Danışma Hattı" },
    ],
    highlights: [
      { title: "Dijital Tanı", text: "3D görüntüleme ve detaylı planlama ile net kararlar veriyoruz." },
      { title: "Kişiye Özel Tedavi", text: "Her hasta için ayrı ilerleyen, kontrollü ve konforlu süreçler tasarlıyoruz." },
      { title: "Konforlu Klinik", text: "Steril, modern ve güven veren bir klinik deneyimi sunuyoruz." },
    ],
    featureCards: [
      { title: "Hızlı Randevu", text: "Dakikalar içinde form doldurarak uygun tarih için talep oluşturabilirsiniz." },
      { title: "Uzman Ekip", text: "Tedavi planı farklı branşlardan deneyimli hekimlerle birlikte hazırlanır." },
      { title: "Acil Destek", text: "Gerekli durumlarda hızlı iletişim için danışma hattımız aktiftir." },
    ],
  },
  about: {
    title: "HAKKIMIZDA",
    heroTitle: "Mustafa VURAL Kliniğe Hoş Geldiniz",
    paragraphs: [
      "DentCare Clinic olarak hastalarımıza güven, hijyen ve yüksek tedavi kalitesi sunmayı temel ilke edindik.",
      "Ekibimiz, estetik ve fonksiyonel ağız sağlığını birlikte ele alır. Her tedavi planını kişiye özel hazırlayarak doğal, sağlıklı ve uzun ömürlü gülüşler hedefleriz.",
    ],
    detailCards: [
      { title: "Çalışma Saatleri", text: "Pazartesi - Cumartesi: 09:00 - 19:00" },
      { title: "Uzman Yaklaşım", text: "Alanında deneyimli diş hekimleri ile kişiye özel tedavi planlaması." },
      { title: "Hasta Konforu", text: "Modern klinik altyapısı, steril ortam ve şeffaf bilgilendirme süreçleri." },
    ],
    buttons: [
      { label: "Online Randevu", href: "randevu.html" },
      { label: "Hizmetlerimizi Gör", href: "hizmetler.html" },
      { label: "Bize Ulaşın", href: "#iletisim" },
    ],
    contactCards: [
      { title: "Adres", text: "Atakum, Samsun" },
      { title: "Telefon", text: "+90 555 555 00 00" },
      { title: "E-posta", text: "iletisim@mustafavuraldis.com" },
    ],
    mapUrl: "https://maps.google.com/maps?q=Samsun%20Atakum&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  services: {
    title: "HIZMETLER",
    slogan: "Koruyucu, estetik ve uzmanlık odaklı tüm diş hekimliği hizmetleri tek merkezde.",
    intro:
      "Kliniğimizde koruyucu diş hekimliğinden estetik uygulamalara kadar geniş kapsamlı hizmetler sunulmaktadır. Amacımız, her hastamız için doğru tanı, kişiye özel planlama ve uzun vadeli ağız sağlığı sağlamaktır.",
    cards: [
      {
        title: "Genel Dis Muayenesi",
        text: "Düzenli kontrol, erken teşhis ve kişisel ağız bakım planı oluşturma.",
      },
      {
        title: "Estetik Dis Hekimligi",
        text: "Gülüş tasarımı, diş beyazlatma ve estetik restorasyon uygulamaları.",
      },
      {
        title: "Ortodontik Degerlendirme",
        text: "Diş dizilimi ve çene yapısına yönelik kapsamlı analiz ve yönlendirme.",
      },
      {
        title: "Pedodonti",
        text: "Çocuklara özel koruyucu tedavi ve alışkanlık kazandıran takip programları.",
      },
    ],
    faqs: [
      {
        question: "İlk muayene ne kadar sürer?",
        answer: "Ortalama 20-30 dakika sürer ve tüm ağız içi durum detaylı olarak değerlendirilir.",
      },
      {
        question: "Dis beyazlatma islemi zararli midir?",
        answer: "Uzman hekim kontrolunde yapildiginda dis yapisina uygun ve guvenli bir uygulamadir.",
      },
      {
        question: "Çocuklar ne zaman ilk kontrole gelmeli?",
        answer: "İlk diş çıktıktan sonra veya en geç 1 yaş civarında ilk muayene önerilir.",
      },
    ],
  },
  treatments: {
    title: "TEDAVILER",
    slogan: "Her tedavi oncesi planlama, uygulama ve kontrol adimlariyla kalici sonuc odakli ilerliyoruz.",
    intro:
      "Tedavilerimiz; detayli muayene, dijital planlama ve uzun vadeli takip adimlariyla uygulanir. Her hasta icin en uygun yontemi belirleyerek hem estetik hem de fonksiyonel sonuc hedefleriz.",
    cards: [
      {
        title: "Implant Tedavisi",
        text: "Eksik diş bölgeleri için kalıcı ve fonksiyonel çözümler.",
        image:
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=80",
        alt: "Dis implant tedavisi",
      },
      {
        title: "Dis Beyazlatma",
        text: "Daha aydınlık bir gülüş için kontrollü estetik uygulamalar.",
        image:
          "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=700&q=80",
        alt: "Dis beyazlatma tedavisi",
      },
      {
        title: "Ortodontik Tedavi",
        text: "Diş dizilimini düzenleyen planlı ve takipli tedavi yaklaşımı.",
        image:
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80",
        alt: "Ortodonti tedavisi",
      },
    ],
    comparisons: [
      {
        title: "Oncesi",
        text: "Renklenme, eksik dis veya caprasiklik gibi sorunlar detayli analiz edilir.",
      },
      {
        title: "Sonrasi",
        text: "Fonksiyonel cigneme, estetik gulus ve uzun sureli korunabilir bir sonuc hedeflenir.",
      },
    ],
  },
  team: {
    title: "EKIBIMIZ",
    slogan: "Uzmanlik, deneyim ve hasta odakli iletisim prensibi ile calisan profesyonel ekip.",
    intro:
      "Ekibimiz, farkli uzmanlik alanlarinda deneyimli dis hekimlerinden olusur. Her hastaya ozel yaklasimla, guvenilir tedavi ve surekli bilgilendirme sunariz.",
    cards: [
      {
        title: "Dt. Elif Kara",
        text: "Estetik dis hekimligi ve gulus tasarimi alaninda uzmanlasmistir. 12+ yil deneyim.",
      },
      {
        title: "Dt. Mert Yildiz",
        text: "Implantoloji ve cerrahi planlama sureclerinde gorev almaktadir. Uluslararasi sertifikalara sahiptir.",
      },
      {
        title: "Dt. Zeynep Arin",
        text: "Pedodonti ve koruyucu dis hekimligi uygulamalarinda deneyimlidir. Cocuk hasta iletisiminde uzmandir.",
      },
      {
        title: "Uzm. Hekim Asistani",
        text: "Hasta koordinasyonu, randevu takibi ve tedavi sureci bilgilendirmelerinde aktif destek saglar.",
      },
    ],
  },
  reviews: {
    title: "YORUMLAR",
    slogan: "Gercek hasta deneyimlerine dayali geri bildirimler ile surekli gelisim odakli yaklasim.",
    intro:
      "Hasta memnuniyeti bizim icin en onemli gostergedir. Asagidaki yorumlar, klinigimizde tedavi olan danisanlarimizin deneyimlerinden secilmis orneklerdir.",
    cards: [
      {
        name: "Ayse K.",
        rating: "5/5",
        meta: "★★★★★ | Dogrulanmis Hasta | 02.03.2026",
        avatar: "assets/images/female-profile-logo.svg",
        text: "Ilk muayeneden itibaren cok acik bilgilendirildim. Tedavi sureci planli ve rahat gecti.",
      },
      {
        name: "Mehmet T.",
        rating: "5/5",
        meta: "★★★★★ | Dogrulanmis Hasta | 17.02.2026",
        avatar: "assets/images/male-profile-logo.svg",
        text: "Implant tedavimde ekip son derece ilgiliydi. Hijyen ve ilgi konusunda gercekten cok iyiler.",
      },
      {
        name: "Selin D.",
        rating: "4.9/5",
        meta: "★★★★☆ | Dogrulanmis Hasta | 29.01.2026",
        avatar: "assets/images/female-profile-logo.svg",
        text: "Cocuk dis hekimligi randevusunda kizim cok rahatti. Hekimlerin iletisimi cok basariliydi.",
      },
      {
        name: "Emre Y.",
        rating: "5/5",
        meta: "★★★★★ | Dogrulanmis Hasta | 12.01.2026",
        avatar: "assets/images/male-profile-logo.svg",
        text: "Randevu planlama hizliydi, islemler zamaninda basladi. Gulus tasarimi sonucumdan memnunum.",
      },
    ],
  },
  appointment: {
    title: "ONLINE RANDEVU",
    slogan: "Dakikalar icinde randevu talebi olusturun, ekibimiz size hizla donus yapsin.",
    intro:
      "Online randevu panelinden ihtiyac duydugunuz tedavi turunu secerek kolayca talep olusturabilirsiniz. Uygun saat secimi sonrasinda ekibimiz en kisa surede sizinle iletisime gecer.",
    quickCards: [
      {
        title: "Genel Muayene Randevusu",
        image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=700&q=80",
        alt: "Genel muayene randevusu",
      },
      {
        title: "Estetik Tedavi Randevusu",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=700&q=80",
        alt: "Estetik dis tedavisi randevusu",
      },
      {
        title: "Cocuk Dis Hekimligi",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=700&q=80",
        alt: "Cocuk dis hekimligi randevusu",
      },
    ],
    steps: [
      {
        title: "1. Tedavi Turunu Secin",
        text: "Ihtiyaciniza uygun randevu turunu secerek sureci baslatin.",
      },
      {
        title: "2. Saat Talebi Olusturun",
        text: "Size uygun tarih ve saat araligini belirterek formu tamamlayin.",
      },
      {
        title: "3. Onay Bilgisi Alin",
        text: "Ekibimiz tarafindan randevu onayi telefon veya mesaj ile iletilir.",
      },
      {
        title: "4. Kliniğe Gelis",
        text: "Randevu saatinde kliniğe gelerek tedavi surecinizi baslatabilirsiniz.",
      },
    ],
    formNote: "Form, webhook veya Google Sheets baglantisi icin hazirdir.",
    treatmentOptions: [
      "Genel Muayene",
      "Estetik Dis Tedavisi",
      "Cocuk Dis Hekimligi",
      "Implant Tedavisi",
    ],
  },
  kvkk: {
    title: "KVKK",
    intro:
      "Kisisel verileriniz, 6698 sayili Kisisel Verilerin Korunmasi Kanunu kapsaminda sadece saglik hizmeti sunumu, randevu yonetimi ve yasal yukumluluklerin yerine getirilmesi amaciyla islenmektedir.",
    cards: [
      { title: "Islenen Veriler", text: "Kimlik, iletisim, saglik ve randevu bilgileri." },
      { title: "Isleme Amaci", text: "Tani, tedavi, takip ve iletisim sureclerinin yurutilmesi." },
      { title: "Haklariniz", text: "Bilgi talep etme, duzeltme, silme ve itiraz haklarina sahipsiniz." },
      { title: "Basvuru", text: "kvkk@mustafavuraldis.com adresinden bize ulasabilirsiniz." },
    ],
  },
  patientrights: {
    title: "HASTA HAKLARI",
    intro:
      "Her hastamiz, bilgilendirilme, mahremiyet, guvenli tedavi, onam verme ve tedavi surecine aktif katilim haklarina sahiptir.",
    cards: [
      { title: "Bilgilendirilme Hakki", text: "Tedavi secenekleri, sure ve maliyet konusunda acik bilgi alma hakki." },
      { title: "Mahremiyet Hakki", text: "Muayene ve veri guvenligi sureclerinde gizlilige oncelik verilir." },
      { title: "Onam Hakki", text: "Islem oncesi bilgilendirilmis onamla karar verme surecine katilim." },
      { title: "Gorus ve Itiraz Hakki", text: "Geri bildirim, sikayet ve ikinci gorus taleplerinizi iletebilirsiniz." },
    ],
  },
  emergency: {
    title: "ACIL DURUM BILGISI",
    intro:
      "Siddetli agrı, travma, kirik dis veya kanama gibi durumlarda 7/24 danisma hattimizi arayabilirsiniz.",
    cards: [
      { title: "Hemen Arayin", text: "+90 555 555 00 00" },
      { title: "Klinik Saatleri", text: "Pazartesi - Cumartesi: 09:00 - 19:00" },
      { title: "Mesai Disi Yonlendirme", text: "Acil dis travmalarinda en yakin acil servise basvurun." },
      { title: "On Bilgilendirme", text: "Telefonla semptomlariniz alinip uygun yonlendirme yapilir." },
    ],
  },
};

const SUPPORTED_CONTENT_PAGES = new Set([
  "site",
  "home",
  "about",
  "services",
  "treatments",
  "team",
  "reviews",
  "appointment",
  "kvkk",
  "patientrights",
  "emergency",
]);

function getDefaultContent(pageKey) {
  const content = DEFAULT_CONTENT[pageKey];
  if (!content) {
    return null;
  }

  return JSON.parse(JSON.stringify(content));
}

function isSupportedContentPage(pageKey) {
  return SUPPORTED_CONTENT_PAGES.has(pageKey);
}

module.exports = {
  DEFAULT_CONTENT,
  getDefaultContent,
  isSupportedContentPage,
};