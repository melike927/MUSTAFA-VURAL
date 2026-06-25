const DEFAULT_CONTENT = {
  site: {
    topStrip: "Acil Dış Desteği: 7/24 Danışma Hattı",
    phone: "+90 555 555 00 00",
    address: "Atakum / Samsun",
    email: "iletisim@mustafavuraldis.com",
    footerTitle: "MUSTAFA VURAL",
    footerDescription: "Modern diş hekimliği yaklaşımı ile güvenli ve konforlu tedavi deneyimi.",
    footerYear: "2026 Mustafa Vural Diş Kliniği. Tüm hakları saklıdır.",
  },
  home: {
    title: "ANASAYFA",
    kicker: "MODERN DİŞ KLİNİĞİ",
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
    title: "HİZMETLER",
    slogan: "Koruyucu, estetik ve uzmanlık odaklı tüm diş hekimliği hizmetleri tek merkezde.",
    faqTitle: "Sık Sorulan Sorular",
    intro:
      "Kliniğimizde koruyucu diş hekimliğinden estetik uygulamalara kadar geniş kapsamlı hizmetler sunulmaktadır. Amacımız, her hastamız için doğru tanı, kişiye özel planlama ve uzun vadeli ağız sağlığı sağlamaktır.",
    cards: [
      {
        title: "Genel Diş Muayenesi",
        text: "Düzenli kontrol, erken teşhis ve kişisel ağız bakım planı oluşturma.",
      },
      {
        title: "Estetik Diş Hekimliği",
        text: "Gülüş tasarımı, diş beyazlatma ve estetik restorasyon uygulamaları.",
      },
      {
        title: "Ortodontik Değerlendirme",
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
        question: "Diş beyazlatma işlemi zararlı mıdır?",
        answer: "Uzman hekim kontrolünde yapıldığında diş yapısına uygun ve güvenli bir uygulamadır.",
      },
      {
        question: "Çocuklar ne zaman ilk kontrole gelmeli?",
        answer: "İlk diş çıktıktan sonra veya en geç 1 yaş civarında ilk muayene önerilir.",
      },
    ],
  },
  treatments: {
    title: "TEDAVİLER",
    slogan: "Her tedavi öncesi planlama, uygulama ve kontrol adımlarıyla kalıcı sonuç odaklı ilerliyoruz.",
    intro:
      "Tedavilerimiz; detaylı muayene, dijital planlama ve uzun vadeli takip adımlarıyla uygulanır. Her hasta için en uygun yöntemi belirleyerek hem estetik hem de fonksiyonel sonuç hedefleriz.",
    cards: [
      {
        title: "İmplant Tedavisi",
        text: "Eksik diş bölgeleri için kalıcı ve fonksiyonel çözümler.",
        image:
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=80",
        alt: "Diş implant tedavisi",
      },
      {
        title: "Diş Beyazlatma",
        text: "Daha aydınlık bir gülüş için kontrollü estetik uygulamalar.",
        image:
          "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=700&q=80",
        alt: "Diş beyazlatma tedavisi",
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
        title: "Öncesi",
        text: "Renklenme, eksik diş veya çapraşıklık gibi sorunlar detaylı analiz edilir.",
      },
      {
        title: "Sonrası",
        text: "Fonksiyonel çiğneme, estetik gülüş ve uzun süreli korunabilir bir sonuç hedeflenir.",
      },
    ],
  },
  team: {
    title: "EKİBİMİZ",
    slogan: "Uzmanlık, deneyim ve hasta odaklı iletişim prensibi ile çalışan profesyonel ekip.",
    intro:
      "Ekibimiz, farklı uzmanlık alanlarında deneyimli diş hekimlerinden oluşur. Her hastaya özel yaklaşımla, güvenilir tedavi ve sürekli bilgilendirme sunarız.",
    cards: [
      {
        title: "Dt. Elif Kara",
        text: "Estetik diş hekimliği ve gülüş tasarımı alanında uzmanlaşmıştır. 12+ yıl deneyim.",
      },
      {
        title: "Dt. Mert Yıldız",
        text: "İmplantoloji ve cerrahi planlama süreçlerinde görev almaktadır. Uluslararası sertifikalara sahiptir.",
      },
      {
        title: "Dt. Zeynep Arın",
        text: "Pedodonti ve koruyucu diş hekimliği uygulamalarında deneyimlidir. Çocuk hasta iletişiminde uzmandır.",
      },
      {
        title: "Uzm. Hekim Asistanı",
        text: "Hasta koordinasyonu, randevu takibi ve tedavi süreci bilgilendirmelerinde aktif destek sağlar.",
      },
    ],
  },
  reviews: {
    title: "YORUMLAR",
    slogan: "Gerçek hasta deneyimlerine dayalı geri bildirimler ile sürekli gelişim odaklı yaklaşım.",
    intro:
      "Hasta memnuniyeti bizim için en önemli göstergedir. Aşağıdaki yorumlar, kliniğimizde tedavi olan danışanlarımızın deneyimlerinden seçilmiş örneklerdir.",
    cards: [
      {
        name: "Ayşe K.",
        rating: "5/5",
        meta: "★★★★★ | Doğrulanmış Hasta | 02.03.2026",
        avatar: "assets/images/female-profile-logo.svg",
        text: "İlk muayeneden itibaren çok açık bilgilendirildim. Tedavi süreci planlı ve rahat geçti.",
      },
      {
        name: "Mehmet T.",
        rating: "5/5",
        meta: "★★★★★ | Doğrulanmış Hasta | 17.02.2026",
        avatar: "assets/images/male-profile-logo.svg",
        text: "İmplant tedavimde ekip son derece ilgiliydi. Hijyen ve ilgi konusunda gerçekten çok iyiler.",
      },
      {
        name: "Selin D.",
        rating: "4.9/5",
        meta: "★★★★☆ | Doğrulanmış Hasta | 29.01.2026",
        avatar: "assets/images/female-profile-logo.svg",
        text: "Çocuk diş hekimliği randevusunda kızım çok rahattı. Hekimlerin iletişimi çok başarılıydı.",
      },
      {
        name: "Emre Y.",
        rating: "5/5",
        meta: "★★★★★ | Doğrulanmış Hasta | 12.01.2026",
        avatar: "assets/images/male-profile-logo.svg",
        text: "Randevu planlama hızlıydı, işlemler zamanında başladı. Gülüş tasarımı sonucumdan memnunum.",
      },
    ],
  },
  appointment: {
    title: "ONLINE RANDEVU",
    slogan: "Dakikalar içinde randevu talebi oluşturun, ekibimiz size hızla dönüş yapsın.",
    intro:
      "Online randevu panelinden ihtiyaç duyduğunuz tedavi türünü seçerek kolayca talep oluşturabilirsiniz. Uygun saat seçimi sonrasında ekibimiz en kısa sürede sizinle iletişime geçer.",
    quickCards: [
      {
        title: "Genel Muayene Randevusu",
        image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=700&q=80",
        alt: "Genel muayene randevusu",
      },
      {
        title: "Estetik Tedavi Randevusu",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=700&q=80",
        alt: "Estetik diş tedavisi randevusu",
      },
      {
        title: "Çocuk Diş Hekimliği",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=700&q=80",
        alt: "Çocuk diş hekimliği randevusu",
      },
    ],
    steps: [
      {
        title: "1. Tedavi Türünü Seçin",
        text: "İhtiyacınıza uygun randevu türünü seçerek süreci başlatın.",
      },
      {
        title: "2. Saat Talebi Oluşturun",
        text: "Size uygun tarih ve saat aralığını belirterek formu tamamlayın.",
      },
      {
        title: "3. Onay Bilgisi Alın",
        text: "Ekibimiz tarafından randevu onayı telefon veya mesaj ile iletilir.",
      },
      {
        title: "4. Kliniğe Geliş",
        text: "Randevu saatinde kliniğe gelerek tedavi sürecinizi başlatabilirsiniz.",
      },
    ],
    formNote: "Form, webhook veya Google Sheets bağlantısı için hazırdır.",
    treatmentOptions: [
      "Genel Muayene",
      "Estetik Diş Tedavisi",
      "Çocuk Diş Hekimliği",
      "İmplant Tedavisi",
    ],
  },
  kvkk: {
    title: "KVKK",
    intro:
      "Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında sadece sağlık hizmeti sunumu, randevu yönetimi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.",
    cards: [
      { title: "İşlenen Veriler", text: "Kimlik, iletişim, sağlık ve randevu bilgileri." },
      { title: "İşleme Amacı", text: "Tanı, tedavi, takip ve iletişim süreçlerinin yürütülmesi." },
      { title: "Haklarınız", text: "Bilgi talep etme, düzeltme, silme ve itiraz haklarına sahipsiniz." },
      { title: "Başvuru", text: "kvkk@mustafavuraldis.com adresinden bize ulaşabilirsiniz." },
    ],
  },
  patientrights: {
    title: "HASTA HAKLARI",
    intro:
      "Her hastamız, bilgilendirilme, mahremiyet, güvenli tedavi, onam verme ve tedavi sürecine aktif katılım haklarına sahiptir.",
    cards: [
      { title: "Bilgilendirilme Hakkı", text: "Tedavi seçenekleri, süre ve maliyet konusunda açık bilgi alma hakkı." },
      { title: "Mahremiyet Hakkı", text: "Muayene ve veri güvenliği süreçlerinde gizliliğe öncelik verilir." },
      { title: "Onam Hakkı", text: "İşlem öncesi bilgilendirilmiş onamla karar verme sürecine katılım." },
      { title: "Görüş ve İtiraz Hakkı", text: "Geri bildirim, şikayet ve ikinci görüş taleplerinizi iletebilirsiniz." },
    ],
  },
  emergency: {
    title: "ACİL DURUM BİLGİSİ",
    intro:
      "Şiddetli ağrı, travma, kırık diş veya kanama gibi durumlarda 7/24 danışma hattımızı arayabilirsiniz.",
    cards: [
      { title: "Hemen Arayın", text: "+90 555 555 00 00" },
      { title: "Klinik Saatleri", text: "Pazartesi - Cumartesi: 09:00 - 19:00" },
      { title: "Mesai Dışı Yönlendirme", text: "Acil diş travmalarında en yakın acil servise başvurun." },
      { title: "Ön Bilgilendirme", text: "Telefonla semptomlarınız alınıp uygun yönlendirme yapılır." },
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