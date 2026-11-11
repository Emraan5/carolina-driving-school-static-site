document.addEventListener("click", function (event) {
  var button = event.target.closest("[data-menu-toggle]");
  if (!button) return;

  var header = button.closest("header");
  if (!header) return;

  var menu = header.querySelector("nav.mobile-nav");
  if (menu) {
    menu.remove();
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    return;
  }

  var desktopNav = Array.from(header.querySelectorAll("nav")).find(function (nav) {
    return !nav.classList.contains("mobile-nav");
  });
  if (!desktopNav) return;

  menu = document.createElement("nav");
  menu.id = "mobile-navigation";
  menu.className = "mobile-nav border-t bg-background px-4 pb-4";
  menu.setAttribute("aria-label", "Mobile navigation");

  desktopNav.querySelectorAll("a").forEach(function (link) {
    var item = link.cloneNode(true);
    item.className = "block border-b py-3 font-semibold";
    menu.appendChild(item);
  });

  var contact = document.createElement("a");
  contact.href = "/contact/";
  contact.textContent = "Contact";
  contact.className = "block border-b py-3 font-semibold";
  menu.appendChild(contact);
  header.appendChild(menu);

  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-label", "Close menu");
});

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;

  var menu = document.querySelector("header nav.mobile-nav");
  if (!menu) return;

  var button = menu.closest("header").querySelector("[data-menu-toggle]");
  menu.remove();
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Open menu");
  button.focus();
});

document.addEventListener("submit", function (event) {
  var form = event.target;
  if (!(form instanceof HTMLFormElement)) return;

  event.preventDefault();
  var formData = new FormData(form);
  var body = "";
  formData.forEach(function (value, key) {
    if (key !== "website" && value) body += key + ": " + value + "\n";
  });

  var params = new URLSearchParams({
    subject: "Lesson request",
    body: body
  });
  location.href = "mailto:contact@carolinadrivingschool.com?" + params.toString();
});

var program = new URLSearchParams(location.search).get("program");
if (program) {
  var select = document.querySelector('select[name="program"]');
  if (select) select.value = program;
}