import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, MapPin, Bed, Bath, Square, Search, X, Check, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { BACKEND_URL, formatCurrency, normalizeFlat } from "../../utils/helpers";

const FlatManagement = () => {
  const [flats, setFlats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFlat, setEditingFlat] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [formData, setFormData] = useState<any>({
    title: "",
    category: "available",
    price: "",
    location: "",
    image: "",
    bedrooms: "2",
    bathrooms: "2",
    area: "1200",
    description: "",
    features: "24/7 Security, Covered Parking, Power Backup, Modular Kitchen",
    imageGallery: [],
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const fetchFlats = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/flats`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setFlats(data.map(normalizeFlat));
      }
    } catch (err) {
      console.error("Error fetching flats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, [status]);

  const handleShowAddForm = () => {
    setEditingFlat(null);
    setFormData({
      title: "",
      category: "available",
      price: "",
      location: "",
      image: "",
      bedrooms: "2",
      bathrooms: "2",
      area: "1200",
      description: "",
      features: "24/7 Security, Covered Parking, Modular Kitchen, Landscaped Garden",
      imageGallery: [],
    });
    setFile(null);
    setPreview("");
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setShowForm(true);
  };

  const handleShowEditForm = (flat: any) => {
    setEditingFlat(flat);
    setFormData({
      ...flat,
      category: flat.category || "available",
      features: Array.isArray(flat.features) ? flat.features.join(", ") : "",
      imageGallery: Array.isArray(flat.imageGallery) ? flat.imageGallery : [],
      bedrooms: String(flat.bedrooms || 2),
      bathrooms: String(flat.bathrooms || 2),
      price: String(flat.price || ""),
      area: String(flat.area || ""),
    });
    setPreview(flat.image);
    setFile(null);
    setGalleryFiles([]);
    setGalleryPreviews(flat.imageGallery || []);
    setShowForm(true);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles(filesArray);
      const previews = filesArray.map((f) => URL.createObjectURL(f));
      setGalleryPreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("price", String(formData.price));
    form.append("location", formData.location);
    form.append("area", String(formData.area));
    form.append("bathrooms", String(formData.bathrooms));
    form.append("bedrooms", String(formData.bedrooms));
    form.append("description", formData.description);
    form.append("features", formData.features);

    if (file) {
      form.append("image", file);
    } else if (editingFlat && editingFlat.image) {
      form.append("existingImage", editingFlat.image);
    }

    galleryFiles.forEach((f) => {
      form.append("imageGallery", f);
    });

    try {
      if (editingFlat) {
        const res = await fetch(`${BACKEND_URL}/api/flats/${editingFlat._id}`, {
          method: "PUT",
          body: form,
        });
        await res.json();
      } else {
        const res = await fetch(`${BACKEND_URL}/api/flats`, {
          method: "POST",
          body: form,
        });
        await res.json();
      }

      setStatus(!status);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting flat:", error);
      alert("Error saving flat. Please check backend server.");
    } finally {
      setSaving(false);
    }
  };

  const deleteFlat = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this flat listing?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/flats/${id}`, {
        method: "DELETE",
      });
      await res.json();
      setStatus(!status);
    } catch (err) {
      console.error("Delete flat err:", err);
      alert("Unable to delete flat.");
    }
  };

  const filteredFlats = flats.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8 bg-slate-100/60 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            Flat &amp; Property Inventory
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage apartment listings, photos, unit availability, and pricing.
          </p>
        </div>

        <button
          onClick={handleShowAddForm}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Flat</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flats by title or location..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-amber-500 shadow-sm font-semibold capitalize"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available (Ready to move)</option>
          <option value="upcoming">Upcoming (Pre-launch)</option>
          <option value="sold">Sold Out</option>
        </select>
      </div>

      {/* Flats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlats.map((flat) => (
          <div
            key={flat._id}
            className="glass-card rounded-2xl overflow-hidden border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={flat.image} alt={flat.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      flat.category === 'available'
                        ? 'bg-emerald-500 text-white'
                        : flat.category === 'sold'
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-500 text-slate-950'
                    }`}
                  >
                    {flat.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white font-bold text-sm font-mono">
                    {formatCurrency(flat.price)}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold font-serif text-slate-900 text-lg mb-1 truncate">
                  {flat.title}
                </h3>
                <div className="flex items-center text-xs text-slate-500 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-amber-600 mr-1" />
                  <span className="truncate">{flat.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 text-center text-xs mb-3">
                  <div>
                    <span className="font-bold text-slate-900">{flat.bedrooms}</span> Beds
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{flat.bathrooms}</span> Baths
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 font-mono">{flat.area}</span> sq ft
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {flat.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => handleShowEditForm(flat)}
                className="p-2 text-slate-700 hover:text-amber-700 hover:bg-amber-500/10 rounded-lg transition-colors"
                title="Edit listing"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteFlat(flat._id)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete listing"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredFlats.length === 0 && (
          <div className="col-span-full text-center py-12 glass-card rounded-2xl">
            <p className="text-sm text-slate-500">No flats found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-panel-dark rounded-3xl max-w-2xl w-full border border-white/20 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-300 text-white relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-xl font-bold font-serif">
                {editingFlat ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Ashwath Heights 3BHK Penthouse"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Status / Availability *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400 capitalize"
                  >
                    <option value="available">Available</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="sold">Sold Out</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 4500000"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Location / Landmark *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Kopargaon, Shirdi Highway, Ahmednagar"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Bedrooms (BHK)</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Carpet Area (sq ft)</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Features (Comma separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="24/7 Security, Covered Parking, Modular Kitchen, Lift"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Main Cover Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setFile(f);
                      if (f) setPreview(URL.createObjectURL(f));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-slate-300"
                  />
                  {preview && (
                    <div className="mt-2 h-20 rounded-xl overflow-hidden border border-white/20">
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Gallery Photos (Multiple)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-slate-300"
                  />
                  {galleryPreviews.length > 0 && (
                    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                      {galleryPreviews.map((p, i) => (
                        <img key={i} src={p} alt="g" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Property Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingFlat ? 'Save Changes' : 'Publish Flat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlatManagement;
