import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import * as usersAPI from "../api/users";

export const Login = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const allUsers = await usersAPI.getAll();
      const user = allUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        login(
          { id: user.id, fullName: user.fullName, role: user.role },
          "demo-token",
        );
        navigate("/");
      } else {
        setError(t("login.invalidCredentials"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-dark via-slate-900 to-custom-dark px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-vibrant-orange rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-energy-blue rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🚲</div>
          <h1 className="text-4xl font-extrabold text-white mb-2">VeloMart</h1>
          <p className="text-gray-400">{t("login.welcome")}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t("login.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-orange-500"
              placeholder="rider@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t("login.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-energy-blue to-vibrant-orange hover:from-vibrant-orange hover:to-energy-blue rounded-lg font-semibold text-white transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                {t("common.loading")}
              </span>
            ) : (
              t("login.submit")
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          {t("login.noAccount")}{" "}
          <Link
            to="/register"
            className="text-orange-400 hover:text-orange-300 font-semibold"
          >
            {t("nav.register")}
          </Link>
        </p>
      </div>
    </div>
  );
};
