document.addEventListener("DOMContentLoaded", () => {
  const loginCard = document.getElementById("admin-login-card");
  const dashboard = document.getElementById("admin-dashboard");
  const loginForm = document.getElementById("admin-login-form");
  const loginStatus = document.getElementById("admin-login-status");
  const logoutButton = document.getElementById("admin-logout");
  const statsRoot = document.getElementById("admin-stats");
  const tabsRoot = document.getElementById("admin-tabs");
  const editorRoot = document.getElementById("admin-editor-root");
  const tokenKey = "mv_admin_token";

  const state = {
    activePage: "site",
    content: {},
  };

  const PAGE_SCHEMAS = [
    {
      pageKey: "site",
      label: "Genel Ayarlar",
      badge: "Global",
      description: "Ust bilgi, iletişim ve footer alanlari.",
      fields: [
        { name: "topStrip", label: "Ust Bilgi", type: "text" },
        { name: "phone", label: "Telefon", type: "text" },
        { name: "address", label: "Adres", type: "text" },
        { name: "email", label: "E-posta", type: "email" },
        { name: "footerTitle", label: "Footer Baslik", type: "text" },
        { name: "footerDescription", label: "Footer Aciklama", type: "textarea" },
        { name: "footerYear", label: "Footer Notu", type: "text" },
      ],
      repeaters: [],
    },
    {
      pageKey: "home",
      label: "Anasayfa",
      badge: "Home",
      description: "Giris alanı, hero metni ve öne çıkan kutular.",
      fields: [
        { name: "title", label: "Büyük Baslik", type: "text" },
        { name: "kicker", label: "Üst Etiket", type: "text" },
        { name: "heroTitle", label: "Hero Basligi", type: "text" },
        { name: "summary", label: "Kısa Açıklama", type: "textarea" },
      ],
      repeaters: [
        {
          name: "buttons",
          label: "Hero Butonlari",
          itemLabel: "Buton",
          fields: [
            { name: "label", label: "Etiket", type: "text" },
            { name: "href", label: "Link", type: "text" },
          ],
        },
        {
          name: "stats",
          label: "Istatistik Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "value", label: "Deger", type: "text" },
            { name: "label", label: "Aciklama", type: "text" },
          ],
        },
        {
          name: "highlights",
          label: "Vurgu Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
        {
          name: "featureCards",
          label: "One Cikan Ozellikler",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "about",
      label: "Hakkımızda",
      badge: "About",
      description: "Klinik tanıtımı, hizmet odakları ve iletişim alanları.",
      fields: [
        { name: "title", label: "Büyük Baslik", type: "text" },
        { name: "heroTitle", label: "Karsilama Basligi", type: "text" },
        { name: "mapUrl", label: "Harita URL", type: "url" },
      ],
      repeaters: [
        {
          name: "paragraphs",
          label: "Hakkimizda Paragraflari",
          itemLabel: "Paragraf",
          fields: [{ name: "text", label: "Metin", type: "textarea" }],
        },
        {
          name: "detailCards",
          label: "Bilgi Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
        {
          name: "buttons",
          label: "Hizli Butonlar",
          itemLabel: "Buton",
          fields: [
            { name: "label", label: "Etiket", type: "text" },
            { name: "href", label: "Link", type: "text" },
          ],
        },
        {
          name: "contactCards",
          label: "Iletisim Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "services",
      label: "Hizmetler",
      badge: "Content",
      description: "Hizmet kartlari ve sik sorulan sorular.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "slogan", label: "Slogan", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Hizmet Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
        {
          name: "faqs",
          label: "FAQ Kartlari",
          itemLabel: "Soru",
          fields: [
            { name: "question", label: "Soru", type: "text" },
            { name: "answer", label: "Cevap", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "treatments",
      label: "Tedaviler",
      badge: "Content",
      description: "Tedavi kartlari ve karsilastirma bloklari.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "slogan", label: "Slogan", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Tedavi Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
            { name: "image", label: "Gorsel URL", type: "url" },
            { name: "alt", label: "Alt Metin", type: "text" },
          ],
        },
        {
          name: "comparisons",
          label: "Oncesi / Sonrasi",
          itemLabel: "Blok",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "team",
      label: "Ekibimiz",
      badge: "About",
      description: "Ekip uyeleri ve tanitim metinleri.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "slogan", label: "Slogan", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Ekip Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Ad", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "reviews",
      label: "Yorumlar",
      badge: "Social",
      description: "Hasta yorumlari ve puanlar.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "slogan", label: "Slogan", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Yorum Kartlari",
          itemLabel: "Yorum",
          fields: [
            { name: "name", label: "Ad", type: "text" },
            { name: "rating", label: "Puan", type: "text" },
            { name: "meta", label: "Meta", type: "text" },
            { name: "avatar", label: "Avatar URL", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "appointment",
      label: "Randevu",
      badge: "Form",
      description: "Randevu alanlari, hizli kartlar ve form notu.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "slogan", label: "Slogan", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
        { name: "formNote", label: "Form Notu", type: "textarea" },
      ],
      repeaters: [
        {
          name: "quickCards",
          label: "Hizli Kartlar",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "image", label: "Gorsel URL", type: "text" },
            { name: "alt", label: "Alt Metin", type: "text" },
          ],
        },
        {
          name: "steps",
          label: "Surec Adimlari",
          itemLabel: "Adim",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
        {
          name: "treatmentOptions",
          label: "Tedavi Secenekleri",
          itemLabel: "Secenek",
          fields: [{ name: "label", label: "Etiket", type: "text" }],
        },
      ],
    },
    {
      pageKey: "kvkk",
      label: "KVKK",
      badge: "Legal",
      description: "KVKK metni ve bilgi kartlari.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Bilgi Kartlari",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "patientrights",
      label: "Hasta Haklari",
      badge: "Legal",
      description: "Hasta haklari metni ve kartlar.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Kartlar",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
    {
      pageKey: "emergency",
      label: "Acil Durum",
      badge: "Legal",
      description: "Acil durum sayfasi ve yonlendirme kartlari.",
      fields: [
        { name: "title", label: "Baslik", type: "text" },
        { name: "intro", label: "Giris Metni", type: "textarea" },
      ],
      repeaters: [
        {
          name: "cards",
          label: "Kartlar",
          itemLabel: "Kart",
          fields: [
            { name: "title", label: "Baslik", type: "text" },
            { name: "text", label: "Metin", type: "textarea" },
          ],
        },
      ],
    },
  ];

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const getSchema = (pageKey) => PAGE_SCHEMAS.find((schema) => schema.pageKey === pageKey);

  const getToken = () => sessionStorage.getItem(tokenKey) || "";

  const setToken = (token) => sessionStorage.setItem(tokenKey, token);

  const clearToken = () => sessionStorage.removeItem(tokenKey);

  const apiBase = () => {
    const runtimeConfig = window.MV_CONFIG || {};
    return String(runtimeConfig.contentApiUrl || "/api").replace(/\/+$/, "");
  };

  const adminFetch = async (path, options = {}) => {
    const headers = Object.assign({}, options.headers || {}, { Authorization: `Bearer ${getToken()}` });
    const response = await fetch(`${apiBase()}${path}`, { ...options, headers });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok || (payload && payload.ok === false)) {
      throw new Error((payload && payload.error) || "Islem basarisiz");
    }

    return payload;
  };

  const setLoginStatus = (message, isError = false) => {
    if (!loginStatus) {
      return;
    }

    loginStatus.textContent = message;
    loginStatus.classList.toggle("error", isError);
  };

  const showDashboard = () => {
    if (loginCard) loginCard.hidden = true;
    if (dashboard) dashboard.hidden = false;
  };

  const showLogin = () => {
    if (loginCard) loginCard.hidden = false;
    if (dashboard) dashboard.hidden = true;
  };

  const fieldMarkup = (field, value = "") => {
    const safeValue = escapeHtml(value);

    if (field.type === "textarea") {
      return `
        <label>
          ${escapeHtml(field.label)}
          <textarea name="${field.name}" rows="${field.rows || 3}">${safeValue}</textarea>
        </label>
      `;
    }

    if (field.type === "select") {
      return `
        <label>
          ${escapeHtml(field.label)}
          <select name="${field.name}">
            ${(field.options || [])
              .map((option) => `<option value="${escapeHtml(option.value)}" ${String(option.value) === String(value) ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
              .join("")}
          </select>
        </label>
      `;
    }

    return `
      <label>
        ${escapeHtml(field.label)}
        <input type="${field.type || "text"}" name="${field.name}" value="${safeValue}" />
      </label>
    `;
  };

  const repeaterItemMarkup = (repeater, item = {}, itemIndex = 0) => {
    const title = repeater.itemLabel || "Kart";
    return `
      <article class="repeat-item" data-repeat-item="${escapeHtml(repeater.name)}">
        <div class="repeat-item-head">
          <strong>${escapeHtml(title)} ${itemIndex + 1}</strong>
          <button type="button" data-remove-item>Sil</button>
        </div>
        <div class="field-grid">
          ${repeater.fields
            .map((field) => fieldMarkup(field, item[field.name] || ""))
            .join("")}
        </div>
      </article>
    `;
  };

  const repeaterSectionMarkup = (repeater, items = []) => `
    <section class="admin-block">
      <div class="panel-head">
        <div>
          <h4>${escapeHtml(repeater.label)}</h4>
          <p>${escapeHtml(repeater.description || "Bu alandaki kartlari yonetin.")}</p>
        </div>
        <button type="button" data-add-item="${escapeHtml(repeater.name)}">Yeni ${escapeHtml(repeater.itemLabel || "Kart")}</button>
      </div>
      <div class="repeat-list" data-repeat-list="${escapeHtml(repeater.name)}">
        ${items.map((item, index) => repeaterItemMarkup(repeater, item, index)).join("")}
      </div>
    </section>
  `;

  const renderTabs = () => {
    if (!tabsRoot) {
      return;
    }

    tabsRoot.innerHTML = PAGE_SCHEMAS.map((schema) => `
      <button type="button" class="admin-tab ${schema.pageKey === state.activePage ? "is-active" : ""}" data-page-key="${schema.pageKey}">
        <span>${escapeHtml(schema.label)}</span>
        <small>${escapeHtml(schema.badge)}</small>
      </button>
    `).join("");

    tabsRoot.querySelectorAll("[data-page-key]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activePage = button.getAttribute("data-page-key") || "site";
        renderTabs();
        renderEditor();
      });
    });
  };

  const renderStats = () => {
    if (!statsRoot) {
      return;
    }

    const totalPages = PAGE_SCHEMAS.length;
    const totalBlocks = PAGE_SCHEMAS.reduce((sum, schema) => {
      const content = state.content[schema.pageKey] || {};
      return sum + schema.repeaters.reduce((repeaterTotal, repeater) => repeaterTotal + ((content[repeater.name] || []).length), 0);
    }, 0);
    const activeContent = state.content[state.activePage] || {};
    const activeBlocks = getSchema(state.activePage)?.repeaters.reduce((sum, repeater) => sum + ((activeContent[repeater.name] || []).length), 0) || 0;

    statsRoot.innerHTML = `
      <article class="stat-card"><span>Yonetilen Sayfa</span><strong>${totalPages}</strong></article>
      <article class="stat-card"><span>Toplam Icerik Bloku</span><strong>${totalBlocks}</strong></article>
      <article class="stat-card"><span>Aktif Sayfa Bloku</span><strong>${activeBlocks}</strong></article>
    `;
  };

  const fieldValue = (content, field) => content[field.name] ?? "";

  const renderEditor = () => {
    if (!editorRoot) {
      return;
    }

    const schema = getSchema(state.activePage);
    if (!schema) {
      editorRoot.innerHTML = "<p class=\"admin-empty\">Editor bulunamadi.</p>";
      return;
    }

    const content = state.content[schema.pageKey] || {};
    const formId = `admin-form-${schema.pageKey}`;

    editorRoot.innerHTML = `
      <section class="admin-panel-card">
        <div class="panel-head">
          <div>
            <h3>${escapeHtml(schema.label)}</h3>
            <p>${escapeHtml(schema.description)}</p>
          </div>
          <span class="badge">${escapeHtml(schema.badge)}</span>
        </div>
        <form class="content-form" id="${formId}" data-page-form="${schema.pageKey}">
          <div class="field-grid">
            ${schema.fields.map((field) => fieldMarkup(field, fieldValue(content, field))).join("")}
          </div>
          ${schema.repeaters.map((repeater) => repeaterSectionMarkup(repeater, content[repeater.name] || [])).join("")}
          <div class="editor-actions">
            <button type="submit">Kaydet</button>
            <p class="status" data-status aria-live="polite"></p>
          </div>
        </form>
      </section>
    `;

    const form = editorRoot.querySelector("form");

    schema.repeaters.forEach((repeater) => {
      const addButton = form.querySelector(`[data-add-item="${repeater.name}"]`);
      const repeatList = form.querySelector(`[data-repeat-list="${repeater.name}"]`);

      addButton?.addEventListener("click", () => {
        const item = document.createElement("div");
        item.innerHTML = repeaterItemMarkup(repeater, {}, repeatList.children.length);
        const itemElement = item.firstElementChild;
        if (itemElement) {
          repeatList.appendChild(itemElement);
          bindRemoveButtons(form);
        }
      });
    });

    bindRemoveButtons(form);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-status]");

      try {
        const payload = collectFormData(schema, form);
        await adminFetch(`/admin/content/${schema.pageKey}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        state.content[schema.pageKey] = payload;
        renderStats();
        status.textContent = "Kaydedildi.";
        status.classList.remove("error");
      } catch (error) {
        status.textContent = error.message || "Kaydetme basarisiz";
        status.classList.add("error");
      }
    });
  };

  const bindRemoveButtons = (form) => {
    form.querySelectorAll("[data-remove-item]").forEach((button) => {
      if (button.dataset.bound === "true") {
        return;
      }

      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        button.closest("[data-repeat-item]")?.remove();
        renderStats();
      });
    });
  };

  const collectFormData = (schema, form) => {
    const payload = {};

    schema.fields.forEach((field) => {
      payload[field.name] = String(form.elements[field.name]?.value || "").trim();
    });

    schema.repeaters.forEach((repeater) => {
      const repeatList = form.querySelector(`[data-repeat-list="${repeater.name}"]`);
      payload[repeater.name] = Array.from(repeatList.querySelectorAll("[data-repeat-item]")).map((item) => {
        const itemPayload = {};
        repeater.fields.forEach((field) => {
          itemPayload[field.name] = String(item.querySelector(`[name="${field.name}"]`)?.value || "").trim();
        });
        return itemPayload;
      });
    });

    return payload;
  };

  const loadAllContent = async () => {
    const payload = await adminFetch("/admin/content");
    state.content = payload.data || {};
  };

  const authenticate = async () => {
    if (!getToken()) {
      showLogin();
      return;
    }

    try {
      await loadAllContent();
      showDashboard();
      renderTabs();
      renderEditor();
      renderStats();
      setLoginStatus("Giris onaylandi.");
    } catch (error) {
      clearToken();
      showLogin();
      setLoginStatus("Oturum dogrulanamadi. Yeniden giris yapin.", true);
    }
  };

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setLoginStatus("Dogrulanıyor...");

    try {
      const formData = new FormData(loginForm);
      const response = await fetch(`${apiBase()}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: String(formData.get("password") || "") }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload || payload.ok === false) {
        throw new Error((payload && payload.error) || "Giris basarisiz");
      }

      setToken(payload.token);
      loginForm.reset();
      await loadAllContent();
      showDashboard();
      renderTabs();
      renderEditor();
      renderStats();
      setLoginStatus("Giris basarili.");
    } catch (error) {
      clearToken();
      showLogin();
      setLoginStatus(error.message || "Giris basarisiz", true);
    }
  });

  logoutButton?.addEventListener("click", () => {
    clearToken();
    showLogin();
    setLoginStatus("Oturum kapatildi.");
  });

  authenticate();
});