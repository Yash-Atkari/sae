import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { ArrowLeft, Trash2, Upload, X } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    discount: "",
    features: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // New state for image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setMessage("❌ Error loading product: " + error.message);
      } else if (data) {
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          originalPrice: data.original_price || "",
          category: data.category || "",
          discount: data.discount || "",
          features: data.features ? data.features.join(", ") : "",
          stock: data.stock || "",
        });
        setCurrentImageUrl(data.image_url || "");
        setImagePreview(data.image_url || "");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage("❌ Please select an image file (PNG, JPG, JPEG, WEBP)");
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      setMessage(""); // Clear any previous messages
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(currentImageUrl); // Revert to original image
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const uploadImage = async () => {
    if (!imageFile) {
      // No new image selected, return current image URL
      return currentImageUrl;
    }

    try {
      setUploading(true);
      setMessage("Uploading image...");
      
      // Generate unique file name
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setMessage("✅ Image uploaded successfully!");
      return publicUrl;

    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage("❌ Failed to upload image: " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      // Upload new image if one was selected
      const imageUrl = await uploadImage();
      if (!imageUrl) {
        setSaving(false);
        return;
      }

      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          original_price: parseFloat(formData.originalPrice),
          category: formData.category,
          image_url: imageUrl, // Use the new image URL or keep current one
          discount: parseFloat(formData.discount) || 0,
          features: featuresArray,
          stock: parseInt(formData.stock) || 0,
          updated_at: new Date(),
        })
        .eq("id", id);

      if (error) {
        setMessage("❌ Update failed: " + error.message);
      } else {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => navigate("/admin/products"), 1200);
      }
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }

    setSaving(false);
  };

  // Delete Product
  const handleDelete = async () => {
    setDeleting(true);
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      setMessage("❌ Delete failed: " + error.message);
    } else {
      setMessage("✅ Product deleted successfully!");
      setTimeout(() => navigate("/admin/products"), 1000);
    }

    setDeleting(false);
    setShowDeletePopup(false);
  };

  if (loading)
    return <p className="text-center py-8 text-gray-600">Loading product...</p>;

  return (
    <div className="w-full mx-auto relative">
      <div className="flex items-center mb-6 justify-between">
        <button
          onClick={() => navigate("/admin/products")}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mx-auto">
          Edit Product
        </h1>
        <button
          onClick={() => setShowDeletePopup(true)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
          title="Delete product"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-700 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Short product description"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Product Image
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-gray-600 font-medium">
                    Click to upload image
                  </span>
                  <span className="text-gray-500 text-sm mt-1">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-start space-y-4">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                  />
                  {imageFile && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="text-white text-sm">Uploading...</div>
                    </div>
                  )}
                </div>
                
                {/* Upload new image button when current image is displayed */}
                {!imageFile && (
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Category & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., 50"
              min="0"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Features (comma-separated)
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows="3"
              placeholder="e.g., A17 Pro chip, 48MP camera, Titanium frame"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {(saving || uploading) ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* 🔴 Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this product?
            </h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
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

export default EditProduct;
