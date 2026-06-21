"use client";

import { Suspense, useState, useEffect } from "react";
import { useShop } from "@/src/context/ShopContext";
import { featuredProducts, newArrivals, bestSellers, Product, formatPrice } from "@/src/data/products";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { ArrowLeft, Loader2, CreditCard, Truck, Wallet, CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Combine all products to look up details
const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
const productsMap = new Map<number, Product>();
allProducts.forEach(p => productsMap.set(p.id, p));

const SHIPPING_METHODS = [
  { id: "standard", name: "Standard Delivery", price: 3, time: "3-5 Business Days" },
  { id: "express", name: "Express Delivery", price: 10, time: "1-2 Business Days" },
  { id: "pickup", name: "Store Pickup", price: 0, time: "Available Today" },
];

const PAYMENT_METHODS = [
  { id: "transfer", name: "Bank Transfer", icon: <CreditCard size={20} />, options: ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga"] },
  { id: "ewallet", name: "E-Wallet", icon: <Wallet size={20} />, options: ["GoPay", "OVO", "DANA", "ShopeePay"] },
];

function CheckoutContent() {
  const { cart } = useShop();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0]);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [paymentSubMethod, setPaymentSubMethod] = useState(PAYMENT_METHODS[0].options[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentMethodChange = (method: typeof PAYMENT_METHODS[0]) => {
    setPaymentMethod(method);
    setPaymentSubMethod(method.options[0]);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemsParam = searchParams.get("items");
  const selectedItemIds = itemsParam ? itemsParam.split(",").map(Number) : [];

  const cartItems = cart
    .filter(item => selectedItemIds.includes(item.productId))
    .map(item => ({
      ...item,
      product: productsMap.get(item.productId),
    }))
    .filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  const total = subtotal + shippingMethod.price;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Ganti dengan nomor WhatsApp Anda (Gunakan format internasional tanpa tanda '+')
    // Contoh: "6281234567890"
    const WHATSAPP_NUMBER = "6281234567890"; 

    let itemsText = cartItems.map(item => 
      `- ${item.quantity}x ${item.product!.name} (${formatPrice((item.product?.price || 0) * item.quantity)})`
    ).join("%0A");

    const message = `*New Order - Velox Sneakers*%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Address: ${formData.address}%0A%0A` +
      `*Order Items:*%0A${itemsText}%0A%0A` +
      `*Delivery:* ${shippingMethod.name} (${shippingMethod.price === 0 ? 'Free' : formatPrice(shippingMethod.price)})%0A` +
      `*Payment Method:* ${paymentMethod.name} (${paymentSubMethod})%0A%0A` +
      `*Total Payment: ${formatPrice(total)}*%0A%0A` +
      `Please confirm my order. Thank you!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Simulate slight delay for visual feedback
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsLoading(false);
      // Optional: you can redirect back to home or a success page here
      // router.push("/success");
    }, 800);
  };

  if (!mounted) return null;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center glass-strong rounded-[2.5rem] py-32 text-center">
        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">No items selected</h2>
        <p className="text-white/50 max-w-md mx-auto mb-8">
          Please select items from your cart to proceed with checkout.
        </p>
        <Link href="/cart" className="bg-crimson hover:bg-crimson-deep text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 shadow-md">
          Back to Cart
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/cart" className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/10 text-white transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Details Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Shipping Details</h2>
            <form id="checkout-form" onSubmit={handleConfirmPayment} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Phone Number (WhatsApp)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+62 812 3456 7890"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Full Address</label>
                <textarea 
                  name="address" 
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street name, Building, House number, City, Postal Code"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/50 transition-all resize-none"
                />
              </div>
            </form>
          </motion.div>

          {/* Delivery Method */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-strong rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Delivery Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SHIPPING_METHODS.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setShippingMethod(method)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod.id === method.id 
                      ? "border-crimson bg-crimson/10" 
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Truck size={18} className={shippingMethod.id === method.id ? "text-crimson" : "text-white/50"} />
                      <span className="font-semibold text-white">{method.name}</span>
                    </div>
                    {shippingMethod.id === method.id && <CheckCircle2 size={18} className="text-crimson" />}
                  </div>
                  <div className="text-sm text-white/50 mb-1">{method.time}</div>
                  <div className="font-bold text-white">
                    {method.price === 0 ? "Free" : formatPrice(method.price)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <div 
                  key={method.id}
                  className={`p-4 rounded-xl border transition-all ${
                    paymentMethod.id === method.id 
                      ? "border-crimson bg-crimson/10" 
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div 
                    onClick={() => handlePaymentMethodChange(method)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={paymentMethod.id === method.id ? "text-crimson" : "text-white/50"}>
                        {method.icon}
                      </div>
                      <span className="font-semibold text-white">{method.name}</span>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod.id === method.id ? "border-crimson" : "border-white/30"
                    }`}>
                      {paymentMethod.id === method.id && <div className="h-2.5 w-2.5 rounded-full bg-crimson" />}
                    </div>
                  </div>

                  {paymentMethod.id === method.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <label className="text-xs font-semibold text-white/50 mb-2 block uppercase tracking-wider">
                        Select {method.name}
                      </label>
                      <div className="relative">
                        <select 
                          value={paymentSubMethod}
                          onChange={(e) => setPaymentSubMethod(e.target.value)}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-crimson/50 transition-all appearance-none cursor-pointer"
                        >
                          {method.options.map(opt => (
                            <option key={opt} value={opt} className="bg-ink text-white">{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong rounded-[2rem] p-6 sm:p-8 sticky top-32">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.product!.id} className="flex gap-4 items-center">
                  <div className="h-16 w-16 rounded-lg bg-white/5 overflow-hidden flex-none shrink-0">
                    <img src={item.product!.image} alt={item.product!.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.product!.name}</h4>
                    <p className="text-xs text-white/50 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-white mt-1">{formatPrice(item.product!.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-sm text-white/70 border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod.name})</span>
                <span className="text-white font-medium">
                  {shippingMethod.price === 0 ? "Free" : formatPrice(shippingMethod.price)}
                </span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total</span>
                <span className="text-2xl font-bold text-crimson">{formatPrice(total)}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-crimson hover:bg-crimson-deep text-white font-semibold transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Payment"
              )}
            </button>
            <p className="text-center text-xs text-white/40 mt-4">
              You will be redirected to WhatsApp to complete your order.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-ink min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-5 sm:px-8 max-w-7xl mx-auto w-full">
        <Suspense fallback={
          <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-crimson w-12 h-12" />
            <p className="text-white/50 font-medium tracking-wider">Loading Checkout...</p>
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
