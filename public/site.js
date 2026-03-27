const LANG_KEY = "mednova-lang";
const CART_KEY = "mednova-cart-v1";
const SUPPORTED_LANGS = ["vi", "en"];

const formatters = {
  vi: new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
};

let currentLang = "vi";
let products = [];
let productById = new Map();

const cartPanel = document.querySelector("[data-cart-panel]");
const cartOverlay = document.querySelector("[data-cart-overlay]");
const cartItemsNode = document.querySelector("[data-cart-items]");
const cartEmptyNode = document.querySelector("[data-cart-empty]");
const cartTotalItemsNode = document.querySelector("[data-cart-total-items]");
const cartSubtotalNode = document.querySelector("[data-cart-subtotal]");

function safeJSONParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getProductsFromPage() {
  const dataNode = document.getElementById("products-data");
  if (!dataNode?.textContent) return [];
  const parsed = safeJSONParse(dataNode.textContent, []);
  return Array.isArray(parsed) ? parsed : [];
}

function normalizeLanguage(lang) {
  return SUPPORTED_LANGS.includes(lang) ? lang : "vi";
}

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  const parsed = safeJSONParse(raw ?? "{}", {});
  const cart = {};

  for (const [id, qty] of Object.entries(parsed)) {
    if (!productById.has(id)) continue;
    const numericQty = Number(qty);
    if (!Number.isFinite(numericQty)) continue;
    const finalQty = Math.max(0, Math.min(99, Math.floor(numericQty)));
    if (finalQty > 0) cart[id] = finalQty;
  }

  return cart;
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function cartEntries(cart) {
  return Object.entries(cart).filter(([id, qty]) => productById.has(id) && qty > 0);
}

function getPrice(product) {
  return currentLang === "vi" ? product.priceVND : product.priceUSD;
}

function formatMoney(value) {
  return formatters[currentLang].format(value);
}

function updatePricesInPage() {
  const priceNodes = document.querySelectorAll("[data-price-usd][data-price-vnd]");
  priceNodes.forEach((node) => {
    const amount =
      currentLang === "vi" ? Number(node.dataset.priceVnd ?? 0) : Number(node.dataset.priceUsd ?? 0);
    node.textContent = formatMoney(amount);
  });
}

function updateBuildDate() {
  const node = document.querySelector("[data-build-date]");
  if (!node) return;
  node.textContent = new Intl.DateTimeFormat(currentLang === "vi" ? "vi-VN" : "en-US", {
    dateStyle: "long",
  }).format(new Date());
}

function updateTitle() {
  const node = document.querySelector("[data-title-en][data-title-vi]");
  if (!node) return;
  document.title = node.dataset[currentLang] ?? document.title;
}

function applyLanguage(lang) {
  currentLang = normalizeLanguage(lang);
  document.documentElement.lang = currentLang;
  localStorage.setItem(LANG_KEY, currentLang);

  const bilingualNodes = document.querySelectorAll("[data-en][data-vi]");
  bilingualNodes.forEach((node) => {
    const value = node.dataset[currentLang];
    if (value) node.textContent = value;
  });

  const switchButtons = document.querySelectorAll("[data-lang-switch]");
  switchButtons.forEach((button) => {
    const active = button.dataset.langSwitch === currentLang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updatePricesInPage();
  updateBuildDate();
  updateTitle();
  renderCart();
}

function setCartOpen(open) {
  if (!cartPanel || !cartOverlay) return;

  cartPanel.classList.toggle("open", open);
  cartPanel.setAttribute("aria-hidden", String(!open));
  cartOverlay.hidden = !open;
  cartOverlay.classList.toggle("open", open);
  document.body.classList.toggle("cart-lock", open);
}

function setButtonFeedback(button) {
  if (!(button instanceof HTMLButtonElement)) return;
  button.classList.add("added");
  window.setTimeout(() => button.classList.remove("added"), 520);
}

function addToCart(productId, qty = 1) {
  if (!productById.has(productId)) return;
  const cart = getCart();
  const current = cart[productId] ?? 0;
  cart[productId] = Math.max(1, Math.min(99, current + qty));
  saveCart(cart);
}

function changeItemQty(productId, delta) {
  const cart = getCart();
  const current = cart[productId] ?? 0;
  const next = current + delta;
  if (next <= 0) delete cart[productId];
  else cart[productId] = Math.min(99, next);
  saveCart(cart);
}

function removeItem(productId) {
  const cart = getCart();
  if (!(productId in cart)) return;
  delete cart[productId];
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}

function renderCart() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const cart = getCart();
  const entries = cartEntries(cart);
  const totalItems = entries.reduce((acc, [, qty]) => acc + qty, 0);
  badges.forEach((node) => {
    node.textContent = String(totalItems);
  });

  if (!cartItemsNode || !cartTotalItemsNode || !cartSubtotalNode || !cartEmptyNode) return;

  const qtyLabel = currentLang === "vi" ? "SL" : "Qty";
  const removeLabel = currentLang === "vi" ? "Xóa" : "Remove";

  if (entries.length === 0) {
    cartItemsNode.innerHTML = "";
    cartEmptyNode.hidden = false;
    cartTotalItemsNode.textContent = "0";
    cartSubtotalNode.textContent = formatMoney(0);
    return;
  }

  cartEmptyNode.hidden = true;
  let subtotal = 0;

  cartItemsNode.innerHTML = entries
    .map(([id, qty]) => {
      const product = productById.get(id);
      const line = getPrice(product) * qty;
      subtotal += line;
      const name = product.name[currentLang];
      const linePrice = formatMoney(line);

      return `
      <article class="cart-item">
        <div class="cart-item-main">
          <p class="cart-item-name">${escapeHTML(name)}</p>
          <p class="cart-item-meta">SKU: ${escapeHTML(product.sku)} · ${linePrice}</p>
        </div>
        <div class="cart-item-controls">
          <button type="button" class="qty-btn" data-cart-action="decrease" data-product-id="${id}" aria-label="decrease">−</button>
          <span class="qty-value">${qtyLabel} ${qty}</span>
          <button type="button" class="qty-btn" data-cart-action="increase" data-product-id="${id}" aria-label="increase">+</button>
          <button type="button" class="remove-btn" data-cart-action="remove" data-product-id="${id}">${removeLabel}</button>
        </div>
      </article>
      `;
    })
    .join("");

  cartTotalItemsNode.textContent = String(totalItems);
  cartSubtotalNode.textContent = formatMoney(subtotal);
}

function setupEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const langButton = target.closest("[data-lang-switch]");
    if (langButton) {
      applyLanguage(langButton.dataset.langSwitch ?? "vi");
      return;
    }

    const addButton = target.closest("[data-add-to-cart]");
    if (addButton) {
      addToCart(addButton.dataset.addToCart, 1);
      setButtonFeedback(addButton);
      setCartOpen(true);
      return;
    }

    if (target.closest("[data-cart-open]")) {
      setCartOpen(true);
      return;
    }

    if (target.closest("[data-cart-close]") || target.closest("[data-cart-overlay]")) {
      setCartOpen(false);
      return;
    }

    if (target.closest("[data-cart-clear]")) {
      clearCart();
      return;
    }

    const actionButton = target.closest("[data-cart-action]");
    if (actionButton) {
      const action = actionButton.dataset.cartAction;
      const productId = actionButton.dataset.productId;
      if (!productId) return;

      if (action === "increase") changeItemQty(productId, 1);
      if (action === "decrease") changeItemQty(productId, -1);
      if (action === "remove") removeItem(productId);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setCartOpen(false);
  });
}

function init() {
  products = getProductsFromPage();
  productById = new Map(products.map((product) => [product.id, product]));

  const preferredLang = normalizeLanguage(localStorage.getItem(LANG_KEY) ?? "vi");
  setupEvents();
  applyLanguage(preferredLang);
  renderCart();
}

init();
