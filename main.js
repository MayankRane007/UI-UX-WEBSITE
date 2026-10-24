/* IRCTC Hotel Booking – light interactions (no dependencies) */
(function () {
  "use strict";

  /* ---------- Payment method tabs (checkout) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".pay-tab"));

  function selectTab(tab) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.setAttribute("aria-selected", active ? "true" : "false");
      t.tabIndex = active ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (!panel) return;
      panel.hidden = !active;
      // Only the visible panel's fields are required
      Array.prototype.forEach.call(panel.querySelectorAll("[data-req]"), function (field) {
        field.required = active;
      });
    });
  }

  if (tabs.length) {
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { selectTab(tab); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) { e.preventDefault(); next.focus(); selectTab(next); }
      });
    });
    selectTab(tabs[0]);
  }

  /* ---------- UPI "Verify" (sample) ---------- */
  var upi = document.getElementById("upi");
  var verified = document.getElementById("upi-verified");
  var verifyBtn = document.getElementById("verify-upi");
  if (upi && verified && verifyBtn) {
    upi.addEventListener("input", function () { verified.hidden = true; });
    verifyBtn.addEventListener("click", function () {
      verified.hidden = !/^[\w.\-]{2,}@[a-z]{2,}$/i.test(upi.value.trim());
    });
  }

  /* ---------- Checkout submit → confirmation (demo only, nothing is sent) ---------- */
  var form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var terms = document.getElementById("terms");
      var error = document.getElementById("form-error");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (terms && !terms.checked) {
        error.classList.add("show");
        terms.focus();
        return;
      }
      error.classList.remove("show");
      window.location.href = "confirmation.html";
    });
    var terms = document.getElementById("terms");
    if (terms) terms.addEventListener("change", function () {
      document.getElementById("form-error").classList.remove("show");
    });
  }

  /* ---------- Print / save voucher (confirmation) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-print]"), function (btn) {
    btn.addEventListener("click", function () { window.print(); });
  });

  /* ---------- Hotel page: highlight the section tab being viewed ---------- */
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll(".section-tabs a"));
  if (sectionLinks.length && "IntersectionObserver" in window) {
    var map = {};
    sectionLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el && id !== "top-reviews") map[id] = a;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
        var link = map[entry.target.id];
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { observer.observe(document.getElementById(id)); });
  }
})();
