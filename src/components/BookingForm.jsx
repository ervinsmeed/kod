import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, Bike, ArrowRight } from "lucide-react";

// НАСТРОЙКИ TELEGRAM (Замените на свои данные)
const TG_TOKEN = "8181304304:AAGsBQtDsSXaPuL4oLCu_utkw-sIC1BveyQ";
const TG_CHAT_ID = "7336488744";

export const BookingForm = () => {
  // const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          "https://6985988b6964f10bf253c4da.mockapi.io/tovar",
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ФУНКЦИЯ ОТПРАВКИ В TELEGRAM
  const sendTelegramMessage = async (bookingData) => {
    const productName = selectedProduct;

    const message = `
<b>🚴 Новая бронь!</b>
<b>Клиент:</b> ${user?.fullName || "Гость"}
<b>Товар:</b> ${productName}
<b>Дата:</b> ${bookingData.date}
<b>Время:</b> ${bookingData.time}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
    } catch (e) {
      console.error("Ошибка Telegram:", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !date || !time) {
      alert(t("booking.fillAll"));
      return;
    }

    setLoading(true);
    const bookingData = {
      userId: user?.id,
      productId: selectedProduct,
      date,
      time,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Сохраняем в MockAPI
      // const response = await fetch(
      //   "https://6985988b6964f10bf253c4da.mockapi.io/bookings",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(bookingData),
      //   },
      // );

      // if (response.ok) {
      // 2. Отправляем уведомление в Telegram
      await sendTelegramMessage(bookingData);

      alert(t("booking.success"));
      setSelectedProduct("");
      setDate("");
      setTime("");
    } catch (error) {
      alert(t("booking.error"));
    } finally {
      setLoading(false);
    }
  };

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center min-h-screen bg-[#0f1115] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white uppercase italic mb-4">
            {t("booking.title")} <span className="text-amber-500">/</span>
          </h2>
          <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px]">
            Забронируйте ваш идеальный заезд
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-12 shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="group">
                <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-amber-500 mb-4">
                  <Bike size={16} />
                  {t("booking.selectProduct")}
                </label>
                <div className="relative">
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                    className="w-full appearance-none bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer hover:bg-white/[0.05]"
                  >
                    <option value="" className="bg-[#1a1d23]">
                      {t("booking.selectProductPlaceholder") ||
                        "Выберите велосипед"}
                    </option>
                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={
                          product[
                            `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`
                          ] || product.titleKg
                        }
                        className="bg-[#1a1d23]"
                      >
                        {product[
                          `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`
                        ] || product.titleKg}{" "}
                        — ${product.price}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  * Выбранный байк будет подготовлен нашими механиками
                  специально под ваш рост и вес.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-amber-500 mb-4">
                    <Calendar size={16} />
                    {t("booking.selectDate")}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-amber-500 mb-4">
                    <Clock size={16} />
                    {t("booking.selectTime")}
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden px-8 py-5 bg-amber-500 text-black font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    t("common.loading")
                  ) : (
                    <>
                      {t("booking.submit")}
                      <ArrowRight size={20} />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {["Safety First", "Professional Gear", "Track Access"].map((text) => (
            <div
              key={text}
              className="text-[10px] text-slate-500 uppercase tracking-[0.4em] border-t border-white/5 pt-4"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
