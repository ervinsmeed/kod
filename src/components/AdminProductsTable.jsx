import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModalConfirm } from "./ModalConfirm";
import { Edit2, Trash2, Bike, ShoppingCart } from "lucide-react";
import * as productsAPI from "../api/products";
import { useCart } from "../context/CartContext";

export const AdminProductsTable = ({ products, onRefresh }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const { addToCart } = useCart();
  const [deleteId, setDeleteId] = useState(null);
  const [actionId, setActionId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await productsAPI.remove(id);
      if (onRefresh) onRefresh();
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleQuickAdd = (product) => {
    addToCart(product);
    setActionId(null);
  };

  if (products.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
        <Bike className="mx-auto mb-4 text-slate-700" size={48} />
        <p className="text-slate-400 text-lg">{t("admin.noProducts")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/30">
              <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                Превью
              </th>
              <th className="px-6 py-4 text-slate-100 font-semibold text-sm uppercase tracking-wider">
                {t("admin.tableTitle")}
              </th>
              <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                {t("admin.tableCategory")}
              </th>
              <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                {t("admin.tablePrice")}
              </th>
              <th className="px-6 py-4 text-right text-slate-400 font-semibold text-sm uppercase tracking-wider">
                {t("admin.tableActions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => {
              const title =
                product[
                  `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`
                ] || product.titleKg;
              const productKey = product.uid || product.id;
              return (
                <tr
                  key={productKey}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        setActionId((prev) =>
                          prev === productKey ? null : productKey,
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActionId((prev) =>
                            prev === productKey ? null : productKey,
                          );
                        }
                      }}
                      className="relative w-12 h-12 rounded-lg bg-slate-800 overflow-hidden border border-slate-700 group-hover:border-orange-500/50 transition-colors cursor-pointer group/image"
                      title={t("admin.tableActions")}
                      aria-label={t("admin.tableActions")}
                    >
                      {product.cover ? (
                        <img
                          src={product.cover}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Bike className="w-full h-full p-2 text-slate-600" />
                      )}
                      <div
                        className={`absolute inset-0 flex items-center justify-center gap-1 bg-slate-950/70 transition-opacity ${
                          actionId === productKey
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                        } group-hover/image:opacity-100 group-hover/image:pointer-events-auto`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product);
                          }}
                          className="p-1.5 rounded-md bg-emerald-500/90 text-white hover:bg-emerald-500 transition-colors"
                          aria-label={t("product.addToCart")}
                          title={t("product.addToCart")}
                        >
                          <ShoppingCart size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionId(null);
                            setDeleteId(productKey);
                          }}
                          className="p-1.5 rounded-md bg-red-500/90 text-white hover:bg-red-500 transition-colors"
                          aria-label={t("common.delete")}
                          title={t("common.delete")}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-100 font-medium">{title}</div>
                    <div className="text-xs text-slate-500">
                      ID: {product.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-slate-800 text-orange-500 text-xs font-bold uppercase tracking-tighter border border-orange-500/20">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-100 font-mono font-bold">
                    ${product.price?.toLocaleString() || "0.00"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/products/edit/${productKey}`)
                        }
                        className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                        title={t("common.edit")}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="p-2 bg-slate-800 text-emerald-300 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                        title={t("product.addToCart")}
                      >
                        <ShoppingCart size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteId(productKey)}
                        className="p-2 bg-slate-800 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-lg"
                        title={t("common.delete")}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalConfirm
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title={t("admin.deleteProduct")}
        message={t("admin.confirmDelete")}
      />
    </>
  );
};

