document.addEventListener('DOMContentLoaded', function () {
  // FLASH DEAL CLOCK
  function updateClockAndFlashDeal() {
    const clock = document.getElementById("clock");
    const flashStatus = document.getElementById("flash-status");
    const flashList = document.getElementById("flash-restaurants");

    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString();

      const hours = now.getHours();

      if (hours === 14) {
        flashStatus.textContent = "🔥 Flash Deal ON! Enjoy these delicious offers:";
        flashList.classList.remove("hidden");
      } else if (hours < 14) {
        flashStatus.textContent = "⏳ Flash Deal starts at 2PM!";
        flashList.classList.add("hidden");
      } else {
        flashStatus.textContent = "❌ Flash Deal ended. Come back tomorrow!";
        flashList.classList.add("hidden");
      }
    }
  }

  setInterval(updateClockAndFlashDeal, 1000);
  updateClockAndFlashDeal();

  // SCROLL TO TOP
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // SCROLL ANIMATION
  ['.animate-left', '.animate-right'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
      }, { threshold: 0.3 }).observe(el);
    }
  });

  // CONFETTI ON CONTACT BUTTON
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('mouseenter', () => {
      if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    });
  }

  // SWIPER
  const swiperEl = document.querySelector(".mySwiper");
  if (swiperEl && typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      pagination: { el: ".swiper-pagination", clickable: true }
    });
  }

  // FAQ ACCORDION
  document.querySelectorAll('.question').forEach(btn => {
    btn.addEventListener('click', () => {
      const ans = btn.nextElementSibling;
      ans.classList.toggle('open');
      btn.classList.toggle('active');
    });
  });

  // CONTACT FORM

  window.addEventListener("pageshow", function (event) {
  if (event.persisted || (window.performance && performance.navigation.type === 2)) {
    const form = document.getElementById("contact-form");
    if (form) {
      form.reset();
      }
    }
  });

  // EMAIL
  const emailBtn = document.getElementById('email-btn');
  if (emailBtn) emailBtn.onclick = () => window.location.href = 'mailto:dealoriacorp@gmail.com';


  // VOUCHERS
  const voucherButtons = document.querySelectorAll('.apply-voucher');
  voucherButtons.forEach(button => {
    button.addEventListener('click', function () {
      const code = this.dataset.voucherCode;
      localStorage.setItem("appliedVoucher", code);
      alert(` Use code : ${code} In store to apply voucher!`);
    });
  });

  const removeVoucherBtn = document.getElementById("removeVoucherBtn");
  if (removeVoucherBtn) {
    removeVoucherBtn.addEventListener("click", () => {
      localStorage.removeItem("appliedVoucher");
      renderCart();
    });
  }

  // deals overlay
  const modal = document.getElementById("promoModal");
  const promoCode = document.getElementById("promoCode");
  const brandTitle = document.getElementById("brandTitle");
  const expiryInfo = document.getElementById("expiryInfo");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll('.deal-card, .deal-card1').forEach(card => {
    card.addEventListener('click', function () {
      const code = this.dataset.code;
      const brand = this.dataset.brand;
      const expiry = this.dataset.expiry;

      brandTitle.textContent = `${brand} Promo Code`;
      promoCode.textContent = code;
      expiryInfo.textContent = `Valid until: ${expiry}`;
      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add("hidden");
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  document.getElementById("copyCodeBtn").addEventListener("click", function () {
    navigator.clipboard.writeText(promoCode.textContent);
    this.textContent = "Copied!";
    setTimeout(() => (this.textContent = "Copy"), 2000);
    });


  // SEARCH FUNCTIONALITY
  const data = [
    {
      title: 'Pizza Hut - 15% Off',
      description: 'Get a free pizza with any foods order over RM50.',
      image: 'images/food/ph.png',
      link: 'food.html',
      code: 'PIZZA15',
      brand: 'Pizza Hut',
      expiry: '31 Jul 2025'
    },
    {
      id: 'burgerking',
      title: 'Burger King - 20% Off',
      description: 'SUMMERRRR SHINES so enjoy free drinks & foods with any burger meal.',
      image: 'images/food/BKlogo.png',
      link: 'foods.html',
      code: 'BURGERKING20',
      brand: 'Burger King',
      expiry: '31 Jul 2025'
    },
    {
      id: 'KING10',
      title: 'Burger King - 10% Off Meal',
      description: 'from foods category',
      image: 'images/food/burgerking.png',
      link: 'foods.html',
      code: 'KING10',
      brand: 'Burger King',
      expiry: '01 Dec 2025'
    },
    {
      id: 'SUMMERDEAL25',
      title: 'Sushi King - Classic Deal',
      description: 'from foods category',
      image: 'images/food/sushi.png',
      link: 'foods.html',
      code: 'SUMMERDEAL25',
      brand: 'Sushi King',
      expiry: '24 Jul 2025'
    },
    {
      id: 'TEALOVE',
      title: 'Tealive - Buy 1 Free 1',
      description: 'from foods category',
      image: 'images/food/tealive.png',
      link: 'foods.html',
      code: 'TEALOVE',
      brand: 'Tealive',
      expiry: '15 Aug 2025'
    },
    {
      id: 'FRIESFREE',
      title: "McDonald's - Free Fries with Meal",
      description: 'from foods category',
      image: 'images/food/mcdonalds.png',
      link: 'foods.html',
      code: 'FRIESFREE',
      brand: "McDonald's",
      expiry: '30 Sep 2025'
    },
    {
      id: 'KFC20',
      title: 'KFC - 20% Off Bucket Meal',
      description: 'from foods category',
      image: 'images/food/kfc.png',
      link: 'foods.html',
      code: 'KFC20',
      brand: 'KFC',
      expiry: '31 Dec 2025'
    },
    {
      id: 'STARFREE',
      title: 'Starbucks - Free Drink with Purchase',
      description: 'from foods category',
      image: 'images/food/starbucks.png',
      link: 'foods.html',
      code: 'STARFREE',
      brand: 'Starbucks',
      expiry: '31 Dec 2025'
    },
    {
      id: 'TEXASFREE',
      title: 'Texas Chicken - Free Drink with Meal',
      description: 'from foods category',
      image: 'images/food/texas.png',
      link: 'foods.html',
      code: 'TEXASFREE',
      brand: 'Texas Chicken',
      expiry: '31 Dec 2025'
    },
    {
      id: 'WBOSS',
      title: "Domino's pizza - Bossku Combo",
      description: 'from foods category',
      image: 'images/food/dominos.png',
      link: 'foods.html',
      code: 'WBOSS',
      brand: "Domino's pizza",
      expiry: '30 June 2025'
    },
    {
      id: 'BALI25',
      title: 'Agoda - Bali Getaway 25% Off',
      description: 'Enjoy travels tropical stays with up to 25% savings at selected resorts in Bali.',
      image: 'images/vacation/bali.jpeg',
      link: 'vacations.html#BALI25',
      code: 'BALI25',
      brand: 'Agoda - Bali Resorts',
      expiry: '31 Jul 2025'
    },
    {
      id: 'CAMERON15',
      title: 'Booking.com - 15% Off Highlands Hotels',
      description: 'Perfect weather, better prices. Save travels on your next Cameron retreat.',
      image: 'images/vacation/cameron.jpeg',
      link: 'vacations.html#CAMERON15',
      code: 'CAMERON15',
      brand: 'Booking.com - Cameron Highlands',
      expiry: '31 Jul 2025'
    },
    {
      id: 'LANGKAWI20',
      title: 'Trivago.com - 20% Off Resorts',
      description: 'Experience paradise with exclusive travels discounts on Langkawi stays.',
      image: 'images/vacation/langkawi.png',
      link: 'vacations.html#LANGKAWI20',
      code: 'LANGKAWI20',
      brand: 'Langkawi Resorts',
      expiry: '18 Jul 2025'
    },
    {
      id: 'THAI50',
      title: 'Trip.com - Thailand RM50 Off',
      description: 'Enjoy the weather and exciting attractions with RM50 off your travels.',
      image: 'images/vacation/thailand.jpeg',
      link: 'vacations.html#THAI50',
      code: 'THAI50',
      brand: 'Thailand Trip',
      expiry: '31 Jul 2025'
    },
    {
      id: 'SUNSETFREE',
      title: 'Langkawi Island - Free Sunset Cruise',
      description: 'from travels category',
      image: 'images/vacation/langkawibeach.png',
      link: 'vacations.html#SUNSETFREE',
      code: 'SUNSETFREE',
      brand: 'Langkawi Cruise Co.',
      expiry: '30 Nov 2025'
    },
    {
      id: 'GENTING50',
      title: 'Genting Highlands - RM50 Off Resort Stay',
      description: 'from travels category',
      image: 'images/vacation/genting.jpg',
      link: 'vacations.html#GENTING50',
      code: 'GENTING50',
      brand: 'Resorts World',
      expiry: '31 Oct 2025'
    },
    {
      id: 'PENANG3FOR2',
      title: 'Penang Beachside - Stay 3 Nights, Pay 2',
      description: 'from travels category',
      image: 'images/vacation/penangbeach.jpg',
      link: 'vacations.html#PENANG3FOR2',
      code: 'PENANG3FOR2',
      brand: 'Penang Paradise Hotel',
      expiry: '31 Dec 2025'
    },
    {
      id: 'DIVEDEAL10',
      title: 'Sabah Island - 10% Off Diving Packages',
      description: 'from travels category',
      image: 'images/vacation/sabahdiving.jpg',
      link: 'vacations.html#DIVEDEAL10',
      code: 'DIVEDEAL10',
      brand: 'Sabah Marine Tours',
      expiry: '15 Jan 2026'
    },
    {
      id: 'CAMERONBFREE',
      title: 'Cameron Highlands - Complimentary Breakfast',
      description: 'from travels category',
      image: 'images/vacation/cameronhighlands.jpg',
      link: 'vacations.html#CAMERONBFREE',
      code: 'CAMERONBFREE',
      brand: 'Cameron Garden Stay',
      expiry: '28 Feb 2026'
    },
    {
      id: 'SHP15',
      title: 'Shopee - RM15 Off',
      description: 'Use this code to save RM15 on electronics products purchases over RM100.',
      image: 'images/products/shopee.png',
      link: 'products.html#SHP15',
      code: 'SHP15',
      brand: 'Shopee Malaysia',
      expiry: '31 Jul 2025'
    },
    {
      id: 'LAZADA10',
      title: 'Lazada - 10% Off',
      description: 'Extra 10% off your cart during the Mega products Sale!',
      image: 'images/products/lazada.png',
      link: 'products.html#LAZADA10',
      code: 'LAZADA10',
      brand: 'Lazada',
      expiry: '31 Jul 2025'
    },
    {
      id: 'TNGGIFT',
      title: "Touch 'n Go - RM5 Cashback",
      description: 'Spend RM20 on selected products stores and receive RM5 eWallet credit.',
      image: 'images/products/tng.png',
      link: 'products.html#TNGGIFT',
      code: 'TNGGIFT',
      brand: "Touch 'n Go eWallet",
      expiry: '30 Jul 2025'
    },
    {
      id: 'GUARD10',
      title: 'Guardian - RM10 Off Self-Care Items',
      description: 'from products category',
      image: 'images/products/guardian.png',
      link: 'products.html#GUARD10',
      code: 'GUARD10',
      brand: 'Guardian',
      expiry: '31 Aug 2025'
    },
    {
      id: 'UNIQWELCOME',
      title: 'Uniqlo - 10% Off First Order',
      description: 'from products category',
      image: 'images/products/uniqlo.png',
      link: 'products.html#UNIQWELCOME',
      code: 'UNIQWELCOME',
      brand: 'Uniqlo Malaysia',
      expiry: '30 Sep 2025'
    },
    {
      id: 'AEONFREE10',
      title: 'AEON - Free RM10 Voucher',
      description: 'from products category',
      image: 'images/products/aeon.jpeg',
      link: 'products.html#AEONFREE10',
      code: 'AEONFREE10',
      brand: 'AEON',
      expiry: '31 Dec 2025'
    },
    {
      id: 'DAISOBONUS',
      title: 'Daiso - Buy 3 Free 1',
      description: 'from products category',
      image: 'images/products/daiso.jpg',
      link: 'products.html#DAISOBONUS',
      code: 'DAISOBONUS',
      brand: 'Daiso Malaysia',
      expiry: '28 Feb 2026'
    },
    {
      id: 'IKEAFREE',
      title: 'IKEA - Free Delivery Over RM200',
      description: 'from products category',
      image: 'images/products/ikea.jpg',
      link: 'products.html#IKEAFREE',
      code: 'IKEAFREE',
      brand: 'IKEA Malaysia',
      expiry: '31 Oct 2025'
    },
    {
      id: 'TESCO5OFF',
      title: 'Tesco - RM5 Off Groceries',
      description: 'from products category',
      image: 'images/products/tesco.png',
      link: 'products.html#TESCO5OFF',
      code: 'TESCO5OFF',
      brand: 'Tesco Malaysia',
      expiry: '31 Dec 2025'
    },
    {
      id: 'ZALORA15',
      title: 'Zalora - 15% Off Fashion Items',
      description: 'from products category',
      image: 'images/products/zalora.png',
      link: 'products.html#ZALORA15',
      code: 'ZALORA15',
      brand: 'Zalora Malaysia',
      expiry: '31 Jan 2026'
    },
    {
      id: 'NIKEFREE',
      title: 'Nike - Free Shipping',
      description: 'from products category',
      image: 'images/products/nike.png',
      link: 'products.html#NIKEFREE',
      code: 'NIKEFREE',
      brand: 'Nike Malaysia',
      expiry: '31 Dec 2025'
    },
    {
      id: 'GRABCLEAN',
      title: 'Grab - RM10 Off Cleaning Service',
      description: 'Enjoy RM10 off your next professional home cleaning services.',
      image: 'images/services/grab.png',
      link: 'services.html#GRABCLEAN',
      code: 'GRABCLEAN',
      brand: 'Grab Cleaning Service',
      expiry: '31 Jul 2025'
    },
    {
      id: 'BEEP50',
      title: 'Beep - RM50 Off Business Delivery',
      description: 'Get RM50 off when you onboard your business with Beep services.',
      image: 'images/services/beeplogo.png',
      link: 'services.html#BEEP50',
      code: 'BEEP50',
      brand: 'Beep Delivery',
      expiry: '31 Jul 2025'
    },
    {
      id: 'MAYBANKBILL',
      title: 'Maybank - RM5 Cashback',
      description: 'Use eBill Pay to earn RM5 back on your utility bill services.',
      image: 'images/services/maybank.jpg',
      link: 'services.html#MAYBANKBILL',
      code: 'MAYBANKBILL',
      brand: 'Maybank E-Bill Pay',
      expiry: '31 Jul 2025'
    },
    {
      id: 'BOOSTCAR',
      title: 'Boost - 15% Off Car Insurance',
      description: 'Use this code to claim a discount for your next car renewal services.',
      image: 'images/services/boost.jpeg',
      link: 'services.html#BOOSTCAR',
      code: 'BOOSTCAR',
      brand: 'Boost Insurance',
      expiry: '18 Jul 2025'
    },
    {
      id: 'POSRM5',
      title: 'Pos Laju - Flat RM5 Shipping',
      description: 'from services category',
      image: 'images/services/poslaju.png',
      link: 'services.html#POSRM5',
      code: 'POSRM5',
      brand: 'Pos Laju',
      expiry: '30 Sep 2025'
    },
    {
      id: 'LALAGO',
      title: 'Lalamove - RM8 Off Express Delivery',
      description: 'from services category',
      image: 'images/services/lalamove.png',
      link: 'services.html#LALAGO',
      code: 'LALAGO',
      brand: 'Lalamove',
      expiry: '31 Oct 2025'
    },
    {
      id: 'TNGFREE',
      title: "Touch 'n Go RFID - Free RFID Tag",
      description: 'from services category',
      image: 'images/services/tng.jpeg',
      link: 'services.html#TNGFREE',
      code: 'TNGFREE',
      brand: 'TNG Digital',
      expiry: '31 Dec 2025'
    },
    {
      id: 'BOOST88',
      title: 'Boost Wallet - Top-Up & Win RM88',
      description: 'from services category',
      image: 'images/services/boosttopup.png',
      link: 'services.html#BOOST88',
      code: 'BOOST88',
      brand: 'Boost App',
      expiry: '15 Jan 2026'
    },
    {
      id: 'FLYWIFI',
      title: 'AirAsia WiFi - Free 30 Min Internet',
      description: 'from services category',
      image: 'images/services/airasia.png',
      link: 'services.html#FLYWIFI',
      code: 'FLYWIFI',
      brand: 'AirAsia',
      expiry: '28 Feb 2026'
    }
  ];  

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name)?.toLowerCase() || '';
  }

  function createCard(item) {
    return `
      <div class="product-card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        ${item.code ? `
          <div class="deal-card1" 
               data-code="${item.code}" 
               data-brand="${item.brand}" 
               data-expiry="${item.expiry}">
            <div class="main-cta"><p>Click for Code</p></div>
          </div>
        ` : ''}
      </div>
    `;
  }

  const query = getQueryParam('query');
  const resultsContainer = document.getElementById('search-results');
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');

  if (resultsContainer && resultsCount && noResults) {
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      resultsContainer.innerHTML = filtered.map(createCard).join('');
      resultsCount.textContent = `Found ${filtered.length} result(s) for: "${query}"`;
      noResults.style.display = 'none';
    } else {
      resultsContainer.innerHTML = '';
      resultsCount.textContent = '';
      noResults.style.display = 'block';
    }
  }
  // --- Promo Modal ---

  document.addEventListener('click', function (e) {
    const card = e.target.closest('.deal-card1');
    if (card) {
      const code = card.dataset.code;
      const brand = card.dataset.brand;
      const expiry = card.dataset.expiry;

      brandTitle.textContent = `${brand} Promo Code`;
      promoCode.textContent = code;
      expiryInfo.textContent = `Valid until: ${expiry}`;
      modal.classList.remove("hidden");
    }
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.add("hidden");
    });
  }

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  const copyBtn = document.getElementById("copyCodeBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(promoCode.textContent);
      this.textContent = "Copied!";
      setTimeout(() => (this.textContent = "Copy"), 2000);
    });
  }
});

