document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.classList.add("page-enter");

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const pageKeyMap = {
    "index.html": "home",
    "about.html": "about",
    "hizmetler.html": "services",
    "tedaviler.html": "treatments",
    "ekibimiz.html": "team",
    "yorumlar.html": "reviews",
    "randevu.html": "appointment",
    "kvkk.html": "kvkk",
    "hasta-haklari.html": "patientrights",
    "acil-durum.html": "emergency",
  };

  const loadJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const payload = await response.json().catch(() => null);
    if (!payload || payload.ok === false) {
      return null;
    }

    return payload.data || null;
  };

  const runtimeConfig = window.MV_CONFIG || {};
  const contentBase = String(runtimeConfig.contentApiUrl || "/api").replace(/\/+$/, "");

  const setText = (selector, value) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      node.textContent = value;
    });
  };

  const setHtml = (selector, html) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      node.innerHTML = html;
    });
  };

  const safeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const appendAdminLink = () => {
    const mainNavList = document.querySelector(".main-nav .nav-links");
    if (mainNavList && !mainNavList.querySelector('a[href="admin.html"]')) {
      const adminItem = document.createElement("li");
      adminItem.innerHTML = '<a href="admin.html">Admin Paneli</a>';
      mainNavList.appendChild(adminItem);
    }
  };

  const syncNavState = () => {
    const navLinks = document.querySelectorAll(".nav-links a[href]");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPath) {
        link.classList.add("is-active");
      }
    });
  };

  const setupMenu = () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (!menuToggle || !mainNav) {
      return;
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  };

  const setupPageTransitions = () => {
    const links = document.querySelectorAll("a[href]");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) {
          return;
        }

        const targetUrl = new URL(href, window.location.href);
        const isSamePage = targetUrl.href === window.location.href;
        const isHtmlPage = targetUrl.pathname.toLowerCase().endsWith(".html");
        const isSameOrigin = targetUrl.origin === window.location.origin;

        if (!isSameOrigin || !isHtmlPage || isSamePage) {
          return;
        }

        event.preventDefault();
        body.classList.remove("page-enter");
        body.classList.add("page-leave");

        window.setTimeout(() => {
          window.location.href = targetUrl.href;
        }, 340);
      });
    });
  };

  window.addEventListener("pageshow", () => {
    body.classList.remove("page-leave");
    body.classList.add("page-enter");
  });

  const renderSite = (site) => {
    if (!site) {
      return;
    }

    setText(".top-strip-inner p", site.topStrip || "");
    const phoneLinks = document.querySelectorAll('.top-strip-inner a[href^="tel:"]');
    phoneLinks.forEach((link) => {
      link.textContent = site.phone || "";
      link.setAttribute("href", `tel:${String(site.phone || "").replace(/\s+/g, "")}`);
    });

    const footerTitle = document.querySelector(".site-footer .footer-grid section h3");
    if (footerTitle && site.footerTitle) {
      footerTitle.textContent = site.footerTitle;
    }

    const footerDescription = document.querySelector(".site-footer .footer-grid section p");
    if (footerDescription && site.footerDescription) {
      footerDescription.textContent = site.footerDescription;
    }

    const contactLine = document.querySelectorAll(".site-footer .footer-grid section:nth-child(3) p");
    if (contactLine[0] && site.phone) {
      contactLine[0].textContent = site.phone;
    }
    if (contactLine[1] && site.address) {
      contactLine[1].textContent = site.address;
    }

    const footerNote = document.querySelector(".site-footer .footer-note p");
    if (footerNote && site.footerYear) {
      footerNote.textContent = site.footerYear;
    }

    const contactLinks = document.querySelectorAll('a[href^="mailto:"]');
    contactLinks.forEach((link) => {
      if (site.email) {
        link.setAttribute("href", `mailto:${site.email}`);
        if (!link.dataset.lockedText) {
          link.textContent = site.email;
        }
      }
    });
  };

  const renderHome = (content) => {
    if (!content) {
      return;
    }

    document.title = "Mustafa Vural | Anasayfa";
    setText(".home-kicker", content.kicker || "");
    setText(".home-title", content.heroTitle || "");
    setText(".home-summary", content.summary || "");

    const buttons = document.querySelectorAll(".home-actions .home-btn");
    buttons.forEach((button, index) => {
      const data = content.buttons && content.buttons[index];
      if (!data) {
        return;
      }

      button.textContent = data.label || button.textContent;
      button.setAttribute("href", data.href || "#");
    });

    const stats = document.querySelectorAll(".home-stats .home-stat");
    stats.forEach((card, index) => {
      const data = content.stats && content.stats[index];
      if (!data) {
        return;
      }

      const value = card.querySelector("strong");
      const label = card.querySelector("span");
      if (value) value.textContent = data.value || "";
      if (label) label.textContent = data.label || "";
    });

    const highlights = document.querySelectorAll(".home-highlight-card");
    highlights.forEach((card, index) => {
      const data = content.highlights && content.highlights[index];
      if (!data) {
        return;
      }

      const heading = card.querySelector("h3");
      const text = card.querySelector("p");
      if (heading) heading.textContent = data.title || "";
      if (text) text.textContent = data.text || "";
    });

    const featureCards = document.querySelectorAll(".home-feature-card");
    featureCards.forEach((card, index) => {
      const data = content.featureCards && content.featureCards[index];
      if (!data) {
        return;
      }

      const heading = card.querySelector("h3");
      const text = card.querySelector("p");
      if (heading) heading.textContent = data.title || "";
      if (text) text.textContent = data.text || "";
    });
  };

  const renderAbout = (content) => {
    if (!content) {
      return;
    }

    document.title = "Mustafa Vural | Hakkımızda";
    setText(".about-title", content.title || "");
    const aboutHeading = document.querySelector(".about-panel h2");
    if (aboutHeading && content.heroTitle) {
      aboutHeading.textContent = content.heroTitle;
    }

    const paragraphs = document.querySelectorAll(".about-panel p");
    paragraphs.forEach((paragraph, index) => {
      if (content.paragraphs && content.paragraphs[index]) {
        paragraph.textContent = content.paragraphs[index].text || content.paragraphs[index];
      }
    });

    const detailCards = document.querySelectorAll(".about-details .detail-card");
    detailCards.forEach((card, index) => {
      const data = content.detailCards && content.detailCards[index];
      if (!data) {
        return;
      }

      const heading = card.querySelector("h3");
      const text = card.querySelector("p");
      if (heading) heading.textContent = data.title || "";
      if (text) text.textContent = data.text || "";
    });

    const buttons = document.querySelectorAll(".about-actions .about-btn");
    buttons.forEach((button, index) => {
      const data = content.buttons && content.buttons[index];
      if (!data) {
        return;
      }

      button.textContent = data.label || button.textContent;
      button.setAttribute("href", data.href || "#");
    });

    const contactCards = document.querySelectorAll(".contact-map .services-info-box p");
    contactCards.forEach((paragraph, index) => {
      const data = content.contactCards && content.contactCards[index];
      if (!data) {
        return;
      }

      paragraph.innerHTML = `<strong>${safeHtml(data.title)}:</strong> ${safeHtml(data.text)}`;
    });

    const mapFrame = document.querySelector(".map-frame");
    if (mapFrame && content.mapUrl) {
      mapFrame.setAttribute("src", content.mapUrl);
    }
  };

  const renderServices = (content) => {
    if (!content) return;

    document.title = "Mustafa Vural | Hizmetler";
    setText(".services-title", content.title || "");
    setText(".section-slogan", content.slogan || "");
    const intro = document.querySelector(".services-info-box p");
    if (intro && content.intro) intro.textContent = content.intro;

    const cards = document.querySelector(".services-details");
    if (cards && Array.isArray(content.cards)) {
      cards.innerHTML = content.cards
        .map(
          (card) => `
            <div class="service-card">
              <h3>${safeHtml(card.title || "Yeni Hizmet")}</h3>
              <p>${safeHtml(card.text || "")}</p>
            </div>
          `
        )
        .join("");
    }

    const faq = document.querySelector(".faq-block");
    if (faq && Array.isArray(content.faqs)) {
      faq.innerHTML = `
        <h2>${safeHtml(content.faqTitle || "Sık Sorulan Sorular")}</h2>
        ${content.faqs
          .map(
            (item) => `
              <details>
                <summary>${safeHtml(item.question || "Yeni soru")}</summary>
                <p>${safeHtml(item.answer || "")}</p>
              </details>
            `
          )
          .join("")}
      `;
    }
  };

  const renderTreatments = (content) => {
    if (!content) return;

    document.title = "Mustafa Vural | Tedaviler";
    setText(".services-title", content.title || "");
    setText(".section-slogan", content.slogan || "");
    const intro = document.querySelector(".services-info-box p");
    if (intro && content.intro) intro.textContent = content.intro;

    const cards = document.querySelector(".photo-actions");
    if (cards && Array.isArray(content.cards)) {
      cards.innerHTML = content.cards
        .map(
          (card) => `
            <a class="photo-btn" href="#">
              <img src="${safeHtml(card.image || "")}" alt="${safeHtml(card.alt || card.title || "Tedavi")}" />
              <span>${safeHtml(card.title || "Yeni Tedavi")}</span>
            </a>
          `
        )
        .join("");
    }

    const comparisons = document.querySelector(".comparison-grid");
    if (comparisons && Array.isArray(content.comparisons)) {
      comparisons.innerHTML = content.comparisons
        .map(
          (item) => `
            <article class="comparison-card">
              <h3>${safeHtml(item.title || "Yeni Alan")}</h3>
              <p>${safeHtml(item.text || "")}</p>
            </article>
          `
        )
        .join("");
    }
  };

  const renderTeam = (content) => {
    if (!content) return;

    document.title = "Mustafa Vural | Ekibimiz";
    setText(".services-title", content.title || "");
    setText(".section-slogan", content.slogan || "");
    const intro = document.querySelector(".services-info-box p");
    if (intro && content.intro) intro.textContent = content.intro;

    const cards = document.querySelector(".services-details");
    if (cards && Array.isArray(content.cards)) {
      cards.innerHTML = content.cards
        .map(
          (card) => `
            <div class="service-card">
              <h3>${safeHtml(card.title || "Yeni Uye")}</h3>
              <p>${safeHtml(card.text || "")}</p>
            </div>
          `
        )
        .join("");
    }
  };

  const renderReviews = (content) => {
    if (!content) return;

    document.title = "Mustafa Vural | Yorumlar";
    setText(".services-title", content.title || "");
    setText(".section-slogan", content.slogan || "");
    const intro = document.querySelector(".services-info-box p");
    if (intro && content.intro) intro.textContent = content.intro;

    const grid = document.querySelector(".reviews-grid");
    if (grid && Array.isArray(content.cards)) {
      grid.innerHTML = content.cards
        .map(
          (card) => `
            <article class="review-card">
              <div class="review-head">
                <img class="review-avatar" src="${safeHtml(card.avatar || "")}" alt="${safeHtml(card.name || "Yorum sahibi")}" />
                <div>
                  <h3>${safeHtml(card.name || "Yeni Yorum")}</h3>
                  <p class="rating">Puan: ${safeHtml(card.rating || "")}</p>
                  <p class="review-meta">${safeHtml(card.meta || "")}</p>
                </div>
              </div>
              <p>${safeHtml(card.text || "")}</p>
            </article>
          `
        )
        .join("");
    }
  };

  const renderAppointment = (content) => {
    if (!content) return;

    document.title = "Mustafa Vural | Online Randevu";
    setText(".services-title", content.title || "");
    setText(".section-slogan", content.slogan || "");
    const intro = document.querySelector(".services-info-box p");
    if (intro && content.intro) intro.textContent = content.intro;

    const quickCards = document.querySelector(".photo-actions");
    if (quickCards && Array.isArray(content.quickCards)) {
      quickCards.innerHTML = content.quickCards
        .map(
          (card) => `
            <a class="photo-btn" href="#">
              <img src="${safeHtml(card.image || "")}" alt="${safeHtml(card.alt || card.title || "Randevu")}" />
              <span>${safeHtml(card.title || "Yeni Kart")}</span>
            </a>
          `
        )
        .join("");
    }

    const steps = document.querySelector(".services-details");
    if (steps && Array.isArray(content.steps)) {
      steps.innerHTML = content.steps
        .map(
          (step) => `
            <div class="service-card">
              <h3>${safeHtml(step.title || "Adim")}</h3>
              <p>${safeHtml(step.text || "")}</p>
            </div>
          `
        )
        .join("");
    }

    const formNote = document.querySelector(".form-note");
    if (formNote && content.formNote) {
      formNote.textContent = content.formNote;
    }

    const select = document.querySelector('select[name="tedavi"]');
    if (select && Array.isArray(content.treatmentOptions)) {
      select.innerHTML = [`<option value="">Seciniz</option>`]
        .concat(content.treatmentOptions.map((option) => `<option>${safeHtml(option)}</option>`))
        .join("");
    }
  };

  const renderLegal = (content) => {
    if (!content) return;

    const title = document.querySelector(".services-title");
    if (title) title.textContent = content.title || "";
    const intro = document.querySelector(".services-info-box p");
    if (intro && content.intro) intro.textContent = content.intro;

    const cards = document.querySelector(".services-details");
    if (cards && Array.isArray(content.cards)) {
      cards.innerHTML = content.cards
        .map(
          (card) => `
            <div class="service-card">
              <h3>${safeHtml(card.title || "")}</h3>
              <p>${safeHtml(card.text || "")}</p>
            </div>
          `
        )
        .join("");
    }
  };

  const renderPage = (pageKey, siteContent, pageContent) => {
    renderSite(siteContent);

    const rendererMap = {
      home: renderHome,
      about: renderAbout,
      services: renderServices,
      treatments: renderTreatments,
      team: renderTeam,
      reviews: renderReviews,
      appointment: renderAppointment,
      kvkk: renderLegal,
      patientrights: renderLegal,
      emergency: renderLegal,
    };

    const renderer = rendererMap[pageKey];
    if (renderer) {
      renderer(pageContent);
    }
  };

  const appointmentForm = document.querySelector(".appointment-form");
  if (appointmentForm) {
    const formStatus = appointmentForm.querySelector(".form-status");
    const config = {
      apiUrl: String(runtimeConfig.apiUrl || "").trim(),
      webhookUrl: String(runtimeConfig.webhookUrl || "").trim(),
      googleAppsScriptUrl: String(runtimeConfig.googleAppsScriptUrl || "").trim(),
    };

    const setStatus = (message, isError = false) => {
      if (!formStatus) {
        return;
      }

      formStatus.textContent = message;
      formStatus.classList.toggle("error", isError);
    };

    const saveLocally = (payload) => {
      const storageKey = "mv_appointment_requests";
      const prev = JSON.parse(localStorage.getItem(storageKey) || "[]");
      prev.push(payload);
      localStorage.setItem(storageKey, JSON.stringify(prev));
    };

    const postJson = async (url, payload) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let responseData = null;
      try {
        responseData = await response.json();
      } catch (error) {
        responseData = null;
      }

      if (!response.ok || (responseData && responseData.ok === false)) {
        throw new Error((responseData && responseData.error) || "Gonderim basarisiz");
      }

      return responseData;
    };

    appointmentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      setStatus("Randevu talebiniz isleniyor...");

      const payload = {
        adSoyad: appointmentForm.adSoyad?.value?.trim() || "",
        telefon: appointmentForm.telefon?.value?.trim() || "",
        email: appointmentForm.email?.value?.trim() || "",
        tedavi: appointmentForm.tedavi?.value || "",
        tarih: appointmentForm.tarih?.value || "",
        saat: appointmentForm.saat?.value || "",
        not: appointmentForm.not?.value?.trim() || "",
        createdAt: new Date().toISOString(),
      };

      try {
        if (config.webhookUrl) {
          await postJson(config.webhookUrl, payload);
          setStatus("Talebiniz alindi. En kisa surede sizinle iletisime gececegiz.");
        } else if (config.googleAppsScriptUrl) {
          const formData = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value);
          });

          await fetch(config.googleAppsScriptUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors",
          });
          setStatus("Talebiniz alindi. En kisa surede sizinle iletisime gececegiz.");
        } else {
          const apiBase = config.apiUrl ? config.apiUrl.replace(/\/+$/, "") : "/api";
          const apiEndpoint = apiBase ? `${apiBase}/randevu` : "/api/randevu";

          try {
            await postJson(apiEndpoint, payload);
            setStatus("Talebiniz alindi. En kisa surede sizinle iletisime gececegiz.");
          } catch (err) {
            saveLocally(payload);
            setStatus("Canli baglanti saglanamadi. Talep tarayiciya kaydedildi.", true);
          }
        }

        appointmentForm.reset();
      } catch (error) {
        saveLocally(payload);
        setStatus("Canli baglanti saglanamadi. Talep tarayiciya kaydedildi.", true);
        appointmentForm.reset();
      }
    });
  }

  const pageKey = pageKeyMap[currentPath];
  appendAdminLink();
  syncNavState();
  setupMenu();
  setupPageTransitions();

  Promise.all([
    loadJson(`${contentBase}/content/site`),
    pageKey ? loadJson(`${contentBase}/content/${pageKey}`) : Promise.resolve(null),
  ])
    .then(([siteContent, pageContent]) => {
      renderPage(pageKey, siteContent, pageContent);
    })
    .catch(() => {
      renderPage(pageKey, null, null);
    });
});