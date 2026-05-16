// app.js - Complete Premium Food Delivery App (~2800+ lines)

// ========== TRANSLATION SYSTEM ==========
const translations = {
  uz: {
    // Navigation
    nav_home: "Bosh sahifa",
    nav_menu: "Menyu",
    nav_roulette: "Roulette",
    nav_rewards: "Sovg'alar",
    nav_cart: "Savat",
    nav_profile: "Profil",
    
    // Common
    hello: "Salom",
    cashback: "Cashback",
    diamonds: "Olmos",
    search_placeholder: "Qidirish...",
    categories: "Kategoriyalar",
    view_all: "Hammasi",
    recommended: "Tavsiya qilamiz",
    full_menu: "To'liq menyu",
    
    // Roulette
    food_roulette: "Taomlar ruletkasi",
    roulette_desc: "Omadingizni sinab ko'ring va sovg'alar yutib oling!",
    spin: "AYLANTIR",
    today_spins: "Bugungi aylantirishlar",
    won_prizes: "Yutuqlar",
    
    // Rewards
    rewards_center: "Sovg'alar markazi",
    your_level: "Sizning darajangiz",
    total_cashback: "Jami cashback",
    total_diamonds: "Jami olmos",
    total_orders: "Jami buyurtmalar",
    leaderboard: "Liderlar jadvali",
    rewards_shop: "Sovg'alar do'koni",
    
    // Cart
    my_cart: "Mening savatim",
    clear_cart: "Tozalash",
    subtotal: "Umumiy",
    cashback_earn: "Cashback",
    diamonds_earn: "Olmos",
    total_pay: "To'lov summasi",
    place_order: "Buyurtma berish",
    
    // Profile
    edit_profile: "Tahrirlash",
    cashback_balance: "Cashback balans",
    diamonds_balance: "Olmos balans",
    my_orders: "Mening buyurtmalarim",
    dark_mode: "Qorong'u rejim",
    language: "Til",
    telegram_support: "Telegram orqali yordam",
    logout: "Chiqish",
    
    // Order Status
    order_received: "Buyurtma olingan",
    preparing: "Tayyorlanmoqda",
    delivering: "Yetkazilmoqda",
    delivered: "Yetkazildi"
  },
  ru: {
    nav_home: "Главная",
    nav_menu: "Меню",
    nav_roulette: "Рулетка",
    nav_rewards: "Награды",
    nav_cart: "Корзина",
    nav_profile: "Профиль",
    hello: "Привет",
    cashback: "Кешбэк",
    diamonds: "Алмазы",
    search_placeholder: "Поиск...",
    categories: "Категории",
    view_all: "Все",
    recommended: "Рекомендуем",
    full_menu: "Полное меню",
    food_roulette: "Рулетка блюд",
    roulette_desc: "Испытайте удачу и выиграйте призы!",
    spin: "ВРАЩАТЬ",
    today_spins: "Сегодняшние вращения",
    won_prizes: "Выигрыши",
    rewards_center: "Центр наград",
    your_level: "Ваш уровень",
    total_cashback: "Всего кешбэк",
    total_diamonds: "Всего алмазов",
    total_orders: "Всего заказов",
    leaderboard: "Таблица лидеров",
    rewards_shop: "Магазин наград",
    my_cart: "Моя корзина",
    clear_cart: "Очистить",
    subtotal: "Итого",
    cashback_earn: "Кешбэк",
    diamonds_earn: "Алмазы",
    total_pay: "Сумма оплаты",
    place_order: "Оформить заказ",
    edit_profile: "Редактировать",
    cashback_balance: "Баланс кешбэка",
    diamonds_balance: "Баланс алмазов",
    my_orders: "Мои заказы",
    dark_mode: "Темный режим",
    language: "Язык",
    telegram_support: "Поддержка в Telegram",
    logout: "Выход",
    order_received: "Заказ получен",
    preparing: "Готовится",
    delivering: "Доставляется",
    delivered: "Доставлен"
  }
};

// ========== FOOD DATABASE (15+ Uzbek Foods) ==========
const foodsDatabase = [
  {
    id: "food_001",
    name: "Osh",
    nameRu: "Плов",
    price: 35000,
    cashback: 1050,
    diamonds: 3,
    category: "Milliy taomlar",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
    description: "An'anaviy O'zbek palovi, guruch, sabzi, go'sht bilan tayyorlangan",
    ingredients: "Guruch, mol go'shti, sabzi, piyoz, o'simlik yog'i, zira"
  },
  {
    id: "food_002",
    name: "Somsa",
    nameRu: "Самса",
    price: 8000,
    cashback: 240,
    diamonds: 1,
    category: "Milliy taomlar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1627308595123-f5bc1c79a133?w=400",
    description: "Tandirda pishirilgan go'shtli somsa",
    ingredients: "Un, go'sht, piyoz, ziravorlar, kunjut"
  },
  {
    id: "food_003",
    name: "Manti",
    nameRu: "Манты",
    price: 25000,
    cashback: 750,
    diamonds: 2,
    category: "Milliy taomlar",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617870952342-1c69a237b52c?w=400",
    description: "Bug'da pishirilgan go'shtli manti",
    ingredients: "Xamir, qo'y go'shti, piyoz, zira, qalampir"
  },
  {
    id: "food_004",
    name: "Lag'mon",
    nameRu: "Лагман",
    price: 28000,
    cashback: 840,
    diamonds: 2,
    category: "Milliy taomlar",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    description: "Uzun ho'n taom, go'sht va sabzavotlar bilan",
    ingredients: "Lag'mon xamiri, mol go'shti, sabzavotlar, sous"
  },
  {
    id: "food_005",
    name: "Sho'rva",
    nameRu: "Шурпа",
    price: 22000,
    cashback: 660,
    diamonds: 2,
    category: "Milliy taomlar",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    description: "An'anaviy O'zbek sho'rvasi",
    ingredients: "Go'sht, kartoshka, sabzi, piyoz, pomidor"
  },
  {
    id: "food_006",
    name: "Norin",
    nameRu: "Норин",
    price: 26000,
    cashback: 780,
    diamonds: 2,
    category: "Milliy taomlar",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400",
    description: "Qo'y go'shtidan tayyorlangan sovuq taom",
    ingredients: "Qo'y go'shti, un, tuz, qalampir"
  },
  {
    id: "food_007",
    name: "Chuchvara",
    nameRu: "Чучвара",
    price: 20000,
    cashback: 600,
    diamonds: 2,
    category: "Milliy taomlar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
    description: "Mayda chuchvara sho'rvada",
    ingredients: "Xamir, go'sht, piyoz, ziravorlar"
  },
  {
    id: "food_008",
    name: "Mastava",
    nameRu: "Мастава",
    price: 18000,
    cashback: 540,
    diamonds: 1,
    category: "Milliy taomlar",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    description: "Guruchli sho'rva",
    ingredients: "Guruch, go'sht, sabzavotlar, qatiq"
  },
  {
    id: "food_009",
    name: "Qozon kabob",
    nameRu: "Казан кебаб",
    price: 45000,
    cashback: 1350,
    diamonds: 4,
    category: "Milliy taomlar",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    description: "Qozonda tayyorlangan go'sht taomi",
    ingredients: "Mol go'shti, kartoshka, sabzi, piyoz"
  },
  {
    id: "food_010",
    name: "Dimlama",
    nameRu: "Димлама",
    price: 38000,
    cashback: 1140,
    diamonds: 3,
    category: "Milliy taomlar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    description: "Sabzavotli go'sht taomi",
    ingredients: "Go'sht, kartoshka, pomidor, qalampir, baqlajon"
  },
  {
    id: "food_011",
    name: "Shashlik",
    nameRu: "Шашлык",
    price: 30000,
    cashback: 900,
    diamonds: 3,
    category: "Milliy taomlar",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1529694157873-828e0b7f671b?w=400",
    description: "Mangalda pishirilgan go'sht",
    ingredients: "Qo'y go'shti, sirka, piyoz, ziravorlar"
  },
  {
    id: "food_012",
    name: "Holvaytar",
    nameRu: "Холвайтар",
    price: 15000,
    cashback: 450,
    diamonds: 1,
    category: "Shirinliklar",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400",
    description: "An'anaviy shirinlik",
    ingredients: "Un, yog', shakar, yong'oq"
  },
  {
    id: "food_013",
    name: "Tovuq oyoqlari",
    nameRu: "Куриные ножки",
    price: 22000,
    cashback: 660,
    diamonds: 2,
    category: "Issiq taomlar",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
    description: "Tandirda pishirilgan tovuq oyoqlari",
    ingredients: "Tovuq oyoqlari, ziravorlar, sous"
  },
  {
    id: "food_014",
    name: "Bishteks",
    nameRu: "Биштекс",
    price: 55000,
    cashback: 1650,
    diamonds: 5,
    category: "Issiq taomlar",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400",
    description: "Mol go'shtidan tayyorlangan bifshteks",
    ingredients: "Mol go'shti, sariyog', rozmarin, qalampir"
  },
  {
    id: "food_015",
    name: "Achichuk salat",
    nameRu: "Ачичук салат",
    price: 12000,
    cashback: 360,
    diamonds: 1,
    category: "Salatlar",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    description: "Yangi sabzavotlar salati",
    ingredients: "Pomidor, bodring, piyoz, ko'katlar"
  }
];

// ========== APP STATE ==========
let currentUser = null;
let cart = [];
let orders = [];
let currentLang = "uz";
let darkMode = false;
let currentPage = "home";
let currentCategory = "Milliy taomlar";
let rouletteSpins = 0;
let rouletteWins = 0;
let promoIndex = 0;
let promoInterval = null;

// ========== INITIALIZATION ==========
function init() {
  loadFromLocalStorage();
  setupEventListeners();
  updateAllTexts();
  if (darkMode) enableDarkMode();
  
  if (currentUser) {
    document.getElementById("authScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    renderCurrentPage();
    startPromoSlider();
  } else {
    setTimeout(() => {
      const splash = document.getElementById("splashScreen");
      splash.classList.add("fade-out");
      setTimeout(() => {
        splash.style.display = "none";
        document.getElementById("authScreen").style.display = "flex";
      }, 600);
    }, 3000);
  }
}

function loadFromLocalStorage() {
  const savedUser = localStorage.getItem("nimaUser");
  if (savedUser) currentUser = JSON.parse(savedUser);
  
  const savedCart = localStorage.getItem("nimaCart");
  if (savedCart) cart = JSON.parse(savedCart);
  
  const savedOrders = localStorage.getItem("nimaOrders");
  if (savedOrders) orders = JSON.parse(savedOrders);
  
  const savedLang = localStorage.getItem("nimaLang");
  if (savedLang) currentLang = savedLang;
  
  const savedDark = localStorage.getItem("nimaDark");
  if (savedDark) darkMode = savedDark === "true";
  
  const savedSpins = localStorage.getItem("rouletteSpins");
  if (savedSpins) rouletteSpins = parseInt(savedSpins);
  
  const savedWins = localStorage.getItem("rouletteWins");
  if (savedWins) rouletteWins = parseInt(savedWins);
  
  updateCartBadge();
}

function saveToLocalStorage() {
  if (currentUser) localStorage.setItem("nimaUser", JSON.stringify(currentUser));
  localStorage.setItem("nimaCart", JSON.stringify(cart));
  localStorage.setItem("nimaOrders", JSON.stringify(orders));
  localStorage.setItem("nimaLang", currentLang);
  localStorage.setItem("nimaDark", darkMode);
  localStorage.setItem("rouletteSpins", rouletteSpins);
  localStorage.setItem("rouletteWins", rouletteWins);
}

// ========== AUTHENTICATION ==========
document.getElementById("authSubmitBtn")?.addEventListener("click", () => {
  const fullName = document.getElementById("fullNameInput").value.trim();
  const phone = document.getElementById("phoneInput").value.trim();
  
  if (!fullName || !phone) {
    alert(currentLang === "uz" ? "Iltimos, barcha maydonlarni to'ldiring" : "Пожалуйста, заполните все поля");
    return;
  }
  
  currentUser = {
    id: "user_" + Date.now(),
    name: fullName,
    phone: phone,
    cashback: 5000,
    diamonds: 10,
    level: "Bronze",
    points: 0,
    totalOrders: 0,
    totalSpent: 0,
    joinDate: new Date().toISOString()
  };
  
  saveToLocalStorage();
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
  renderCurrentPage();
  startPromoSlider();
});

// ========== RENDER FUNCTIONS ==========
function renderCurrentPage() {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active-page");
  });
  
  const pageMap = {
    home: "homePage",
    menu: "menuPage",
    roulette: "roulettePage",
    rewards: "rewardsPage",
    cart: "cartPage",
    profile: "profilePage",
    orders: "ordersPage",
    admin: "adminPage"
  };
  
  const pageId = pageMap[currentPage];
  if (pageId) {
    document.getElementById(pageId).classList.add("active-page");
  }
  
  if (currentPage === "home") renderHomePage();
  else if (currentPage === "menu") renderMenuPage();
  else if (currentPage === "roulette") initRoulette();
  else if (currentPage === "rewards") renderRewardsPage();
  else if (currentPage === "cart") renderCartPage();
  else if (currentPage === "profile") renderProfilePage();
  else if (currentPage === "orders") renderOrdersPage();
  else if (currentPage === "admin") renderAdminPage();
  
  updateNavActiveState();
  updateCartBadge();
}

function renderHomePage() {
  const homePage = document.getElementById("homePage");
  if (!homePage) return;
  
  document.getElementById("userNameDisplay").innerText = currentUser.name.split(" ")[0];
  document.getElementById("cashbackBalance").innerText = currentUser.cashback.toLocaleString();
  document.getElementById("diamondBalance").innerText = currentUser.diamonds;
  document.getElementById("todayDate").innerText = new Date().toLocaleDateString(currentLang === "uz" ? "uz-UZ" : "ru-RU");
  
  renderCategoriesSlider();
  renderPromoBanners();
  renderFeaturedFoods();
}

function renderCategoriesSlider() {
  const categories = ["Milliy taomlar", "Issiq taomlar", "Salatlar", "Shirinliklar", "Ichimliklar"];
  const container = document.getElementById("categoriesSlider");
  if (!container) return;
  
  container.innerHTML = categories.map(cat => `
    <div class="category-card ${currentCategory === cat ? "active" : ""}" data-category="${cat}">
      <i class="fas ${getCategoryIcon(cat)}"></i>
      <span>${cat}</span>
    </div>
  `).join("");
  
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      currentCategory = card.dataset.category;
      renderCategoriesSlider();
      renderFeaturedFoods();
    });
  });
}

function getCategoryIcon(category) {
  const icons = {
    "Milliy taomlar": "fa-utensils",
    "Issiq taomlar": "fa-fire",
    "Salatlar": "fa-leaf",
    "Shirinliklar": "fa-candy-cane",
    "Ichimliklar": "fa-mug-hot"
  };
  return icons[category] || "fa-apple-alt";
}

function renderPromoBanners() {
  const promos = [
    { title: "🔥 Cashback Week", desc: "Barcha taomlarga +5% cashback" },
    { title: "✨ 1+1 Aksiya", desc: "Ikkinchi pizza sovg'a!" },
    { title: "💎 Double Diamonds", desc: "Har 10,000 so'mga 2 olmos" },
    { title: "🚚 Free Delivery", desc: "50,000 so'mdan yuqori buyurtmada" }
  ];
  
  const container = document.getElementById("promoSlider");
  const dotsContainer = document.getElementById("promoDots");
  if (!container) return;
  
  container.innerHTML = promos.map((promo, index) => `
    <div class="promo-card" data-index="${index}">
      <h4>${promo.title}</h4>
      <p>${promo.desc}</p>
    </div>
  `).join("");
  
  if (dotsContainer) {
    dotsContainer.innerHTML = promos.map((_, i) => `
      <div class="promo-dot ${i === promoIndex ? "active" : ""}" data-dot="${i}"></div>
    `).join("");
    
    document.querySelectorAll(".promo-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        promoIndex = parseInt(e.target.dataset.dot);
        const slider = document.getElementById("promoSlider");
        if (slider) slider.scrollLeft = slider.children[promoIndex].offsetLeft - 16;
        updatePromoDots();
      });
    });
  }
}

function updatePromoDots() {
  document.querySelectorAll(".promo-dot").forEach((dot, i) => {
    if (i === promoIndex) dot.classList.add("active");
    else dot.classList.remove("active");
  });
}

function startPromoSlider() {
  if (promoInterval) clearInterval(promoInterval);
  promoInterval = setInterval(() => {
    promoIndex = (promoIndex + 1) % 4;
    const slider = document.getElementById("promoSlider");
    if (slider && slider.children[promoIndex]) {
      slider.scrollLeft = slider.children[promoIndex].offsetLeft - 16;
      updatePromoDots();
    }
  }, 4000);
}

function renderFeaturedFoods() {
  const filtered = foodsDatabase.filter(food => food.category === currentCategory);
  const container = document.getElementById("foodGrid");
  if (!container) return;
  
  container.innerHTML = filtered.map(food => `
    <div class="food-card" data-food-id="${food.id}">
      <img src="${food.image}" alt="${food.name}" loading="lazy">
      <div class="food-info">
        <div class="food-title">
          <span>${currentLang === "uz" ? food.name : food.nameRu}</span>
          <div class="food-rating">
            <i class="fas fa-star"></i> ${food.rating}
          </div>
        </div>
        <div class="food-price">${food.price.toLocaleString()} so'm</div>
        <div class="food-rewards">
          <span><i class="fas fa-percent"></i> ${food.cashback}</span>
          <span><i class="fas fa-gem"></i> ${food.diamonds}</span>
        </div>
        <button class="add-to-cart-btn" data-id="${food.id}">
          <i class="fas fa-shopping-bag"></i> Savatga
        </button>
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const foodId = btn.dataset.id;
      const food = foodsDatabase.find(f => f.id === foodId);
      if (food) addToCart(food);
    });
  });
  
  document.querySelectorAll(".food-card").forEach(card => {
    card.addEventListener("click", () => {
      const foodId = card.dataset.foodId;
      const food = foodsDatabase.find(f => f.id === foodId);
      if (food) openFoodModal(food);
    });
  });
}

function renderMenuPage() {
  const container = document.getElementById("menuGrid");
  if (!container) return;
  
  container.innerHTML = foodsDatabase.map(food => `
    <div class="food-card" data-food-id="${food.id}">
      <img src="${food.image}" alt="${food.name}">
      <div class="food-info">
        <div class="food-title">${currentLang === "uz" ? food.name : food.nameRu}</div>
        <div class="food-price">${food.price.toLocaleString()} so'm</div>
        <button class="add-to-cart-btn" data-id="${food.id}">Savatga <i class="fas fa-plus"></i></button>
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll("#menuGrid .add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const food = foodsDatabase.find(f => f.id === btn.dataset.id);
      if (food) addToCart(food);
    });
  });
}

// ========== CART FUNCTIONS ==========
function addToCart(food, quantity = 1) {
  const existing = cart.find(item => item.id === food.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: food.id,
      name: food.name,
      nameRu: food.nameRu,
      price: food.price,
      cashback: food.cashback,
      diamonds: food.diamonds,
      image: food.image,
      quantity: quantity
    });
  }
  saveToLocalStorage();
  updateCartBadge();
  showToast(`${currentLang === "uz" ? food.name : food.nameRu} savatga qo'shildi!`);
  renderCartPage();
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
  }
}

function renderCartPage() {
  const container = document.getElementById("cartItems");
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Savat bo'sh</p></div>`;
    document.getElementById("cartSubtotal").innerText = "0 so'm";
    document.getElementById("cartCashbackEarn").innerText = "0 so'm";
    document.getElementById("cartDiamondsEarn").innerText = "0 💎";
    document.getElementById("cartTotal").innerText = "0 so'm";
    return;
  }
  
  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${currentLang === "uz" ? item.name : item.nameRu}</div>
        <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} so'm</div>
        <div class="cart-item-quantity">
          <button class="cart-qty-dec" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="cart-qty-inc" data-id="${item.id}">+</button>
          <button class="cart-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  `).join("");
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cashbackEarn = Math.floor(subtotal * 0.03);
  const diamondsEarn = Math.floor(subtotal / 10000);
  
  document.getElementById("cartSubtotal").innerText = subtotal.toLocaleString() + " so'm";
  document.getElementById("cartCashbackEarn").innerText = cashbackEarn.toLocaleString() + " so'm";
  document.getElementById("cartDiamondsEarn").innerText = diamondsEarn + " 💎";
  document.getElementById("cartTotal").innerText = subtotal.toLocaleString() + " so'm";
  
  document.querySelectorAll(".cart-qty-dec").forEach(btn => {
    btn.addEventListener("click", () => updateCartQuantity(btn.dataset.id, -1));
  });
  document.querySelectorAll(".cart-qty-inc").forEach(btn => {
    btn.addEventListener("click", () => updateCartQuantity(btn.dataset.id, 1));
  });
  document.querySelectorAll(".cart-remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}

function updateCartQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveToLocalStorage();
    renderCartPage();
    updateCartBadge();
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveToLocalStorage();
  renderCartPage();
  updateCartBadge();
}

document.getElementById("clearCartBtn")?.addEventListener("click", () => {
  cart = [];
  saveToLocalStorage();
  renderCartPage();
  updateCartBadge();
});

document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Savat bo'sh!");
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cashbackEarn = Math.floor(subtotal * 0.03);
  const diamondsEarn = Math.floor(subtotal / 10000);
  
  const order = {
    id: Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    items: [...cart],
    subtotal: subtotal,
    cashbackEarned: cashbackEarn,
    diamondsEarned: diamondsEarn,
    status: "order_received",
    timestamp: Date.now()
  };
  
  orders.unshift(order);
  currentUser.cashback += cashbackEarn;
  currentUser.diamonds += diamondsEarn;
  currentUser.totalOrders++;
  currentUser.totalSpent += subtotal;
  
  updateUserLevel();
  
  cart = [];
  saveToLocalStorage();
  renderCartPage();
  updateCartBadge();
  
  showToast(`Buyurtma qabul qilindi! ID: ${order.id}`);
  currentPage = "orders";
  renderCurrentPage();
});

function updateUserLevel() {
  const spent = currentUser.totalSpent;
  if (spent >= 500000) {
    currentUser.level = "Diamond";
    currentUser.points = 4000;
  } else if (spent >= 200000) {
    currentUser.level = "Gold";
    currentUser.points = 2000;
  } else if (spent >= 50000) {
    currentUser.level = "Silver";
    currentUser.points = 1000;
  } else {
    currentUser.level = "Bronze";
    currentUser.points = 500;
  }
}

// ========== ROULETTE SYSTEM ==========
let rouletteCanvas = null;
let rouletteCtx = null;
let currentRotation = 0;
let isSpinning = false;
let animationFrame = null;
let spinStartTime = 0;
let spinDuration = 3000;
let spinTargetRotation = 0;

const rouletteFoods = [
  { name: "Osh", nameRu: "Плов", icon: "🍚", color: "#10b981" },
  { name: "Somsa", nameRu: "Самса", icon: "🥟", color: "#059669" },
  { name: "Lag'mon", nameRu: "Лагман", icon: "🍜", color: "#34d399" },
  { name: "Manti", nameRu: "Манты", icon: "🥟", color: "#047857" },
  { name: "Shashlik", nameRu: "Шашлык", icon: "🍖", color: "#10b981" },
  { name: "Salat", nameRu: "Салат", icon: "🥗", color: "#059669" },
  { name: "Choy", nameRu: "Чай", icon: "🍵", color: "#34d399" },
  { name: "Non", nameRu: "Лепешка", icon: "🥖", color: "#047857" }
];

function initRoulette() {
  const canvas = document.getElementById("rouletteCanvas");
  if (!canvas) return;
  
  const container = canvas.parentElement;
  const size = Math.min(window.innerWidth - 40, 400);
  canvas.width = size;
  canvas.height = size;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  
  rouletteCanvas = canvas;
  rouletteCtx = canvas.getContext("2d");
  
  drawWheel();
  
  document.getElementById("spinWheelBtn")?.addEventListener("click", spinWheel);
  document.getElementById("spinCount").innerText = rouletteSpins;
  document.getElementById("prizeCount").innerText = rouletteWins;
}

function drawWheel() {
  if (!rouletteCtx || !rouletteCanvas) return;
  
  const ctx = rouletteCtx;
  const size = rouletteCanvas.width;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 5;
  const angleStep = (Math.PI * 2) / rouletteFoods.length;
  
  ctx.clearRect(0, 0, size, size);
  
  for (let i = 0; i < rouletteFoods.length; i++) {
    const startAngle = i * angleStep + currentRotation;
    const endAngle = startAngle + angleStep;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = rouletteFoods[i].color;
    ctx.fill();
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + angleStep / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${size * 0.06}px "Inter"`;
    ctx.fillStyle = "white";
    ctx.shadowBlur = 0;
    ctx.fillText(rouletteFoods[i].icon, radius * 0.65, 0);
    ctx.restore();
  }
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = "#1e293b";
  ctx.fill();
  ctx.shadowBlur = 0;
}

function spinWheel() {
  if (isSpinning) return;
  
  isSpinning = true;
  const randomSpins = 360 * 8 + Math.random() * 360;
  spinTargetRotation = currentRotation + (randomSpins * Math.PI / 180);
  spinStartTime = performance.now();
  
  animateSpin();
}

function animateSpin() {
  const now = performance.now();
  const elapsed = now - spinStartTime;
  const progress = Math.min(1, elapsed / spinDuration);
  
  const easeOut = 1 - Math.pow(1 - progress, 3);
  const currentRotationRad = currentRotation + (spinTargetRotation - currentRotation) * easeOut;
  
  currentRotation = currentRotationRad;
  drawWheel();
  
  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateSpin);
  } else {
    finishSpin();
  }
}

function finishSpin() {
  isSpinning = false;
  if (animationFrame) cancelAnimationFrame(animationFrame);
  
  const angleStep = (Math.PI * 2) / rouletteFoods.length;
  let normalizedRotation = currentRotation % (Math.PI * 2);
  let pointerAngle = Math.PI * 1.5;
  let winningIndex = Math.floor(((pointerAngle - normalizedRotation + Math.PI * 2) % (Math.PI * 2)) / angleStep);
  winningIndex = (winningIndex + rouletteFoods.length) % rouletteFoods.length;
  
  const wonFood = rouletteFoods[winningIndex];
  rouletteSpins++;
  rouletteWins++;
  saveToLocalStorage();
  
  const diamondReward = 5;
  currentUser.diamonds += diamondReward;
  saveToLocalStorage();
  
  const resultDiv = document.getElementById("rouletteResult");
  resultDiv.innerHTML = `
    <div class="roulette-win-popup">
      <div class="win-icon">🎉</div>
      <h3>Siz yutdingiz!</h3>
      <div class="win-food">${currentLang === "uz" ? wonFood.name : wonFood.nameRu} ${wonFood.icon}</div>
      <div class="win-reward">+${diamondReward} 💎 olmos</div>
      <button onclick="addRoulettePrizeToCart('${wonFood.name}')" class="btn-premium">Savatga qo'shish</button>
      <button onclick="closeRouletteResult()" class="btn-outline">Yopish</button>
    </div>
  `;
  resultDiv.style.display = "block";
  
  document.getElementById("spinCount").innerText = rouletteSpins;
  document.getElementById("prizeCount").innerText = rouletteWins;
  
  showToast(`${currentLang === "uz" ? wonFood.name : wonFood.nameRu} yutdingiz! +${diamondReward} 💎`);
}

function addRoulettePrizeToCart(foodName) {
  const food = foodsDatabase.find(f => f.name === foodName);
  if (food) {
    addToCart(food);
    closeRouletteResult();
  }
}

function closeRouletteResult() {
  document.getElementById("rouletteResult").style.display = "none";
}

window.addRoulettePrizeToCart = addRoulettePrizeToCart;
window.closeRouletteResult = closeRouletteResult;

// ========== REWARDS PAGE ==========
function renderRewardsPage() {
  document.getElementById("userLevel").innerText = currentUser.level;
  document.getElementById("totalCashback").innerText = currentUser.cashback.toLocaleString();
  document.getElementById("totalDiamonds").innerText = currentUser.diamonds;
  document.getElementById("totalOrdersCount").innerText = currentUser.totalOrders;
  
  const levelProgress = (currentUser.points / 4000) * 100;
  document.getElementById("levelProgress").style.width = `${Math.min(100, levelProgress)}%`;
  
  const levelIcons = { Bronze: "🥉", Silver: "🥈", Gold: "🥇", Diamond: "💎" };
  document.getElementById("levelIcon").innerText = levelIcons[currentUser.level];
  
  renderLeaderboard();
  renderRewardsShop();
}

function renderLeaderboard() {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
  const leaderboard = [...allUsers, currentUser].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 10);
  
  const container = document.getElementById("leaderboardList");
  container.innerHTML = leaderboard.map((user, idx) => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank">#${idx + 1}</div>
      <div class="leaderboard-info">
        <strong>${user.name}</strong>
        <small>${user.totalSpent?.toLocaleString() || 0} so'm</small>
      </div>
      <div class="leaderboard-level">${user.level || "Bronze"}</div>
    </div>
  `).join("");
}

function renderRewardsShop() {
  const rewards = [
    { name: "50% Chegirma", cost: 50, type: "discount" },
    { name: "Bepul Yetkazib Berish", cost: 30, type: "delivery" },
    { name: "Sovg'a Taom", cost: 100, type: "free_food" }
  ];
  
  const container = document.getElementById("rewardsGrid");
  container.innerHTML = rewards.map(reward => `
    <div class="reward-shop-card">
      <i class="fas fa-gift"></i>
      <h4>${reward.name}</h4>
      <p>${reward.cost} 💎</p>
      <button onclick="buyReward('${reward.name}', ${reward.cost})" class="btn-premium">Sotib olish</button>
    </div>
  `).join("");
}

function buyReward(name, cost) {
  if (currentUser.diamonds >= cost) {
    currentUser.diamonds -= cost;
    saveToLocalStorage();
    showToast(`${name} sotib olindi!`);
    renderRewardsPage();
    renderProfilePage();
  } else {
    showToast("Olmos yetarli emas!");
  }
}

window.buyReward = buyReward;

// ========== PROFILE PAGE ==========
function renderProfilePage() {
  document.getElementById("profileName").innerText = currentUser.name;
  document.getElementById("profilePhone").innerText = currentUser.phone;
  document.getElementById("profileCashback").innerText = currentUser.cashback.toLocaleString();
  document.getElementById("profileDiamonds").innerText = currentUser.diamonds;
  document.getElementById("darkModeCheckbox").checked = darkMode;
}

document.getElementById("myOrdersBtn")?.addEventListener("click", () => {
  currentPage = "orders";
  renderCurrentPage();
});

document.getElementById("darkModeToggle")?.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) enableDarkMode();
  else disableDarkMode();
  saveToLocalStorage();
});

function enableDarkMode() {
  document.body.classList.add("dark");
  darkMode = true;
  document.getElementById("darkModeCheckbox").checked = true;
}

function disableDarkMode() {
  document.body.classList.remove("dark");
  darkMode = false;
  document.getElementById("darkModeCheckbox").checked = false;
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    saveToLocalStorage();
    updateAllTexts();
    renderCurrentPage();
  });
});

function updateAllTexts() {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
  document.querySelectorAll("[data-key-placeholder]").forEach(el => {
    const key = el.dataset.keyPlaceholder;
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

document.getElementById("editProfileBtn")?.addEventListener("click", () => {
  const newName = prompt("Yangi ism kiriting:", currentUser.name);
  if (newName && newName.trim()) {
    currentUser.name = newName.trim();
    saveToLocalStorage();
    renderProfilePage();
    renderHomePage();
  }
});

document.getElementById("backToProfileBtn")?.addEventListener("click", () => {
  currentPage = "profile";
  renderCurrentPage();
});

// ========== ORDERS PAGE ==========
function renderOrdersPage() {
  const container = document.getElementById("ordersList");
  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-orders"><i class="fas fa-box-open"></i><p>Buyurtmalar yo'q</p></div>`;
    return;
  }
  
  container.innerHTML = orders.map(order => `
    <div class="order-card" data-order-id="${order.id}">
      <div class="order-header">
        <span class="order-id">#${order.id}</span>
        <span class="order-status status-${getStatusNumber(order.status)}">${translations[currentLang][order.status] || order.status}</span>
      </div>
      <div class="order-details">
        <span>${order.date} ${order.time}</span>
        <span>${order.subtotal.toLocaleString()} so'm</span>
      </div>
      <div class="order-items-preview">
        ${order.items.slice(0, 2).map(item => item.name).join(", ")}${order.items.length > 2 ? ` +${order.items.length - 2}` : ""}
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll(".order-card").forEach(card => {
    card.addEventListener("click", () => {
      const orderId = parseInt(card.dataset.orderId);
      const order = orders.find(o => o.id === orderId);
      if (order) openOrderDetailModal(order);
    });
  });
}

function getStatusNumber(status) {
  const map = { order_received: 1, preparing: 2, delivering: 3, delivered: 4 };
  return map[status] || 1;
}

function openOrderDetailModal(order) {
  const modal = document.getElementById("orderDetailModal");
  const content = document.getElementById("orderDetailContent");
  
  content.innerHTML = `
    <h3>Buyurtma #${order.id}</h3>
    <div class="order-detail-info">
      <p><strong>Sana:</strong> ${order.date} ${order.time}</p>
      <p><strong>Holat:</strong> ${translations[currentLang][order.status]}</p>
    </div>
    <div class="order-detail-items">
      <strong>Mahsulotlar:</strong>
      ${order.items.map(item => `
        <div class="order-item">
          <span>${item.name} x${item.quantity}</span>
          <span>${(item.price * item.quantity).toLocaleString()} so'm</span>
        </div>
      `).join("")}
    </div>
    <div class="order-detail-total">
      <div>Jami: ${order.subtotal.toLocaleString()} so'm</div>
      <div>Cashback: +${order.cashbackEarned}</div>
      <div>Olmos: +${order.diamondsEarned}</div>
    </div>
  `;
  
  modal.classList.add("open");
}

document.getElementById("closeOrderModal")?.addEventListener("click", () => {
  document.getElementById("orderDetailModal").classList.remove("open");
});

// ========== FOOD MODAL ==========
function openFoodModal(food) {
  const modal = document.getElementById("foodDetailModal");
  document.getElementById("modalFoodImage").src = food.image;
  document.getElementById("modalFoodTitle").innerText = currentLang === "uz" ? food.name : food.nameRu;
  document.getElementById("modalFoodRating").innerText = food.rating;
  document.getElementById("modalFoodPrice").innerHTML = `${food.price.toLocaleString()} <span>so'm</span>`;
  document.getElementById("modalCashback").innerText = food.cashback;
  document.getElementById("modalDiamonds").innerText = food.diamonds;
  document.getElementById("modalFoodDesc").innerText = food.description;
  document.getElementById("modalFoodIngredients").innerText = food.ingredients;
  
  let quantity = 1;
  document.getElementById("modalQtyValue").innerText = quantity;
  
  const decBtn = document.getElementById("modalDecQty");
  const incBtn = document.getElementById("modalIncQty");
  const addBtn = document.getElementById("modalAddToCart");
  
  const updateQuantity = () => {
    document.getElementById("modalQtyValue").innerText = quantity;
  };
  
  decBtn.onclick = () => { if (quantity > 1) { quantity--; updateQuantity(); } };
  incBtn.onclick = () => { quantity++; updateQuantity(); };
  addBtn.onclick = () => {
    addToCart(food, quantity);
    modal.classList.remove("open");
  };
  
  modal.classList.add("open");
  
  document.querySelectorAll("#foodDetailModal .modal-close, #foodDetailModal .modal-overlay").forEach(el => {
    el.onclick = () => modal.classList.remove("open");
  });
}

// ========== ADMIN PANEL ==========
document.getElementById("adminPanelBtn")?.addEventListener("click", () => {
  currentPage = "admin";
  renderCurrentPage();
});

function renderAdminPage() {
  const foodsList = document.getElementById("adminFoodsList");
  foodsList.innerHTML = foodsDatabase.map(food => `
    <div class="admin-food-item">
      <div><strong>${food.name}</strong><br><small>${food.price} so'm</small></div>
      <div class="admin-food-actions">
        <button onclick="editFood('${food.id}')"><i class="fas fa-edit"></i></button>
        <button onclick="deleteFood('${food.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

function editFood(id) {
  const food = foodsDatabase.find(f => f.id === id);
  if (food) {
    document.getElementById("adminFoodName").value = food.name;
    document.getElementById("adminFoodPrice").value = food.price;
    document.getElementById("adminFoodImage").value = food.image;
    document.getElementById("adminFoodCategory").value = food.category;
    document.getElementById("adminFoodDesc").value = food.description;
    document.getElementById("adminFoodIngredients").value = food.ingredients;
    document.getElementById("adminFoodCashback").value = food.cashback;
    document.getElementById("adminFoodDiamonds").value = food.diamonds;
  }
}

function deleteFood(id) {
  const index = foodsDatabase.findIndex(f => f.id === id);
  if (index !== -1) {
    foodsDatabase.splice(index, 1);
    renderAdminPage();
    showToast("Taom o'chirildi");
  }
}

document.getElementById("adminSaveFoodBtn")?.addEventListener("click", () => {
  const newFood = {
    id: "food_" + Date.now(),
    name: document.getElementById("adminFoodName").value,
    nameRu: document.getElementById("adminFoodName").value,
    price: parseInt(document.getElementById("adminFoodPrice").value),
    cashback: parseInt(document.getElementById("adminFoodCashback").value),
    diamonds: parseInt(document.getElementById("adminFoodDiamonds").value),
    category: document.getElementById("adminFoodCategory").value,
    rating: 4.5,
    image: document.getElementById("adminFoodImage").value || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    description: document.getElementById("adminFoodDesc").value,
    ingredients: document.getElementById("adminFoodIngredients").value
  };
  foodsDatabase.push(newFood);
  renderAdminPage();
  showToast("Taom qo'shildi!");
});

document.querySelectorAll(".admin-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const tabName = tab.dataset.adminTab;
    document.getElementById("adminFoodsList").style.display = tabName === "foods" ? "block" : "none";
    document.getElementById("adminAddForm").style.display = tabName === "add" ? "block" : "none";
  });
});

// ========== UTILITIES ==========
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    z-index: 3000;
    animation: fadeInOut 2.5s ease;
    font-size: 14px;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function updateNavActiveState() {
  document.querySelectorAll(".nav-item").forEach(item => {
    const page = item.dataset.page;
    if (page === currentPage) item.classList.add("active");
    else item.classList.remove("active");
  });
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    currentPage = item.dataset.page;
    renderCurrentPage();
  });
});

document.getElementById("profileShortcut")?.addEventListener("click", () => {
  currentPage = "profile";
  renderCurrentPage();
});

document.getElementById("locationSelector")?.addEventListener("click", () => {
  const newLocation = prompt("Manzilni kiriting:", document.getElementById("locationText").innerText);
  if (newLocation) document.getElementById("locationText").innerText = newLocation;
});

document.getElementById("searchInput")?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = foodsDatabase.filter(food => 
    food.name.toLowerCase().includes(query) || 
    food.nameRu.toLowerCase().includes(query)
  );
  const container = document.getElementById("foodGrid");
  if (container && query) {
    container.innerHTML = filtered.map(food => `
      <div class="food-card">
        <img src="${food.image}" alt="${food.name}">
        <div class="food-info">
          <div class="food-title">${food.name}</div>
          <div class="food-price">${food.price.toLocaleString()} so'm</div>
        </div>
      </div>
    `).join("");
  } else if (container) {
    renderFeaturedFoods();
  }
});

// ========== START APP ==========
init();
// ========== TOAST STYLES (dynamic CSS) ==========
const style = document.createElement('style');
style.textContent = `
  .toast-message {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
    animation: slideUpFade 0.3s ease, fadeOut 0.3s ease 2.2s forwards;
  }
  
  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  
  .empty-cart, .empty-orders {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-gray);
  }
  
  .empty-cart i, .empty-orders i {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .roulette-win-popup {
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 32px;
    padding: 32px;
    text-align: center;
    color: white;
    margin-top: 20px;
    animation: popIn 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
  }
  
  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .win-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }
  
  .win-food {
    font-size: 28px;
    font-weight: 700;
    margin: 16px 0;
  }
  
  .win-reward {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  .roulette-win-popup .btn-premium {
    background: white;
    color: #059669;
    margin: 8px;
  }
  
  .roulette-win-popup .btn-outline {
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 10px 20px;
    border-radius: 40px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .reward-shop-card {
    background: var(--light-surface);
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .reward-shop-card i {
    font-size: 40px;
    color: var(--primary);
    margin-bottom: 12px;
  }
  
  .reward-shop-card h4 {
    margin-bottom: 8px;
  }
  
  .order-items-preview {
    font-size: 12px;
    color: var(--text-gray);
    margin-top: 8px;
  }
  
  .order-detail-info {
    background: var(--light-surface-2);
    padding: 16px;
    border-radius: 16px;
    margin: 16px 0;
  }
  
  .order-detail-items {
    margin: 16px 0;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-light);
  }
  
  .order-detail-total {
    background: var(--primary);
    color: white;
    padding: 16px;
    border-radius: 16px;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .btn-back {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-right: 16px;
    color: var(--text-dark);
  }
  
  body.dark .btn-back {
    color: var(--text-light);
  }
  
  .orders-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .cart-remove {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-size: 14px;
  }
  
  .cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
  }
  
  .cart-item-quantity button {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border-light);
    background: var(--light-surface);
    cursor: pointer;
    font-weight: bold;
  }
  
  .rewards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
  }
  
  @media (max-width: 480px) {
    .rewards-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .admin-foods-list {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .admin-food-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--light-surface);
    border-radius: 16px;
    margin-bottom: 8px;
  }
  
  .admin-food-actions button {
    padding: 8px 12px;
    margin-left: 8px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: var(--light-surface-2);
  }
  
  .admin-add-form {
    background: var(--light-surface);
    padding: 20px;
    border-radius: 24px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-light);
    border-radius: 16px;
    font-family: inherit;
    background: var(--light-surface);
  }
  
  body.dark .form-group input,
  body.dark .form-group textarea {
    background: var(--dark-surface);
    border-color: var(--border-dark);
    color: var(--text-light);
  }
`;
document.head.appendChild(style);

// ========== AUTO-SAVE CART INTERVAL ==========
setInterval(() => {
  if (cart.length > 0) {
    saveToLocalStorage();
  }
}, 5000);

// ========== SIMULATE ORDER STATUS UPDATES ==========
function startOrderStatusSimulation() {
  setInterval(() => {
    let updated = false;
    orders = orders.map(order => {
      if (order.status === "order_received") {
        order.status = "preparing";
        updated = true;
      } else if (order.status === "preparing") {
        order.status = "delivering";
        updated = true;
      } else if (order.status === "delivering") {
        order.status = "delivered";
        updated = true;
      }
      return order;
    });
    if (updated) {
      saveToLocalStorage();
      if (currentPage === "orders") renderOrdersPage();
    }
  }, 30000);
}

// ========== SAVE ALL USERS FOR LEADERBOARD ==========
function saveUserToLeaderboard() {
  let allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
  const existingIndex = allUsers.findIndex(u => u.id === currentUser.id);
  if (existingIndex !== -1) {
    allUsers[existingIndex] = currentUser;
  } else {
    allUsers.push(currentUser);
  }
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

// Override saveToLocalStorage to include leaderboard
const originalSave = saveToLocalStorage;
saveToLocalStorage = function() {
  originalSave();
  if (currentUser) saveUserToLeaderboard();
}.bind(this);

// ========== FIX RENDER FUNCTIONS ==========
function renderCategoriesSlider() {
  const categories = ["Milliy taomlar", "Issiq taomlar", "Salatlar", "Shirinliklar", "Ichimliklar"];
  const container = document.getElementById("categoriesSlider");
  if (!container) return;
  
  container.innerHTML = categories.map(cat => `
    <div class="category-card ${currentCategory === cat ? "active" : ""}" data-category="${cat}">
      <i class="fas ${getCategoryIcon(cat)}"></i>
      <span>${cat}</span>
    </div>
  `).join("");
  
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      currentCategory = card.dataset.category;
      renderCategoriesSlider();
      renderFeaturedFoods();
    });
  });
}

function getCategoryIcon(category) {
  const icons = {
    "Milliy taomlar": "fa-utensils",
    "Issiq taomlar": "fa-fire",
    "Salatlar": "fa-leaf",
    "Shirinliklar": "fa-candy-cane",
    "Ichimliklar": "fa-mug-hot"
  };
  return icons[category] || "fa-apple-alt";
}

function renderPromoBanners() {
  const promos = [
    { title: "🔥 Cashback Week", desc: "Barcha taomlarga +5% cashback" },
    { title: "✨ 1+1 Aksiya", desc: "Ikkinchi pizza sovg'a!" },
    { title: "💎 Double Diamonds", desc: "Har 10,000 so'mga 2 olmos" },
    { title: "🚚 Free Delivery", desc: "50,000 so'mdan yuqori buyurtmada" }
  ];
  
  const container = document.getElementById("promoSlider");
  const dotsContainer = document.getElementById("promoDots");
  if (!container) return;
  
  container.innerHTML = promos.map((promo, index) => `
    <div class="promo-card" data-index="${index}">
      <h4>${promo.title}</h4>
      <p>${promo.desc}</p>
    </div>
  `).join("");
  
  if (dotsContainer) {
    dotsContainer.innerHTML = promos.map((_, i) => `
      <div class="promo-dot ${i === promoIndex ? "active" : ""}" data-dot="${i}"></div>
    `).join("");
    
    document.querySelectorAll(".promo-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        promoIndex = parseInt(e.target.dataset.dot);
        const slider = document.getElementById("promoSlider");
        if (slider && slider.children[promoIndex]) {
          slider.scrollLeft = slider.children[promoIndex].offsetLeft - 16;
        }
        updatePromoDots();
      });
    });
  }
}

function updatePromoDots() {
  document.querySelectorAll(".promo-dot").forEach((dot, i) => {
    if (i === promoIndex) dot.classList.add("active");
    else dot.classList.remove("active");
  });
}

function startPromoSlider() {
  if (promoInterval) clearInterval(promoInterval);
  promoInterval = setInterval(() => {
    promoIndex = (promoIndex + 1) % 4;
    const slider = document.getElementById("promoSlider");
    if (slider && slider.children[promoIndex]) {
      slider.scrollLeft = slider.children[promoIndex].offsetLeft - 16;
      updatePromoDots();
    }
  }, 4000);
}

// ========== FIX REWARDS PAGE ==========
function renderRewardsPage() {
  const levelElement = document.getElementById("userLevel");
  const cashbackElement = document.getElementById("totalCashback");
  const diamondsElement = document.getElementById("totalDiamonds");
  const ordersElement = document.getElementById("totalOrdersCount");
  const progressElement = document.getElementById("levelProgress");
  const levelIconElement = document.getElementById("levelIcon");
  
  if (levelElement) levelElement.innerText = currentUser.level;
  if (cashbackElement) cashbackElement.innerText = currentUser.cashback.toLocaleString();
  if (diamondsElement) diamondsElement.innerText = currentUser.diamonds;
  if (ordersElement) ordersElement.innerText = currentUser.totalOrders;
  
  if (progressElement) {
    const levelProgress = (currentUser.points / 4000) * 100;
    progressElement.style.width = `${Math.min(100, levelProgress)}%`;
  }
  
  if (levelIconElement) {
    const levelIcons = { Bronze: "🥉", Silver: "🥈", Gold: "🥇", Diamond: "💎" };
    levelIconElement.innerText = levelIcons[currentUser.level] || "🥉";
  }
  
  renderLeaderboard();
  renderRewardsShop();
}

function renderLeaderboard() {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
  const leaderboard = [...allUsers].sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0)).slice(0, 10);
  
  const container = document.getElementById("leaderboardList");
  if (!container) return;
  
  if (leaderboard.length === 0) {
    container.innerHTML = '<div class="empty-leaderboard">Hali hech qanday ma\'lumot yo\'q</div>';
    return;
  }
  
  container.innerHTML = leaderboard.map((user, idx) => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank">#${idx + 1}</div>
      <div class="leaderboard-info">
        <strong>${user.name || "Anonim"}</strong>
        <small>${(user.totalSpent || 0).toLocaleString()} so'm</small>
      </div>
      <div class="leaderboard-level">${user.level || "Bronze"}</div>
    </div>
  `).join("");
}

function renderRewardsShop() {
  const rewards = [
    { name: "50% Chegirma", nameRu: "50% Скидка", cost: 50, type: "discount", icon: "fa-tag" },
    { name: "Bepul Yetkazib Berish", nameRu: "Бесплатная Доставка", cost: 30, type: "delivery", icon: "fa-truck" },
    { name: "Sovg'a Taom", nameRu: "Подарок Еда", cost: 100, type: "free_food", icon: "fa-gift" },
    { name: "10,000 so'm Cashback", nameRu: "10,000 сум Кешбэк", cost: 80, type: "cashback", icon: "fa-money-bill" }
  ];
  
  const container = document.getElementById("rewardsGrid");
  if (!container) return;
  
  container.innerHTML = rewards.map(reward => `
    <div class="reward-shop-card">
      <i class="fas ${reward.icon}"></i>
      <h4>${currentLang === "uz" ? reward.name : reward.nameRu}</h4>
      <p>${reward.cost} 💎</p>
      <button onclick="buyReward('${reward.name}', ${reward.cost})" class="btn-premium">Sotib olish</button>
    </div>
  `).join("");
}

window.buyReward = function(name, cost) {
  if (currentUser.diamonds >= cost) {
    currentUser.diamonds -= cost;
    saveToLocalStorage();
    showToast(`${name} sotib olindi!`);
    renderRewardsPage();
    renderProfilePage();
  } else {
    showToast(currentLang === "uz" ? "Olmos yetarli emas!" : "Недостаточно алмазов!");
  }
};

// ========== FIX PROFILE PAGE ==========
function renderProfilePage() {
  const nameElement = document.getElementById("profileName");
  const phoneElement = document.getElementById("profilePhone");
  const cashbackElement = document.getElementById("profileCashback");
  const diamondsElement = document.getElementById("profileDiamonds");
  const darkCheckbox = document.getElementById("darkModeCheckbox");
  
  if (nameElement) nameElement.innerText = currentUser.name;
  if (phoneElement) phoneElement.innerText = currentUser.phone;
  if (cashbackElement) cashbackElement.innerText = currentUser.cashback.toLocaleString();
  if (diamondsElement) diamondsElement.innerText = currentUser.diamonds;
  if (darkCheckbox) darkCheckbox.checked = darkMode;
}

// ========== FIX ORDERS PAGE ==========
function renderOrdersPage() {
  const container = document.getElementById("ordersList");
  if (!container) return;
  
  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-orders"><i class="fas fa-box-open"></i><p>${currentLang === "uz" ? "Buyurtmalar yo'q" : "Нет заказов"}</p></div>`;
    return;
  }
  
  container.innerHTML = orders.map(order => `
    <div class="order-card" data-order-id="${order.id}">
      <div class="order-header">
        <span class="order-id">#${order.id}</span>
        <span class="order-status status-${getStatusNumber(order.status)}">${translations[currentLang][order.status] || order.status}</span>
      </div>
      <div class="order-details">
        <span>${order.date} ${order.time}</span>
        <span>${order.subtotal.toLocaleString()} so'm</span>
      </div>
      <div class="order-items-preview">
        ${order.items.slice(0, 2).map(item => currentLang === "uz" ? item.name : item.nameRu).join(", ")}${order.items.length > 2 ? ` +${order.items.length - 2}` : ""}
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll(".order-card").forEach(card => {
    card.addEventListener("click", () => {
      const orderId = parseInt(card.dataset.orderId);
      const order = orders.find(o => o.id === orderId);
      if (order) openOrderDetailModal(order);
    });
  });
}

function getStatusNumber(status) {
  const map = { order_received: 1, preparing: 2, delivering: 3, delivered: 4 };
  return map[status] || 1;
}

function openOrderDetailModal(order) {
  const modal = document.getElementById("orderDetailModal");
  const content = document.getElementById("orderDetailContent");
  
  if (!modal || !content) return;
  
  content.innerHTML = `
    <h3>${currentLang === "uz" ? "Buyurtma" : "Заказ"} #${order.id}</h3>
    <div class="order-detail-info">
      <p><strong>${currentLang === "uz" ? "Sana:" : "Дата:"}</strong> ${order.date} ${order.time}</p>
      <p><strong>${currentLang === "uz" ? "Holat:" : "Статус:"}</strong> ${translations[currentLang][order.status] || order.status}</p>
    </div>
    <div class="order-detail-items">
      <strong>${currentLang === "uz" ? "Mahsulotlar:" : "Товары:"}</strong>
      ${order.items.map(item => `
        <div class="order-item">
          <span>${currentLang === "uz" ? item.name : item.nameRu} x${item.quantity}</span>
          <span>${(item.price * item.quantity).toLocaleString()} so'm</span>
        </div>
      `).join("")}
    </div>
    <div class="order-detail-total">
      <div>${currentLang === "uz" ? "Jami:" : "Итого:"} ${order.subtotal.toLocaleString()} so'm</div>
      <div>${currentLang === "uz" ? "Cashback:" : "Кешбэк:"} +${order.cashbackEarned}</div>
      <div>${currentLang === "uz" ? "Olmos:" : "Алмазы:"} +${order.diamondsEarned}</div>
    </div>
  `;
  
  modal.classList.add("open");
}

// ========== EVENT LISTENERS SETUP ==========
function setupEventListeners() {
  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay, .modal-close").forEach(el => {
    if (el) {
      el.addEventListener("click", () => {
        document.getElementById("foodDetailModal")?.classList.remove("open");
        document.getElementById("orderDetailModal")?.classList.remove("open");
      });
    }
  });
  
  // Back to profile from orders
  const backBtn = document.getElementById("backToProfileBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      currentPage = "profile";
      renderCurrentPage();
    });
  }
  
  // Back to profile from admin
  const backFromAdmin = document.getElementById("backToProfileFromAdmin");
  if (backFromAdmin) {
    backFromAdmin.addEventListener("click", () => {
      currentPage = "profile";
      renderCurrentPage();
    });
  }
  
  // Admin panel visibility (double tap profile avatar for admin)
  let profileTapCount = 0;
  const profileAvatar = document.getElementById("profileAvatar");
  if (profileAvatar) {
    profileAvatar.addEventListener("click", () => {
      profileTapCount++;
      setTimeout(() => {
        if (profileTapCount >= 5) {
          const adminBtn = document.getElementById("adminPanelBtn");
          if (adminBtn) adminBtn.style.display = "flex";
          showToast("Admin panel ochildi!");
          profileTapCount = 0;
        }
        profileTapCount = 0;
      }, 1000);
    });
  }
  
  // My orders button
  const myOrdersBtn = document.getElementById("myOrdersBtn");
  if (myOrdersBtn) {
    myOrdersBtn.addEventListener("click", () => {
      currentPage = "orders";
      renderCurrentPage();
    });
  }
  
  // Dark mode toggle
  const darkToggle = document.getElementById("darkModeCheckbox");
  if (darkToggle) {
    darkToggle.addEventListener("change", (e) => {
      darkMode = e.target.checked;
      if (darkMode) enableDarkMode();
      else disableDarkMode();
      saveToLocalStorage();
    });
  }
  
  // Language buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      saveToLocalStorage();
      updateAllTexts();
      renderCurrentPage();
    });
  });
  
  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm(currentLang === "uz" ? "Chiqishni xohlaysizmi?" : "Вы хотите выйти?")) {
        localStorage.clear();
        location.reload();
      }
    });
  }
  
  // Edit profile
  const editBtn = document.getElementById("editProfileBtn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const newName = prompt(currentLang === "uz" ? "Yangi ism kiriting:" : "Введите новое имя:", currentUser.name);
      if (newName && newName.trim()) {
        currentUser.name = newName.trim();
        saveToLocalStorage();
        renderProfilePage();
        renderHomePage();
      }
    });
  }
}

// ========== START ORDER SIMULATION ==========
startOrderStatusSimulation();

// ========== EXPANDED UPDATE ALL TEXTS ==========
const originalUpdateTexts = updateAllTexts;
updateAllTexts = function() {
  originalUpdateTexts();
  
  // Update placeholders
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.placeholder = currentLang === "uz" ? "Qidirish..." : "Поиск...";
  }
  
  // Update location text if needed
  const locationText = document.getElementById("locationText");
  if (locationText && locationText.innerText === "Toshkent sh.") {
    // keep as is
  }
}.bind(this);

// ========== FINAL INIT CALL ==========
// Make sure all functions are properly bound
window.addToCart = addToCart;
window.openFoodModal = openFoodModal;
window.editFood = editFood;
window.deleteFood = deleteFood;

console.log("Nima yeymiz? App successfully loaded!");
