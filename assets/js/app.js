document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.classList.add("page-enter");

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a[href]");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("is-active");
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
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
  }

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

  const appointmentForm = document.querySelector(".appointment-form");
  if (appointmentForm) {
    const formStatus = appointmentForm.querySelector(".form-status");
    const runtimeConfig = window.MV_CONFIG || {};

    const config = {
      // Bu URL'leri bagladiginizda form verisi otomatik olarak ilgili servise gonderilir.
      webhookUrl: runtimeConfig.webhookUrl || "",
      googleAppsScriptUrl: runtimeConfig.googleAppsScriptUrl || "",
    };

    const setStatus = (message, isError = false) => {
      if (!formStatus) {
        return;
      }
      formStatus.textContent = message;
      formStatus.classList.toggle("error", isError);
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
          const response = await fetch(config.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Webhook yaniti basarisiz");
          }
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
          const storageKey = "mv_appointment_requests";
          const prev = JSON.parse(localStorage.getItem(storageKey) || "[]");
          prev.push(payload);
          localStorage.setItem(storageKey, JSON.stringify(prev));
          setStatus("Talebiniz kaydedildi. Canli entegrasyon icin webhook URL eklenebilir.");
        }

        appointmentForm.reset();
      } catch (error) {
        setStatus("Gonderim sirasinda bir sorun olustu. Lutfen tekrar deneyin.", true);
      }
    });
  }
});
