
/*
  TaxBridge Solutions Website JavaScript
*/
"use strict";

const WHATSAPP_NUMBER = "916268643647";

const DEFAULT_WHATSAPP_MESSAGE =
  "Hello TaxBridge Solutions, I would like to enquire about your services.";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const whatsappFloat = document.getElementById("whatsappFloat");

function getWhatsAppUrl(message) {
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    return null;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLink() {
  if (!whatsappFloat) return;

  const url = getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  if (url) {
    whatsappFloat.href = url;
    whatsappFloat.target = "_blank";
    whatsappFloat.rel = "noopener noreferrer";
    whatsappFloat.removeAttribute("aria-disabled");
    whatsappFloat.title = "Chat with TaxBridge Solutions on WhatsApp";
  }
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

document.querySelectorAll(".service-request").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service");
    if (!serviceSelect) return;

    const serviceName = (link.dataset.service || "").toLowerCase()
      .replace(" & itr", "");

    const option = Array.from(serviceSelect.options).find((item) =>
      item.text.toLowerCase().includes(serviceName)
    );

    if (option) serviceSelect.value = option.value || option.text;
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const whatsappMessage = [
      "Hello TaxBridge Solutions, I have a service enquiry.",
      "",
      `Name: ${fullName}`,
      `Mobile: ${phone}`,
      `Service: ${service}`,
      `Requirement: ${message}`,
      "",
      "Please let me know the next steps and applicable charges."
    ].join("\n");

    const url = getWhatsAppUrl(whatsappMessage);

    if (!url) {
      if (formNote) {
        formNote.textContent = "WhatsApp number is not configured correctly.";
        formNote.classList.add("notice");
      }
      return;
    }

    if (formNote) {
      formNote.textContent =
        "Opening WhatsApp. Please review your enquiry and press Send.";
      formNote.classList.remove("notice");
    }

    window.open(url, "_blank", "noopener,noreferrer");
  });
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== detail) other.open = false;
      });
    }
  });
});

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

updateWhatsAppLink();
