import React, { useMemo, useState, useEffect } from "react";

const BRAND_COLORS = {
  "ASUS": "from-indigo-500 to-purple-500",
  "Gigabyte": "from-cyan-500 to-blue-600",
  "MSI": "from-red-500 to-rose-600",
  "TI": "from-amber-500 to-orange-600",
  "STMicro": "from-emerald-500 to-teal-600",
  "Microchip": "from-fuchsia-500 to-pink-600",
  "Raspberry Pi": "from-green-500 to-emerald-600",
  "Espressif": "from-sky-500 to-indigo-600",
};

const PRODUCTS = [
  {
    id: "mb-b550",
    title: "AM4 B550 Motherboard",
    brand: "Gigabyte",
    category: "Motherboards",
    price: 9999,
    rating: 4.6,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    specs: ["AMD AM4", "B550 Chipset", "M.2 NVMe", "PCIe 4.0"],
    badge: "Bestseller",
  },
  {
    id: "mb-z690",
    title: "LGA1700 Z690 Motherboard",
    brand: "ASUS",
    category: "Motherboards",
    price: 18999,
    rating: 4.7,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop",
    specs: ["Intel 12th Gen", "DDR5", "Wi‑Fi 6", "PCIe 5.0"],
    badge: "New",
  },
  {
    id: "ic-555",
    title: "NE555 Timer IC (DIP‑8)",
    brand: "TI",
    category: "ICs",
    price: 25,
    rating: 4.8,
    stock: 500,
    image:
      "https://cdn.pixabay.com/photo/2016/06/07/17/15/electronics-1447021_1280.jpg",
    specs: ["Astable/Monostable", "5–15V", "DIP‑8"],
    badge: "Hot",
  },
  {
    id: "ic-lm358",
    title: "LM358 Dual Op‑Amp (DIP‑8)",
    brand: "STMicro",
    category: "ICs",
    price: 30,
    rating: 4.7,
    stock: 320,
    image:
      "https://cdn.pixabay.com/photo/2015/01/08/18/26/board-593054_1280.jpg",
    specs: ["Dual Op‑Amp", "3–32V", "Low Power"],
  },
  {
    id: "ic-atmega328p",
    title: "ATmega328P Microcontroller",
    brand: "Microchip",
    category: "Microcontrollers",
    price: 249,
    rating: 4.9,
    stock: 150,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    specs: ["AVR 8‑bit", "32KB Flash", "DIP‑28"],
  },
  {
    id: "dev-esp32",
    title: "ESP32 Dev Board (Wi‑Fi + BLE)",
    brand: "Espressif",
    category: "Development Boards",
    price: 449,
    rating: 4.8,
    stock: 95,
    image:
      "https://images.unsplash.com/photo-1605979257913-170a1b9d1a8a?q=80&w=1200&auto=format&fit=crop",
    specs: ["Dual‑core", "Wi‑Fi/BT", "GPIO, ADC, I2C, SPI"],
    badge: "Trending",
  },
  {
    id: "dev-pico",
    title: "Raspberry Pi Pico (RP2040)",
    brand: "Raspberry Pi",
    category: "Development Boards",
    price: 399,
    rating: 4.8,
    stock: 110,
    image:
      "https://images.unsplash.com/photo-1585687647411-2695b5d989aa?q=80&w=1200&auto=format&fit=crop",
    specs: ["Dual M0+", "264KB SRAM", "DIP‑40"],
  },
  {
    id: "sensor-imu",
    title: "6‑Axis IMU (MPU‑6050)",
    brand: "Generic",
    category: "Sensors",
    price: 179,
    rating: 4.5,
    stock: 210,
    image:
      "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=1200&auto=format&fit=crop",
    specs: ["Accel + Gyro", "I2C", "3.3/5V"],
  },
  {
    id: "psu-650",
    title: "650W 80+ Gold PSU",
    brand: "MSI",
    category: "Power",
    price: 5999,
    rating: 4.6,
    stock: 22,
    image:
      "https://images.unsplash.com/photo-1587206668288-c6b8f927b3f3?q=80&w=1200&auto=format&fit=crop",
    specs: ["650W", "80+ Gold", "Modular"],
  },
  {
    id: "tool-solder",
    title: "Smart Soldering Station",
    brand: "Generic",
    category: "Tools",
    price: 1699,
    rating: 4.4,
    stock: 40,
    image:
      "https://images.unsplash.com/photo-1615823287889-69f2d655d122?q=80&w=1200&auto=format&fit=crop",
    specs: ["60W", "LCD", "200–480°C"],
  },
];

const CATEGORIES = [
  "All",
  "Motherboards",
  "ICs",
  "Microcontrollers",
  "Development Boards",
  "Sensors",
  "Power",
  "Tools",
];

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

export default function VoltBazaar() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("pop");
  const [dark, setDark] = useLocalStorage("vb_dark", true);
  const [cart, setCart] = useLocalStorage("vb_cart", []);
  const [wishlist, setWishlist] = useLocalStorage("vb_wish", []);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") { e.preventDefault(); document.getElementById("vb-search")?.focus(); }
      if (e.key.toLowerCase() === "c") setDrawer(d => !d);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !!dark);
  }, [dark]);

  const brands = useMemo(() => ["All", ...Array.from(new Set(PRODUCTS.map(p => p.brand)))], []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (category === "All" || p.category === category) &&
      (brand === "All" || p.brand === brand) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) ||
       p.specs.join(" ").toLowerCase().includes(query.toLowerCase()))
    );
    switch (sort) {
      case "priceAsc": list.sort((a,b)=>a.price-b.price); break;
      case "priceDesc": list.sort((a,b)=>b.price-a.price); break;
      case "rating": list.sort((a,b)=>b.rating-a.rating); break;
      default: list.sort((a,b)=> (b.rating*10 + (b.stock>0?1:0)) - (a.rating*10 + (a.stock>0?1:0)) );
    }
    return list;
  }, [query, category, brand, sort]);

  const subtotal = cart.reduce((s, i)=> s + i.price * i.qty, 0);

  const addToCart = (p) => {
    setCart(c => {
      const i = c.findIndex(x=>x.id===p.id);
      if (i>-1) {
        const copy = [...c];
        copy[i] = {...copy[i], qty: Math.min(copy[i].qty+1, 99)};
        return copy;
      }
      return [...c, { id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 }];
    });
  };

  const toggleWish = (id) => setWishlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-black text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-zinc-200/60 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <Logo/>
          <div className="hidden md:flex items-center gap-2">
            <Kbd>/</Kbd><span className="text-sm text-zinc-500">Search</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={()=>setDark(d=>!d)} className="px-3 py-2 rounded-xl text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">{dark?"Light":"Dark"}</button>
            <button onClick={()=>setDrawer(true)} className="relative px-3 py-2 rounded-xl text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Cart <span className="ml-1 inline-flex items-center justify-center text-xs px-2 rounded-full bg-black text-white dark:bg-white dark:text-black">{cart.reduce((s,i)=>s+i.qty,0)}</span>
            </button>
          </div>
        </div>
      </header>

      <Hero/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Controls {...{query,setQuery,category,setCategory,brand,setBrand,sort,setSort,brands}}/>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onAdd={()=>addToCart(p)} wished={wishlist.includes(p.id)} onWish={()=>toggleWish(p.id)}/>
          ))}
        </div>

        <CTA/>
      </main>

      <Footer/>

      {drawer && <CartDrawer cart={cart} setCart={setCart} onClose={()=>setDrawer(false)} />}
    </div>
  );
}

function Logo(){
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 shadow-lg" />
      <div className="font-bold tracking-tight text-lg">VoltBazaar</div>
      <span className="hidden sm:inline text-xs px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 ml-1">Electronics • ICs • Maker Gear</span>
    </div>
  );
}

function Kbd({children}){
  return <span className="px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-mono">{children}</span>;
}

function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.5),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.5),transparent_40%)]"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Build. Hack. Ship. <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">Top‑notch electronics</span> for everyone.
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-xl">Motherboards, ICs, microcontrollers, sensors, tools — curated for makers and pros. Fast shipping across India.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#shop" className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black shadow hover:opacity-90">Shop now</a>
              <a href="#about" className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">Why VoltBazaar?</a>
            </div>
          </div>
          <div className="relative">
            <img className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover" loading="lazy" alt="Electronics gear" src="https://images.unsplash.com/photo-1555617981-dac3880f77e2?q=80&w=1400&auto=format&fit=crop"/>
            <div className="absolute -bottom-4 -left-4 bg-white/80 dark:bg-black/50 backdrop-blur rounded-2xl p-3 shadow-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-sm font-semibold">ICs in Stock</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">2,000+ pieces • 24‑48h dispatch</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Controls({query,setQuery,category,setCategory,brand,setBrand,sort,setSort,brands}){
  return (
    <div id="shop" className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 bg-white/70 dark:bg-zinc-900/60 backdrop-blur">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="vb-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search motherboards, 555, ESP32…" className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none"/>
        </div>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2">
          {CATEGORIES.map(c=> <option key={c}>{c}</option>)}
        </select>
        <div className="flex gap-2">
          <select value={brand} onChange={e=>setBrand(e.target.value)} className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2">
            {brands.map(b=> <option key={b}>{b}</option>)}
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2">
            <option value="pop">Popular</option>
            <option value="priceAsc">Price: Low → High</option>
            <option value="priceDesc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ProductCard({p, onAdd, wished, onWish}){
  const grad = BRAND_COLORS[p.brand] || "from-zinc-500 to-zinc-700";
  return (
    <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur overflow-hidden">
      {p.badge && (
        <span className="absolute left-3 top-3 z-10 text-xs px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-lime-600 text-white shadow">{p.badge}</span>
      )}
      <button onClick={onWish} aria-label="Wishlist" className={`absolute right-3 top-3 z-10 size-9 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/60 backdrop-blur flex items-center justify-center ${wished?"scale-110" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={wished?"currentColor":"none"} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
      </button>
      <div className={`relative aspect-[4/3] w-full bg-gradient-to-br ${grad} opacity-90`}/>
      <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-1/2 object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"/>
      <div className="p-4 pt-36">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-tight">{p.title}</h3>
            <div className="text-xs text-zinc-500">{p.brand} • {p.category}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">₹{p.price.toLocaleString("en-IN")}</div>
            <div className="text-xs text-amber-600 dark:text-amber-400">★ {p.rating.toFixed(1)}</div>
          </div>
        </div>
        <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc list-inside space-y-1">
          {p.specs.slice(0,3).map(s=> <li key={s}>{s}</li>)}
        </ul>
        <div className="mt-4 flex items-center gap-2">
          <button onClick={onAdd} className="flex-1 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90">Add to cart</button>
          <button className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">Details</button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({cart, setCart, onClose}){
  const subtotal = cart.reduce((s, i)=> s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700">Close</button>
        </div>
        <div className="flex-1 overflow-auto divide-y divide-zinc-200 dark:divide-zinc-800">
          {cart.length===0 ? (
            <div className="p-6 text-zinc-500">Cart is empty. Start adding your favorite parts!</div>
          ) : cart.map(item => (
            <div key={item.id} className="p-4 flex gap-3">
              <img alt={item.title} src={item.image} className="size-16 rounded-lg object-cover"/>
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-zinc-500">₹{item.price.toLocaleString("en-IN")}</div>
                <div className="mt-2 flex items-center gap-2">
                  <Qty value={item.qty} onChange={(q)=> setCart(c=> c.map(x=> x.id===item.id ? {...x, qty: Math.max(1, Math.min(99,q))} : x)) }/>
                  <button onClick={()=> setCart(c=> c.filter(x=> x.id!==item.id))} className="text-sm px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="text-zinc-500">Subtotal</div>
            <div className="font-bold">₹{subtotal.toLocaleString("en-IN")}</div>
          </div>
          <Checkout subtotal={subtotal} onSuccess={()=>{ setCart([]); onClose(); alert("Order placed! (demo)"); }}/>
        </div>
      </aside>
    </div>
  );
}

function Qty({value,onChange}){
  return (
    <div className="inline-flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden">
      <button onClick={()=>onChange(value-1)} className="px-3 py-1">−</button>
      <input value={value} onChange={e=>onChange(Number(e.target.value)||1)} className="w-12 text-center bg-transparent outline-none"/>
      <button onClick={()=>onChange(value+1)} className="px-3 py-1">+</button>
    </div>
  );
}

function Checkout({subtotal, onSuccess}){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const canPay = subtotal>0 && name && email && addr;
  return (
    <div className="mt-3 space-y-2">
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"/>
      <textarea placeholder="Address" rows={2} value={addr} onChange={e=>setAddr(e.target.value)} className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"/>
      <button disabled={!canPay} onClick={onSuccess} className={`w-full px-4 py-3 rounded-xl ${canPay?"bg-black text-white dark:bg-white dark:text-black hover:opacity-90":"bg-zinc-200 dark:bg-zinc-800 text-zinc-500"}`}>{canPay?"Pay • UPI/Card (demo)":"Fill details to pay"}</button>
      <p className="text-xs text-zinc-500">* Payment is simulated. Integrate Razorpay/Stripe later.</p>
    </div>
  );
}

function CTA(){
  return (
    <section id="about" className="mt-14 grid md:grid-cols-3 gap-4">
      {[{
        title:"Curated Quality",
        desc:"Only trusted brands & tested parts. No fakes.",
      },{
        title:"Fast Shipping",
        desc:"24–48h dispatch across India with tracking.",
      },{
        title:"Maker‑first Support",
        desc:"Datasheets, guides & friendly help on chat.",
      }].map((c)=> (
        <div key={c.title} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/70 dark:bg-zinc-900/60">
          <div className="text-lg font-semibold">{c.title}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{c.desc}</div>
        </div>
      ))}
    </section>
  );
}

function Footer(){
  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <Logo/>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Unique Indian electronics marketplace — motherboards, ICs, microcontrollers, sensors & tools.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Shop</div>
          <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
            {CATEGORIES.filter(c=>c!=="All").map(c=> <li key={c}><a href="#shop" className="hover:underline">{c}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <div className="text-zinc-600 dark:text-zinc-400">support@voltbazaar.in</div>
          <div className="text-zinc-600 dark:text-zinc-400">+91‑98765 43210</div>
          <div className="mt-2 text-xs text-zinc-500">© {new Date().getFullYear()} VoltBazaar</div>
        </div>
      </div>
    </footer>
  );
}
