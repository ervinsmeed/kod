import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import * as productsAPI from "../api/products";
import * as reviewsAPI from "../api/reviews";
import * as usersAPI from "../api/users";
import * as favoritesAPI from "../api/favorites";
import { SkeletonList } from "../components/SkeletonList";
import { RatingStars } from "../components/RatingStars";

const SLIDES = [
  { id: "mountain", img: "https://images3.alphacoders.com/139/1397366.jpg" },
  { id: "city", img: "https://images4.alphacoders.com/597/597940.jpg" },
  {
    id: "road",
    img: "https://media.istockphoto.com/id/1282167556/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9-%D0%BE%D0%B1%D1%80%D0%B0%D0%B7-%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA-%D0%B2-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B9-%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D0%B5-%D0%B8-%D0%B7%D0%B0%D1%89%D0%B8%D1%82%D0%BD%D0%BE%D0%BC-%D1%88%D0%BB%D0%B5%D0%BC%D0%B5-%D0%B2%D0%B5%D1%80%D1%85%D0%BE%D0%BC-%D0%BD%D0%B0.jpg?s=1024x1024&w=is&k=20&c=vPNnAq7vArQM_1PYgo8mtZodZtQZINGkDozS89fYuyM=",
  },
  {
    id: "electric",
    img: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg",
  },
];

export const Home = () => {
  const { t } = useTranslation();
  const { currentLanguage: lang } = useLanguage();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  const fallback =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23f3e8ff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a78bfa' font-family='Arial' font-size='24'%3E✨%3C/text%3E%3C/svg%3E";

  useEffect(() => {
    const load = async () => {
      try {
        const [allProducts, allReviews, allUsers] = await Promise.all([
          productsAPI.getAll(),
          reviewsAPI.getAll(),
          usersAPI.getAll(),
        ]);

        setProducts(
          allProducts
            .sort((a, b) => (b.ratingAvg || 0) - (a.ratingAvg || 0))
            .slice(0, 6),
        );

        const usersMap = new Map(allUsers.map((u) => [String(u.id), u]));
        setReviews(
          allReviews
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3)
            .map((r) => {
              const u = usersMap.get(String(r.userId));
              const name = u?.fullName || u?.email || "Anonymous";
              return { ...r, userName: name, initial: name[0] };
            }),
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!user) return;
    favoritesAPI
      .getAll()
      .then((all) => {
        setFavorites(
          all
            .filter((f) => String(f.userId) === String(user.id))
            .map((f) => String(f.productId)),
        );
      })
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      6500,
    );
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = async (id, e) => {
    e.preventDefault();
    if (!user) return alert(t("review.pleaseLogin"));

    try {
      const all = await favoritesAPI.getAll();
      const exists = all.find(
        (f) =>
          String(f.userId) === String(user.id) &&
          String(f.productId) === String(id),
      );

      if (exists) {
        await favoritesAPI.remove(exists.id);
        setFavorites((prev) => prev.filter((pid) => pid !== String(id)));
      } else {
        await favoritesAPI.create({ userId: user.id, productId: id });
        setFavorites((prev) => [...prev, String(id)]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const categories = [
    {
      id: "mountain",
      img: "https://i.pinimg.com/1200x/ef/9f/84/ef9f8482cc831cce6726d9d200cbf284.jpg",
      color: "from-emerald-500",
    },
    {
      id: "city",
      img: "https://i.pinimg.com/1200x/ec/1a/18/ec1a185ec7930413cd25f50afa92737d.jpg",
      color: "from-blue-500",
    },
    {
      id: "road",
      img: "https://trialzone.ru/image/cache/catalog/stati-1/Stella-Titanium-XC-Race-Custom-Paint-MTB-1500x1000.jpg",
      color: "from-orange-500",
    },
    {
      id: "electric",
      img: "https://i.pinimg.com/736x/ea/ff/cf/eaffcff8c6d3d4ae8712c956fc6c730e.jpg",
      color: "from-purple-500",
    },
    {
      id: "kids",
      img: "https://static.vecteezy.com/system/resources/thumbnails/038/819/590/small/ai-generated-highlight-the-excitement-of-bmx-stunts-rider-launching-off-a-ramp-performing-daring-flips-and-tricks-mid-air-free-photo.jpeg",
      color: "from-pink-500",
    },
  ];

  const benefits = [
    {
      icon: "🌟",
      title: t("home.whyChooseUs.quality.title"),
      desc: t("home.whyChooseUs.quality.desc"),
    },
    {
      icon: "⚙️",
      title: t("home.whyChooseUs.service.title"),
      desc: t("home.whyChooseUs.service.desc"),
    },
    {
      icon: "✨",
      title: t("home.whyChooseUs.delivery.title"),
      desc: t("home.whyChooseUs.delivery.desc"),
    },
    {
      icon: "💫",
      title: t("home.whyChooseUs.electric.title"),
      desc: t("home.whyChooseUs.electric.desc"),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-indigo-950/20">
      {/* Hero - Glassmorphism */}
      <div className="relative h-[550px] overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              i === slide ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <img
              src={s.img}
              onError={(e) => (e.currentTarget.src = fallback)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/60 to-indigo-900/80 backdrop-blur-[2px]" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-4 border border-white/30">
                ⚡ VeloGo {t("home.categories")}
              </span>
              <h1 className="text-6xl font-black text-white mb-6 leading-tight">
                {t("home.subtitle")}
              </h1>
              <div className="flex gap-4">
                <Link
                  to={`/catalog?category=${SLIDES[slide].id}`}
                  className="group px-8 py-4 bg-white text-purple-900 font-bold rounded-2xl hover:bg-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {t("home.explore")}
                  <span className="inline-block group-hover:translate-x-1 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/catalog"
                  className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  {t("home.viewAllProducts")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`relative transition-all duration-500 ${
                i === slide
                  ? "w-12 h-3 bg-white rounded-full shadow-lg shadow-white/50"
                  : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/80 hover:scale-125"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories - Neon Cards */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
          {t("home.categories")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Choose your adventure 🚀
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/catalog?category=${c.id}`}
              className="group relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-transparent group-hover:border-purple-400/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/30">
                <img
                  src={c.img}
                  onError={(e) => (e.currentTarget.src = fallback)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${c.color} to-transparent opacity-60 group-hover:opacity-80 transition-opacity`}
                />
                <div className="absolute inset-0 flex items-end justify-center p-6">
                  <h3 className="text-white font-bold text-xl drop-shadow-lg transform group-hover:scale-110 transition">
                    {t(`category.${c.id}`)}
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition">
                      →
                    </span>
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular - 3D Cards */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-white">
            {t("home.popularProducts")}
          </h2>
          <p className="text-center text-purple-200 mb-12 max-w-2xl mx-auto">
            Most loved by our community 💜
          </p>

          {loading ? (
            <SkeletonList count={6} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={p.cover || fallback}
                      onError={(e) => (e.currentTarget.src = fallback)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button
                      onClick={(e) => toggleFavorite(p.id, e)}
                      className={`absolute top-4 right-4 w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center text-xl transition-all duration-300 hover:scale-125 ${
                        favorites.includes(String(p.id))
                          ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50"
                          : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                      }`}
                    >
                      ❤️
                    </button>
                  </div>
                  <div className="p-6">
                    <RatingStars rating={p.ratingAvg || 0} size="sm" />
                    <h3 className="font-bold text-xl my-3 text-white">
                      {p[`title${lang}`] || p.titleKg}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                        ${p.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(p);
                        }}
                        className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-2xl font-bold text-2xl hover:from-yellow-500 hover:to-pink-600 transition-all duration-300 hover:rotate-90 hover:shadow-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Benefits - Floating Cards */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
          {t("home.whyChoose")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Why riders love us ✨
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                {b.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                {b.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition">
                {b.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews - Testimonials */}
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
            {t("home.customerReviews")}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            What our customers say 💬
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={r.id}
                className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute -top-4 -left-2 text-6xl text-purple-300/50">
                  "
                </div>
                <RatingStars rating={r.rating} size="sm" />
                <p className="my-6 text-gray-700 dark:text-gray-300 text-lg italic relative z-10">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl transform rotate-12 group-hover:rotate-0 transition">
                    {r.initial}
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">
                      {r.userName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Verified Buyer ✓
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 animate-gradient" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h3 className="text-4xl font-black text-white mb-4">
            Ready to ride? 🚲
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy riders today
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-900 font-bold text-xl rounded-2xl hover:bg-purple-100 transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
          >
            {t("home.browseCatalog")}
            <span className="text-2xl group-hover:translate-x-2 transition">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
