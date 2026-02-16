import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../../components/AdminLayout';
import { AdminProductModal } from '../../components/AdminProductModal';
import { ModalConfirm } from '../../components/ModalConfirm';
import { SkeletonList } from '../../components/SkeletonList';
import { EmptyState } from '../../components/EmptyState';
import * as productsAPI from '../../api/products';

export const AdminProducts = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProductId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    setEditingProductId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await productsAPI.remove(id);
      loadProducts();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModalSuccess = () => {
    loadProducts();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('admin.manageProducts')}
            </h2>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-energy-blue text-white rounded-lg hover:bg-vibrant-orange transition-colors font-medium"
            >
              + {t('admin.addProduct')}
            </button>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <SkeletonList count={5} />
        ) : products.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12">
            <EmptyState message={t('admin.noProducts')} icon="📦" />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.tableId')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.tableTitle')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.tableCategory')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.tablePrice')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.tableActions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => {
                    const title = product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg;
                    const productKey = product.uid || product.id;
                    return (
                      <tr key={productKey} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 capitalize">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">
                          ${product.price?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {product.stock || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(productKey)}
                              className="text-energy-blue hover:text-vibrant-orange dark:text-neon-lime dark:hover:text-vibrant-orange p-1"
                              title={t('common.edit')}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() =>
                                window.open(`/product/${productKey}`, "_blank")
                              }
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1"
                              title="View"
                            >
                              📁
                            </button>
                            <button
                              onClick={() => setDeleteId(productKey)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                              title={t('common.delete')}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProductId(null);
        }}
        productId={editingProductId}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirm Modal */}
      <ModalConfirm
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title={t('admin.deleteProduct')}
        message={t('admin.confirmDelete')}
      />
    </AdminLayout>
  );
};
