// ---------- DATA & STORAGE ----------
let currentUser = null;
let foods = [];
let cart = [];
let orders = [];
let activeCategory = "Burger";
let currentLang = "uz";
let darkMode = false;
let currentPage = "home";

const translations = {
  uz: { greeting: "Salom", cashback: "Cashback", diamonds: "Olmos", search: "Qidirish..." },
  ru: { greeting: "Привет", cashback: "Кешбэк", diamonds: "Алмазы", search: "Поиск..." }
};

// sample foods
const defaultFoods = [
  { id: "f1", name: "Premium Burger", price: 42000, cashback: 2000, diamonds: 5, category: "Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", desc: "Mol go'shti, salat, sous", ingredients: "Go'sht, salat, pomidor" },
  { id: "f2", name: "Lavash", price: 28000, cashback: 1400, diamonds: 3, category: "Lavash", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400", desc: "Tandir lavash" },
  { id: "f3", name: "Margherita Pizza", price: 59000, cashback: 3000, diamonds: 7, category: "Pizza", img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400" },
  { id: "f4", name: "Osh", price: 35000, cashback: 1700, diamonds: 4, category: "Milliy taom", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" }
];

function initData() {
  if (!localStorage.getItem("foods")) localStorage.setItem("foods", JSON.stringify(defaultFoods));
  foods = JSON.parse(localStorage.getItem("foods"));
  if (!localStorage.getItem("orders")) localStorage.setItem("orders", JSON.stringify([]));
  orders = JSON.parse(localStorage.getItem("orders"));
  if (localStorage.getItem("user")) currentUser = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem("cart")) cart = JSON.parse(localStorage.getItem("cart"));
  else cart = [];
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme === "true") enableDarkMode();
}

function saveUser(name, phone) {
  currentUser = { name, phone, cashback: 12000, diamonds: 45, level: "Bronze", points: 0 };
  localStorage.setItem("user", JSON.stringify(currentUser));
}
function updateUser(upd) { currentUser = { ...currentUser, ...upd }; localStorage.setItem("user", JSON.stringify(currentUser)); renderHome(); }
function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); updateCartUI(); }
function addToCart(food, qty=1) {
  let existing = cart.find(i=>i.id===food.id);
  if(existing) existing.qty += qty;
  else cart.push({...food, qty});
  saveCart();
  showCartSheet();
}

// splash + auth
setTimeout(() => {
  document.getElementById("splash").classList.add("hide");
  setTimeout(() => {
    if(!currentUser) document.getElementById("authScreen").style.display = "flex";
    else { document.getElementById("authScreen").style.display = "none"; document.getElementById("appContainer").style.display = "block"; renderCurrentPage(); }
  }, 200);
}, 3000);

document.getElementById("authContinueBtn").addEventListener("click", ()=>{
  let name = document.getElementById("fullName").value.trim();
  let phone = document.getElementById("phoneNumber").value.trim();
  if(!name || !phone) return alert("Ism va telefon kiriting");
  saveUser(name, phone);
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("appContainer").style.display = "block";
  renderCurrentPage();
});

// RENDER HOME
function renderHome() {
  const container = document.getElementById("pageHome");
  if(!currentUser) return;
  container.innerHTML = `
    <div class="greeting"><h2>${translations[currentLang].greeting}, ${currentUser.name.split(" ")[0]}!</h2><i class="fas fa-map-marker-alt"></i></div>
    <div class="search-bar"><i class="fas fa-search"></i><input placeholder="${translations[currentLang].search}" id="searchInput"></div>
    <div class="category-scroll" id="categoryList"></div>
    <div class="banner-slider" id="bannerSlider"><div class="banner-card">🔥 Cashback week +5%</div><div class="banner-card">✨ 1+1 акция</div><div class="banner-card">💎 Double diamonds</div></div>
    <div id="foodGridHome" class="food-grid"></div>
  `;
  renderCategories();
  renderFoodsByCategory(activeCategory);
  document.getElementById("searchInput").addEventListener("input", (e)=> filterFoods(e.target.value));
}

function renderCategories() {
  const cats = ["Burger","Lavash","Pizza","Milliy taom","Ichimlik","Salat"];
  const container = document.getElementById("categoryList");
  container.innerHTML = cats.map(c=>`<div class="category-card ${activeCategory===c?'active':''}" data-cat="${c}">${c}</div>`).join("");
  document.querySelectorAll(".category-card").forEach(el=>{
    el.addEventListener("click",()=>{
      activeCategory = el.dataset.cat;
      renderCategories();
      renderFoodsByCategory(activeCategory);
    });
  });
}
function renderFoodsByCategory(cat) {
  const filtered = foods.filter(f=>f.category===cat);
  const grid = document.getElementById("foodGridHome");
  if(!grid) return;
  grid.innerHTML = filtered.map(f=>`
    <div class="food-card" data-id="${f.id}">
      <img src="${f.img}" loading="lazy">
      <div class="food-info"><strong>${f.name}</strong><div class="price">${f.price} so'm</div><div>💰 ${f.cashback} | 💎 ${f.diamonds}</div><span class="fab-add" data-id="${f.id}">+</span></div>
    </div>
  `).join("");
  document.querySelectorAll(".fab-add").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      e.stopPropagation();
      let fid = btn.dataset.id;
      let food = foods.find(f=>f.id===fid);
      if(food) addToCart(food,1);
    });
  });
  document.querySelectorAll(".food-card").forEach(card=>{
    card.addEventListener("click",()=>{
      let fid = card.querySelector(".fab-add").dataset.id;
      openFoodModal(fid);
    });
  });
}
function filterFoods(val){
  const filtered = foods.filter(f=>f.name.toLowerCase().includes(val.toLowerCase()));
  const grid = document.getElementById("foodGridHome");
  if(grid) grid.innerHTML = filtered.map(f=>`<div class="food-card">...`).join("");
}

function openFoodModal(id){
  let food = foods.find(f=>f.id===id);
  document.getElementById("modalTitle").innerText = food.name;
  document.getElementById("modalImg").src = food.img;
  document.getElementById("modalDesc").innerText = food.desc||"Mazali taom";
  document.getElementById("modalIngredients").innerText = food.ingredients||"Premium ingredientlar";
  document.getElementById("modalPrice").innerHTML = `${food.price} so'm`;
  document.getElementById("modalQty").innerText = "1";
  document.getElementById("foodModal").classList.add("open");
  let qty=1;
  document.getElementById("incQty").onclick = ()=>{qty++; document.getElementById("modalQty").innerText=qty;};
  document.getElementById("decQty").onclick = ()=>{if(qty>1){qty--; document.getElementById("modalQty").innerText=qty;}};
  document.getElementById("addToCartModalBtn").onclick = ()=>{addToCart(food,qty); document.getElementById("foodModal").classList.remove("open");};
}
document.querySelector(".close-modal").addEventListener("click",()=>document.getElementById("foodModal").classList.remove("open"));

// CART
function showCartSheet(){ document.getElementById("cartSheet").classList.add("open"); updateCartUI();}
document.querySelector(".close-cart").addEventListener("click",()=>document.getElementById("cartSheet").classList.remove("open"));
function updateCartUI(){
  let total=0, cash=0, diam=0;
  cart.forEach(i=>{ total+=i.price*i.qty; cash+=i.cashback*i.qty; diam+=i.diamonds*i.qty; });
  document.getElementById("cartTotal").innerText=total;
  document.getElementById("cartCashback").innerText=cash;
  document.getElementById("cartDiamonds").innerText=diam;
  const container = document.getElementById("cartItemsList");
  if(container) container.innerHTML = cart.map(i=>`<div>${i.name} x${i.qty} = ${i.price*i.qty} so'm <button class="remove-item" data-id="${i.id}">🗑️</button></div>`).join("");
  document.querySelectorAll(".remove-item").forEach(btn=>{
    btn.addEventListener("click",()=>{
      cart = cart.filter(i=>i.id!==btn.dataset.id);
      saveCart();
      updateCartUI();
    });
  });
}
document.getElementById("checkoutBtn").addEventListener("click",()=>{
  if(cart.length===0) return alert("Savat bo'sh");
  let totalPrice = cart.reduce((s,i)=>s+i.price*i.qty,0);
  let cashEarn = cart.reduce((s,i)=>s+i.cashback*i.qty,0);
  let diamEarn = cart.reduce((s,i)=>s+i.diamonds*i.qty,0);
  let orderId = Math.floor(1000+Math.random()*9000);
  let newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    items: cart.map(i=>({name:i.name,qty:i.price})),
    total: totalPrice,
    cashback: cashEarn,
    diamonds: diamEarn,
    status: "Buyurtma olingan"
  };
  orders.unshift(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  if(currentUser){
    currentUser.cashback = (currentUser.cashback||0)+cashEarn;
    currentUser.diamonds = (currentUser.diamonds||0)+diamEarn;
    localStorage.setItem("user", JSON.stringify(currentUser));
  }
  cart=[];
  saveCart();
  document.getElementById("cartSheet").classList.remove("open");
  alert(`Buyurtma qabul qilindi! ID: ${orderId}`);
  renderCurrentPage();
});

// Roulette
function renderRoulette(){
  const page= document.getElementById("pageRoulette");
  const foodsRoulette = ["Manti","Osh","Tovuq oyoqlari","Somsa","Bishteks","Salat","Ichimlik"];
  page.innerHTML = `<div class="roulette-container"><div class="wheel" id="wheel"></div><button id="spinWheelBtn" class="spin-btn">SPIN</button><div class="pointer"></div></div><div id="rouletteResult"></div>`;
  const wheel = document.getElementById("wheel");
  let segments = foodsRoulette;
  let currentDeg=0;
  function buildWheel(){
    let angleStep=360/segments.length;
    wheel.innerHTML = segments.map((s,i)=>`<div style="position:absolute; width:100%; height:100%; transform:rotate(${i*angleStep}deg); background:conic-gradient(from ${i*angleStep}deg, #10b981, #047857); clip-path: polygon(50% 50%, 100% 0, 100% 100%);"><span style="position:absolute; top:20px; left:50%;">${s}</span></div>`).join("");
  }
  buildWheel();
  let spinning=false;
  document.getElementById("spinWheelBtn").addEventListener("click",()=>{
    if(spinning) return;
    spinning=true;
    let randomSpin = 360*5 + Math.random()*360;
    let targetDeg = currentDeg+randomSpin;
    wheel.style.transition="transform 3s cubic-bezier(0.2,0.8,0.3,1)";
    wheel.style.transform=`rotate(${targetDeg}deg)`;
    setTimeout(()=>{
      let finalDeg = targetDeg%360;
      let index = Math.floor(((360-finalDeg)+45)%360 / (360/segments.length))%segments.length;
      let result = segments[index];
      document.getElementById("rouletteResult").innerHTML=`<div class="premium-card">Sizga: ${result} ! <button id="addRouletteToCart">Savatga qo'shish</button></div>`;
      spinning=false;
      document.getElementById("addRouletteToCart")?.addEventListener("click",()=>{
        let fake = {id:"roulette"+Date.now(), name:result, price:25000, cashback:1000, diamonds:2, img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"};
        addToCart(fake,1);
      });
    },3000);
  });
}

// Rewards
function renderRewards(){
  document.getElementById("pageRewards").innerHTML = `<div class="reward-card">💎 Olmoslar: ${currentUser?.diamonds||0}<br>💰 Cashback: ${currentUser?.cashback||0}<br>🏆 Level: ${currentUser?.level||"Bronze"}</div><div>Leaderboard: Siz 1-o'rinda</div>`;
}

// Profile with dark mode, lang
function renderProfile(){
  const container = document.getElementById("pageProfile");
  container.innerHTML = `
    <h3>${currentUser?.name}</h3>
    <button id="darkModeToggle">🌓 Dark mode</button>
    <button id="langToggle">🇺🇿 O'zbek / 🇷🇺 Русский</button>
    <button id="logoutBtn">🚪 Chiqish</button>
    <div class="support-card"><i class="fab fa-telegram"></i> @NimaYeymiz_sup <a href="https://t.me/NimaYeymiz_sup" target="_blank">Yordam</a></div>
    <button id="myOrdersBtn">📦 Mening buyurtmalarim</button>
  `;
  document.getElementById("darkModeToggle")?.addEventListener("click",()=>{darkMode=!darkMode; if(darkMode)enableDarkMode(); else disableDarkMode();});
  document.getElementById("langToggle")?.addEventListener("click",()=>{currentLang=currentLang==="uz"?"ru":"uz"; renderCurrentPage();});
  document.getElementById("logoutBtn")?.addEventListener("click",()=>{localStorage.clear(); location.reload();});
  document.getElementById("myOrdersBtn")?.addEventListener("click",()=>renderOrdersPage());
}
function enableDarkMode(){
  document.body.classList.add("dark");
  localStorage.setItem("darkMode","true");
}
function disableDarkMode(){
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode","false");
}
function renderOrdersPage(){
  const ordersContainer = document.getElementById("pageOrders");
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
  document.getElementById("pageOrders").style.display="block";
  document.getElementById("pageOrders").classList.add("active-page");
  orders = JSON.parse(localStorage.getItem("orders"))||[];
  ordersContainer.innerHTML = orders.map(o=>`<div class="order-card" data-id="${o.id}">Buyurtma #${o.id} - ${o.status} - ${o.total} so'm - ${o.date} <i class="fas fa-chevron-right"></i></div>`).join("");
  document.querySelectorAll(".order-card").forEach(card=>{
    card.addEventListener("click",()=>{
      let ord = orders.find(o=>o.id==card.dataset.id);
      document.getElementById("orderDetailContent").innerHTML = `<div>Mahsulotlar: ${ord.items.map(i=>i.name).join(", ")}<br>Jami: ${ord.total}<br>Cashback: ${ord.cashback}<br>Olmos: ${ord.diamonds}<br>Holat: ${ord.status}</div>`;
      document.getElementById("orderDetailModal").classList.add("open");
    });
  });
}
document.querySelector(".close-order-modal").addEventListener("click",()=>document.getElementById("orderDetailModal").classList.remove("open"));

function renderCurrentPage(){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
  document.getElementById(`page${currentPage.charAt(0).toUpperCase()+currentPage.slice(1)}`).classList.add("active-page");
  if(currentPage==="home") renderHome();
  if(currentPage==="menu") renderMenuPage();
  if(currentPage==="roulette") renderRoulette();
  if(currentPage==="rewards") renderRewards();
  if(currentPage==="cart") showCartSheet();
  if(currentPage==="profile") renderProfile();
  if(currentPage==="orders") renderOrdersPage();
}
function renderMenuPage(){
  const container = document.getElementById("pageMenu");
  container.innerHTML = `<div class="food-grid" id="menuGrid"></div>`;
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = foods.map(f=>`<div class="food-card">...</div>`).join("");
}
// bottom nav listeners
document.querySelectorAll(".nav-item").forEach(nav=>{
  nav.addEventListener("click",()=>{
    let tab = nav.dataset.tab;
    currentPage = tab;
    document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));
    nav.classList.add("active");
    renderCurrentPage();
  });
});
initData();
if(currentUser) document.getElementById("appContainer").style.display="block"; 
