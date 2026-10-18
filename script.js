/*
  TaxBridge Solutions website JavaScript
  IMPORTANT: Replace WHATSAPP_NUMBER with your WhatsApp number including country code.
  Example India: "919876543210" (no +, spaces or hyphens).
*/
"use strict";

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // TODO: Replace with your real WhatsApp number.
const DEFAULT_WHATSAPP_MESSAGE = "Hello TaxBridge Solutions, I would like to enquire about your services.";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const whatsappFloat = document.getElementById("whatsappFloat");

function getWhatsAppUrl(message) {
  const numberIsConfigured = /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes("X");
  if (!numberIsConfigured) {
    return null;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLink() {
  const url = getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
  if (url) {
    whatsappFloat.href = url;
    whatsappFloat.target = "_blank";
    whatsappFloat.rel = "noopener noreferrer";
    whatsappFloat.removeAttribute("aria-disabled");
    whatsappFloat.title = "Chat with TaxBridge Solutions on WhatsApp";
  } else {
    whatsappFloat.href = "#contact";
    whatsappFloat.removeAttribute("target");
    whatsappFloat.title = "Set your WhatsApp number in script.js to activate chat";
    whatsappFloat.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      formNote.textContent = "To activate WhatsApp, open script.js and replace 91XXXXXXXXXX with your WhatsApp number including India's country code 91.";
      formNote.classList.add("notice");
    });
  }
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll(".service-request").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceName = link.dataset.service;
    const serviceSelect = document.getElementById("service");
    const option = Array.from(serviceSelect.options).find((item) =>
      item.text.toLowerCase().includes(serviceName.toLowerCase().replace(" & itr", ""))
    );
    if (option) serviceSelect.value = option.value || option.text;
  });
});

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
    formNote.textContent = "Your form is valid, but WhatsApp is not configured yet. Open script.js and replace 91XXXXXXXXXX with your real WhatsApp number including country code 91. No information has been sent or stored.";
    formNote.classList.add("notice");
    return;
  }

  formNote.textContent = "Opening WhatsApp with your enquiry. Please review the message and press Send in WhatsApp.";
  formNote.classList.remove("notice");
  window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== detail) other.open = false;
      });
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
updateWhatsAppLink();

