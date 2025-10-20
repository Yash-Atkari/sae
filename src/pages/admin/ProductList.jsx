import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Trash2, Edit3, PlusCircle } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("❌ Failed to load products: " + error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open delete confirmation popup
  const openDeletePopup = (product) => {
    setProductToDelete(product);
    setShowDeletePopup(true);
  };

  // Close delete confirmation popup
  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setProductToDelete(null);
  };

  // Delete a product
  const handleDelete = async () => {
    if (!productToDelete) return;

    setDeleting(true);
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productToDelete.id);

    if (error) {
      setMessage("❌ Error deleting product: " + error.message);
    } else {
      setMessage("✅ Product deleted successfully!");
      fetchProducts();
    }

    setDeleting(false);
    closeDeletePopup();
  };

  if (loading)
    return <p className="text-center text-gray-600 py-8">Loading products...</p>;

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold mx-auto text-gray-800">Manage Products</h1>
        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Product
        </Link>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Image</th>
                <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 font-semibold text-gray-700 hidden md:table-cell">Category</th>
                <th className="text-left p-4 font-semibold text-gray-700">Price</th>
                <th className="text-left p-4 font-semibold text-gray-700 hidden sm:table-cell">Discount</th>
                <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800 max-w-[150px] truncate">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-600 hidden md:table-cell">
                      {product.category}
                    </td>
                    <td className="p-4 text-gray-600 font-semibold">
                      ₹{product.price}
                    </td>
                    <td className="p-4 text-gray-600 hidden sm:table-cell">
                      {product.discount}%
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openDeletePopup(product)}
                          className="inline-flex items-center text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔴 Delete Confirmation Popup */}
      {showDeletePopup && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this product?
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>{productToDelete.name}</strong>
            </p>
            <p className="text-gray-600 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={closeDeletePopup}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
