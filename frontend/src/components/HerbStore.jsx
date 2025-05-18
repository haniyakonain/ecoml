import React, { useEffect, useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Tulsi",
    description: "Immunity booster and natural remedy for respiratory health.",
    benefits: "Boosts immunity, supports respiratory health, and reduces stress.",
    image: "images/tulsi.jpg",
    farmers: [
      { id: 1, name: "Farmer Raj", farm: "Raj Organic Farms", price: 50, rating: 4.5 },
      { id: 2, name: "Farmer Sita", farm: "Sita Herbal Farms", price: 55, rating: 4.2 }
    ]
  },
  {
    id: 2,
    name: "Neem",
    description: "Powerful plant for skin purification and anti-inflammatory properties.",
    benefits: "Purifies skin, fights infections, and reduces inflammation.",
    image: "images/neem.jpg",
    farmers: [
      { id: 3, name: "Farmer Amit", farm: "Amit Natural Fields", price: 70, rating: 4.8 },
      { id: 4, name: "Farmer Lata", farm: "Lata Green Gardens", price: 68, rating: 4.4 }
    ]
  },
  {
    id: 3,
    name: "Ashwagandha",
    description: "Reduces stress, anxiety and boosts energy levels.",
    benefits: "Reduces anxiety, boosts energy, and improves stamina.",
    image: "images/ashwagandha.jpg",
    farmers: [
      { id: 5, name: "Farmer Vikram", farm: "Vikram's Ayurveda", price: 150, rating: 4.7 },
      { id: 6, name: "Farmer Anita", farm: "Anita's Healing Garden", price: 145, rating: 4.5 }
    ]
  },
  {
    id: 4,
    name: "Aloe Vera",
    description: "Used for skin treatment, hydration, and digestive health.",
    benefits: "Hydrates skin, aids digestion, and heals wounds.",
    image: "images/aloevera.jpg",
    farmers: [
      { id: 7, name: "Farmer Raju", farm: "Raju's Farm", price: 40, rating: 4.3 },
      { id: 8, name: "Farmer Nisha", farm: "Nisha Herbal Farm", price: 42, rating: 4.6 }
    ]
  },
  {
    id: 5,
    name: "Turmeric",
    description: "Anti-inflammatory and antioxidant powerhouse.",
    benefits: "Fights inflammation, boosts immunity, and promotes healthy skin.",
    image: "images/turmeric.jpg",
    farmers: [
      { id: 9, name: "Farmer Manoj", farm: "Manoj Organic Farms", price: 80, rating: 4.9 },
      { id: 10, name: "Farmer Priya", farm: "Priya's Herbal Fields", price: 78, rating: 4.7 }
    ]
  },
  {
    id: 6,
    name: "Holy Basil",
    description: "Helps in stress relief and respiratory health.",
    benefits: "Relieves stress, improves lung function, and detoxifies.",
    image: "images/holybasil.jpg",
    farmers: [
      { id: 11, name: "Farmer Sunil", farm: "Sunil's Garden", price: 60, rating: 4.4 },
      { id: 12, name: "Farmer Rina", farm: "Rina's Organic Farm", price: 62, rating: 4.5 }
    ]
  },
  {
    id: 7,
    name: "Giloy",
    description: "Boosts immunity and detoxifies the body.",
    benefits: "Improves immunity, detoxifies liver, and reduces fever.",
    image: "images/giloy.jpg",
    farmers: [
      { id: 13, name: "Farmer Karan", farm: "Karan Herbal Fields", price: 110, rating: 4.6 },
      { id: 14, name: "Farmer Alka", farm: "Alka's Ayurveda Farm", price: 115, rating: 4.7 }
    ]
  },
  {
    id: 8,
    name: "Mint",
    description: "Relieves indigestion and improves respiratory health.",
    benefits: "Aids digestion, freshens breath, and clears congestion.",
    image: "images/mint.jpg",
    farmers: [
      { id: 15, name: "Farmer Anil", farm: "Anil's Herb Garden", price: 30, rating: 4.1 },
      { id: 16, name: "Farmer Rekha", farm: "Rekha Organic Farms", price: 32, rating: 4.3 }
    ]
  },
  {
    id: 9,
    name: "Moringa",
    description: "Rich in antioxidants and nutrients for overall health.",
    benefits: "Boosts energy, strengthens immunity, and supports weight loss.",
    image: "images/moringa.jpg",
    farmers: [
      { id: 17, name: "Farmer Ravi", farm: "Ravi's Moringa Farm", price: 120, rating: 4.5 },
      { id: 18, name: "Farmer Kavita", farm: "Kavita Herbal Fields", price: 125, rating: 4.7 }
    ]
  },
  {
    id: 10,
    name: "Amla",
    description: "Boosts immunity and improves digestion.",
    benefits: "Rich in Vitamin C, aids digestion, and strengthens hair.",
    image: "images/amla.jpg",
    farmers: [
      { id: 19, name: "Farmer Mahesh", farm: "Mahesh Organic Gardens", price: 35, rating: 4.8 },
      { id: 20, name: "Farmer Shreya", farm: "Shreya's Ayurveda", price: 38, rating: 4.7 }
    ]
  },
  {
    id: 11,
    name: "Brahmi",
    description: "Boosts brain health and improves memory.",
    benefits: "Enhances cognitive function, reduces anxiety, and improves focus.",
    image: "images/brahmi.jpg",
    farmers: [
      { id: 21, name: "Farmer Arjun", farm: "Arjun's Herbal Garden", price: 90, rating: 4.6 },
      { id: 22, name: "Farmer Meera", farm: "Meera's Ayurveda Farm", price: 88, rating: 4.4 }
    ]
  },
  {
    id: 12,
    name: "Shatavari",
    description: "Supports women's health and hormonal balance.",
    benefits: "Regulates hormones, boosts fertility, and improves digestion.",
    image: "images/shatavari.jpg",
    farmers: [
      { id: 23, name: "Farmer Tara", farm: "Tara's Organic Fields", price: 140, rating: 4.7 },
      { id: 24, name: "Farmer Dev", farm: "Dev Herbal Farms", price: 135, rating: 4.5 }
    ]
  },
  {
    id: 13,
    name: "Triphala",
    description: "Powerful detoxifier and digestive support.",
    benefits: "Aids digestion, detoxifies the body, and promotes weight loss.",
    image: "images/triphala.jpg",
    farmers: [
      { id: 25, name: "Farmer Suraj", farm: "Suraj's Ayurveda", price: 95, rating: 4.8 },
      { id: 26, name: "Farmer Lakshmi", farm: "Lakshmi Herbal Farms", price: 92, rating: 4.6 }
    ]
  },
  {
    id: 14,
    name: "Jatamansi",
    description: "Calming herb for better sleep and stress relief.",
    benefits: "Promotes relaxation, improves sleep, and reduces anxiety.",
    image: "images/jatamansi.jpg",
    farmers: [
      { id: 27, name: "Farmer Gopal", farm: "Gopal's Herbal Garden", price: 160, rating: 4.5 },
      { id: 28, name: "Farmer Radha", farm: "Radha's Organic Fields", price: 155, rating: 4.6 }
    ]
  },
  {
    id: 15,
    name: "Gotu Kola",
    description: "Boosts brain function and reduces anxiety.",
    benefits: "Improves memory, reduces anxiety, and supports skin health.",
    image: "images/gotukola.jpg",
    farmers: [
      { id: 29, name: "Farmer Naveen", farm: "Naveen's Ayurveda", price: 100, rating: 4.7 },
      { id: 30, name: "Farmer Rekha", farm: "Rekha's Herbal Farm", price: 98, rating: 4.5 }
    ]
  }
];

const HerbStore = () => {
  const [cart, setCart] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutView, setCheckoutView] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: "", address: "", phone: "" });
  const [cod, setCod] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product, price, farmer, farm, quantity) => {
    const existing = cart.find(item => item.name === product.name && item.farmer === farmer);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map(item =>
        item.name === product.name && item.farmer === farmer
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * price }
          : item
      );
    } else {
      updatedCart = [...cart, { name: product.name, farmer, farm, price, quantity, total: price * quantity }];
    }
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setModalProduct(null);
  };

  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    if (!cod) return alert("Please select a payment method.");
    const { name, address, phone } = customerDetails;
    alert(`Thank you, ${name}! Your order of ₹${getTotal()} has been placed for delivery at ${address}. We will contact you at ${phone}.`);
    setCart([]);
    localStorage.removeItem("cartItems");
    setCustomerDetails({ name: "", address: "", phone: "" });
    setCod(false);
    setCheckoutView(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}><br></br><br></br>  🌿 EcoAyur Herb Store 🌿</h1>

      {!checkoutView && (
        <>
          <div style={styles.grid}>
            {PRODUCTS.map(product => (
              <div key={product.id} style={styles.card}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button style={styles.button} onClick={() => setModalProduct(product)}>Select Farmer</button>
              </div>
            ))}
          </div>

          <button style={styles.button} onClick={() => setShowCart(!showCart)}>🛒 View Cart</button>

          {showCart && (
            <div>
              <ul>
                {cart.map((item, i) => (
                  <li key={i}>
                    {item.name} by {item.farmer} - ₹{item.price} x {item.quantity} = ₹{item.total}
                    <button style={styles.removeBtn} onClick={() => removeFromCart(i)}>❌</button>
                  </li>
                ))}
              </ul>
              <p><strong>Total: ₹{getTotal()}</strong></p>
              <button style={styles.button} onClick={() => setCheckoutView(true)}>Proceed to Checkout</button>
            </div>
          )}
        </>
      )}

      {checkoutView && (
        <div>
          <h2>Checkout</h2>
          <ul>
            {cart.map((item, i) => (
              <li key={i}>{item.name} from {item.farmer} ({item.farm}) - ₹{item.price} x {item.quantity} = ₹{item.total}</li>
            ))}
          </ul>
          <p><strong>Total: ₹{getTotal()}</strong></p>

          <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
            <input
              placeholder="Full Name"
              value={customerDetails.name}
              onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Address"
              value={customerDetails.address}
              onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })}
              required
              style={styles.input}
            />
            <input
              placeholder="Phone Number"
              value={customerDetails.phone}
              onChange={e => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
              required
              style={styles.input}
            />
            <label>
              <input type="checkbox" checked={cod} onChange={() => setCod(!cod)} /> Cash on Delivery
            </label>
            <button type="submit" style={styles.button}>Confirm Order</button>
          </form>
          <button style={styles.button} onClick={() => setCheckoutView(false)}>← Back to Cart</button>
        </div>
      )}

      {/* Modal */}
      {modalProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2>{modalProduct.name}</h2>
            <select id="farmerSelect">
              {modalProduct.farmers.map((f, idx) => (
                <option key={idx} value={`${f.price}|${f.name}|${f.farm}`}>
                  {f.name} - {f.farm} - ₹{f.price} - ⭐{f.rating}
                </option>
              ))}
            </select>
            <input id="quantityInput" type="number" defaultValue={1} min={1} style={styles.input} />
            <button
              style={styles.button}
              onClick={() => {
                const val = document.getElementById("farmerSelect").value.split("|");
                const quantity = parseInt(document.getElementById("quantityInput").value);
                addToCart(modalProduct, parseInt(val[0]), val[1], val[2], quantity);
              }}
            >Add to Cart</button>
            <button style={styles.removeBtn} onClick={() => setModalProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { 
    fontFamily: "Poppins, sans-serif", 
    padding: "20px",
    backgroundImage: "url('/herbs-background.jpg')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative"
  },
  contentWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(5px)",
    borderRadius: "15px",
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
  },
  header: { 
    fontSize: "clamp(1.8em, 5vw, 2.5em)", 
    color: "#2E7D32", 
    marginBottom: "25px",
    fontWeight: "600",
    textAlign: "center",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
  },
  grid: { 
    display: "flex", 
    flexWrap: "wrap", 
    gap: "25px",
    justifyContent: "center" 
  },
  card: {
    border: "1px solid #ccc", 
    padding: "20px", 
    borderRadius: "12px", 
    width: "calc(100% - 20px)",
    maxWidth: "250px",
    background: "#fff", 
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)", 
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.12)"
    }
  },
  image: { 
    width: "100%", 
    height: "140px", 
    objectFit: "cover", 
    borderRadius: "8px",
    marginBottom: "12px"
  },
  button: {
    backgroundColor: "#4CAF50", 
    color: "white", 
    border: "none", 
    padding: "12px 20px",
    borderRadius: "8px", 
    cursor: "pointer", 
    marginTop: "15px",
    fontWeight: "500",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#3d8b40"
    }
  },
  removeBtn: {
    backgroundColor: "#e74c3c", 
    color: "white", 
    border: "none", 
    borderRadius: "6px",
    padding: "8px 12px", 
    marginLeft: "10px", 
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#c0392b"
    }
  },
  input: {
    display: "block", 
    width: "100%", 
    margin: "15px 0", 
    padding: "12px",
    borderRadius: "8px", 
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:focus": {
      outline: "none",
      borderColor: "#4CAF50",
      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.25)"
    }
  },
  modalOverlay: {
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100%", 
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(3px)"
  },
  modalBox: {
    backgroundColor: "white", 
    padding: "30px", 
    borderRadius: "15px", 
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)", 
    textAlign: "center"
  },
  responsiveContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    "@media (min-width: 768px)": {
      flexDirection: "row"
    }
  },
  herbName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px"
  },
  herbDescription: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px"
  },
  filterContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px",
    justifyContent: "center"
  },
  filterButton: {
    backgroundColor: "#f1f1f1",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "30px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e0e0e0"
    },
    "&.active": {
      backgroundColor: "#4CAF50",
      color: "white",
      borderColor: "#4CAF50"
    }
  }
};

export default HerbStore;