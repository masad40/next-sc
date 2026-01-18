"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { HiPlusCircle, HiPhotograph, HiX, HiArrowLeft, HiUpload } from "react-icons/hi";
import Link from "next/link";

export default function AddItem() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // final ImgBB URL after upload
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Auth guard
  useEffect(() => {
    if (!Cookies.get("auth")) {
      toast.error("Please login first");
      router.push("/login");
    }
  }, [router]);

  // Live preview when file selected
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  // Upload image to ImgBB when needed
  const uploadToImgBB = async () => {
    if (!file) return null;

    setUploadingImage(true);
    toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);

      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Upload failed");
      }

      toast.dismiss();
      toast.success("Image uploaded!");
      return data.data.display_url; // or data.data.url for different size
    } catch (err) {
      toast.dismiss();
      toast.error("Image upload failed: " + err.message);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!price || isNaN(price) || Number(price) <= 0) errs.price = "Valid price required";
    if (!description.trim()) errs.description = "Description required";
    if (!file) errs.image = "Please select an image";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }

    setLoading(true);

    // Upload image first
    const uploadedUrl = await uploadToImgBB();
    if (!uploadedUrl) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://item-app-server.vercel.app/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          price: Number(price),
          image: uploadedUrl,
          description: description.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to save item");

      toast.success("Item added successfully!");
      router.push("/items");
      router.refresh();
    } catch (err) {
      toast.error("Failed to add item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <HiPlusCircle className="text-indigo-600" size={40} />
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Add New Item</h1>
          </div>
          <Link href="/items" className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900">
            <HiArrowLeft /> Back
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/80 p-8 animate-fade-up">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Item Image</label>

              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer hover:border-indigo-500 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-52 object-contain mb-4" />
                    ) : (
                      <>
                        <HiUpload className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, max 5MB</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}

              {imagePreview && !uploadingImage && (
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setImagePreview(null);
                  }}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <HiX size={16} /> Remove image
                </button>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border ${errors.name ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. Wireless Headphones"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="1"
                className={`w-full px-4 py-3 border ${errors.price ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. 2500"
              />
              {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border ${errors.description ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-indigo-500`}
                placeholder="Describe features, condition, etc..."
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
                loading || uploadingImage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl text-white"
              }`}
            >
              {loading || uploadingImage ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </>
              ) : (
                <>
                  <HiPlusCircle size={24} />
                  Add Item
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}