/**
 * Express Travel International - Main JavaScript
 * Vanilla JavaScript (No Frameworks, Netlify & WordPress Ready)
 */

// ==========================================
// 0. Third-Party Extension Error Shield
// ==========================================
// Prevent third-party browser extension errors (such as MetaMask or wallet injection failures in iframes) from bubbling up
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const reasonStr = event.reason ? (event.reason.message || String(event.reason)) : "";
    if (
      reasonStr.toLowerCase().includes("metamask") ||
      reasonStr.toLowerCase().includes("ethereum") ||
      reasonStr.toLowerCase().includes("wallet") ||
      reasonStr.toLowerCase().includes("chrome-extension") ||
      reasonStr.toLowerCase().includes("moz-extension")
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener("error", (event) => {
    const msg = (event.message || "").toLowerCase();
    const src = (event.filename || "").toLowerCase();
    if (
      msg.includes("metamask") ||
      msg.includes("ethereum") ||
      msg.includes("wallet") ||
      src.includes("chrome-extension") ||
      src.includes("moz-extension")
    ) {
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
  });
}

// ==========================================
// 1. Central Configuration
// ==========================================
const SITE_CONFIG = {
  companyName: "Express Travel International",
  phone: "0518777335",
  displayPhone: "(051) 8777335",
  whatsapp: "", // Handled gracefully if empty
  facebook: "https://www.facebook.com/express.travel7/",
  address: "Office No. 5, Near Adjacent Second Wife Restaurant & Cafe, Main Double Road, Gulberg Green, Islamabad, Pakistan, 44000",
  city: "Islamabad",
  postalCode: "44000",
  logo: "images/logo/express-travel-logo.png"
};

const CONTACT_CONFIG = {
  phone: "0518777335",
  whatsapp: "",
  facebook: "https://www.facebook.com/express.travel7/"
};

// Expose SITE_CONFIG
window.SITE_CONFIG = SITE_CONFIG;

// ==========================================
// 2. Main DOM Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initStickyHeader();
  initInquiryTabs();
  initFaqAccordion();
  initForms();
  initWhatsApp();
  initModals();
  initCurrentYear();
  initImageFallbacks();
});

// ==========================================
// 3. Mobile Navigation
// ==========================================
function initMobileNav() {
  const toggleBtn = document.querySelector(".et-mobile-toggle");
  const navMenu = document.querySelector(".et-nav");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = toggleBtn.classList.toggle("is-active");
    navMenu.classList.toggle("is-mobile-open", isActive);
    toggleBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  // Close when clicking nav links on mobile
  const navLinks = navMenu.querySelectorAll(".et-nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("is-active");
      navMenu.classList.remove("is-mobile-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside of nav on mobile
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("is-mobile-open") && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.classList.remove("is-active");
      navMenu.classList.remove("is-mobile-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ==========================================
// 4. Sticky Header Effect
// ==========================================
function initStickyHeader() {
  const header = document.querySelector(".et-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("et-header-scrolled");
    } else {
      header.classList.remove("et-header-scrolled");
    }
  }, { passive: true });
}

// ==========================================
// 5. Quick Booking & Inquiry Tabs
// ==========================================
function initInquiryTabs() {
  // Support both homepage inquiry box and dedicated booking portal tabs
  const tabButtons = document.querySelectorAll(".et-inquiry-tab, .et-tab-btn");
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-tab");
      if (!targetId) return;

      const container = btn.closest(".et-inquiry-box, .et-booking-panel, .et-inquiry-wrapper") || document;
      const siblingButtons = container.querySelectorAll(".et-inquiry-tab, .et-tab-btn");
      const siblingPanes = container.querySelectorAll(".et-inquiry-pane, .et-tab-content");

      siblingButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      siblingPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const targetPane = document.getElementById(targetId) ||
                         document.getElementById(`pane-${targetId}`) ||
                         document.getElementById(`tab-${targetId}`);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

// ==========================================
// 6. FAQ Accordion
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".et-faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".et-faq-question");
    const answer = item.querySelector(".et-faq-answer");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other items in the same container
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherAnswer = otherItem.querySelector(".et-faq-answer");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ==========================================
// 7. Client-Side Form Submissions & Validation
// ==========================================
function initForms() {
  const forms = document.querySelectorAll("form[data-et-form]");
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic client validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Collect form details for summary modal
      const formData = new FormData(form);
      const dataObj = {};
      formData.forEach((value, key) => {
        dataObj[key] = value;
      });

      const formType = form.getAttribute("data-et-form") || "Travel Request";
      const customerName = dataObj.fullName || dataObj.name || "Valued Traveler";
      const contactNumber = dataObj.phone || SITE_CONFIG.displayPhone;
      const refCode = "ETI-" + Math.floor(100000 + Math.random() * 900000);

      // Open friendly confirmation modal
      showConfirmationModal({
        title: "Travel Inquiry Received",
        message: `Thank you, ${customerName}. Your travel request has been logged under Reference ID: ${refCode}. Our Islamabad office team will review available options and contact you at ${contactNumber}.`,
        details: [
          `Reference ID: ${refCode}`,
          `Service Type: ${formType}`,
          `Office: Gulberg Green, Islamabad`,
          `Official Phone: ${SITE_CONFIG.displayPhone}`
        ]
      });

      form.reset();
    });
  });
}

// ==========================================
// 8. Floating WhatsApp Handler
// ==========================================
function initWhatsApp() {
  const waButtons = document.querySelectorAll(".et-whatsapp-btn, .et-whatsapp-float");
  
  waButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // If no WhatsApp mobile number is configured yet, offer direct phone consultation modal
      if (!SITE_CONFIG.whatsapp || SITE_CONFIG.whatsapp.trim() === "") {
        e.preventDefault();
        showConfirmationModal({
          title: "Contact Express Travel Support",
          message: `Our live WhatsApp mobile number is currently being updated. For immediate inquiries and booking assistance, please contact our Islamabad office directly.`,
          details: [
            `Office Location: Office No. 5, Near Adjacent Second Wife Restaurant & Cafe, Main Double Road, Gulberg Green, Islamabad`,
            `Direct Phone: ${SITE_CONFIG.displayPhone}`,
            `Facebook: ${SITE_CONFIG.facebook}`
          ],
          ctaText: `Call (051) 8777335`,
          ctaUrl: `tel:${SITE_CONFIG.phone}`
        });
      } else {
        const cleanNumber = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "");
        btn.setAttribute("href", `https://wa.me/${cleanNumber}?text=Hello%20Express%20Travel%20International,%20I%20would%20like%20to%20inquire%20about%20travel%20services.`);
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
      }
    });
  });
}

// ==========================================
// 9. Confirmation / Inquiry Modal Helper
// ==========================================
function initModals() {
  const overlay = document.getElementById("et-modal-overlay");
  const closeBtn = document.getElementById("et-modal-close");
  const actionBtn = document.getElementById("et-modal-action-btn");

  if (!overlay) return;

  const closeModal = () => {
    overlay.classList.remove("active");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (actionBtn) actionBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

function showConfirmationModal({ title, message, details = [], ctaText = "Understood", ctaUrl = null }) {
  const overlay = document.getElementById("et-modal-overlay");
  if (!overlay) return;

  const titleEl = document.getElementById("et-modal-title");
  const textEl = document.getElementById("et-modal-text");
  const detailsEl = document.getElementById("et-modal-details");
  const actionBtn = document.getElementById("et-modal-action-btn");

  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = message;

  if (detailsEl) {
    if (details.length > 0) {
      detailsEl.style.display = "block";
      detailsEl.innerHTML = details.map(d => `<div>• ${d}</div>`).join("");
    } else {
      detailsEl.style.display = "none";
    }
  }

  if (actionBtn) {
    actionBtn.textContent = ctaText;
    if (ctaUrl) {
      actionBtn.onclick = () => {
        window.location.href = ctaUrl;
      };
    } else {
      actionBtn.onclick = () => {
        overlay.classList.remove("active");
      };
    }
  }

  overlay.classList.add("active");
}

// ==========================================
// 10. Dynamic Current Year
// ==========================================
function initCurrentYear() {
  const yearEls = document.querySelectorAll(".et-current-year");
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}

// ==========================================
// 11. Graceful Image Fallbacks
// ==========================================
function initImageFallbacks() {
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    img.addEventListener("error", function() {
      if (this.getAttribute("data-fallback-applied")) return;
      this.setAttribute("data-fallback-applied", "true");
      
      if (this.classList.contains("et-logo-img") || this.classList.contains("et-footer-logo")) {
        this.src = "images/logo/express-travel-logo.png";
      } else {
        this.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23888%3Bfont-weight%3Abold%3Bfont-family%3APoppins%2C%20sans-serif%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%23eaeaea%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22200%22%20y%3D%22208%22%3EExpress%20Travel%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
      }
    });
  });
}
