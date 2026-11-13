import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, Tag, Search, Filter, Image, X, Check, Building2, Eye } from "lucide-react";
import { BACKEND_URL, getImageUrl, normalizeProject } from "../../utils/helpers";

const ProjectManagement = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const initialFormData = {
    id: "",
    title: "",
    category: "residential",
    status: "in-progress",
    image: "",
    description: "",
    year: new Date().getFullYear().toString(),
    duration: "12 months",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/project/sendData`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data.map(normalizeProject));
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleShowAddForm = () => {
    setEditingProject(null);
    setFormData(initialFormData);
    setFile(null);
    setPreview("");
    setShowForm(true);
  };

  const handleShowEditForm = (project: any) => {
    setEditingProject(project);
    setFormData({
      id: project._id,
      title: project.title,
      category: project.category,
      status: project.status,
      image: project.image,
      description: project.description,
      year: String(project.year),
      duration: project.duration,
    });
    setPreview(project.image);
    setFile(null);
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("Title", formData.title);
      form.append("Category", formData.category);
      form.append("Status", formData.status);
      form.append("Year", formData.year);
      form.append("Duration", formData.duration);
      form.append("Description", formData.description);

      if (editingProject) {
        form.append("id", formData.id);
        if (file) {
          form.append("Image", file);
        } else {
          form.append("Image", formData.image);
        }

        await fetch(`${BACKEND_URL}/api/project/updateData`, {
          method: "POST",
          body: form,
        });
      } else {
        if (file) {
          form.append("Image", file);
        } else {
          form.append("Image", formData.image || "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800");
        }

        await fetch(`${BACKEND_URL}/api/project/getData`, {
          method: "POST",
          body: form,
        });
      }

      await fetchProjects();
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("Error saving project. Please check backend server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this project?")) return;

    try {
      await fetch(`${BACKEND_URL}/api/project/deleteData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project");
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 bg-slate-100/60 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            Project Portfolio Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add, update, or showcase residential and commercial civil developments.
          </p>
        </div>

        <button
          onClick={handleShowAddForm}
          className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
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
            placeholder="Search projects by title or scope..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto px-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-amber-500 shadow-sm font-semibold capitalize"
        >
          <option value="all">All Categories</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="renovations">Renovations</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="glass-card rounded-2xl overflow-hidden border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md capitalize">
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm capitalize">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold font-serif text-slate-900 text-base sm:text-lg mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-600" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-amber-600" />
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50/70 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => handleShowEditForm(project)}
                className="p-2 text-slate-700 hover:text-amber-700 hover:bg-amber-500/10 rounded-lg transition-colors"
                title="Edit project"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12 glass-card rounded-2xl">
            <p className="text-sm text-slate-500">No projects found matching the criteria.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-panel-dark rounded-2xl sm:rounded-3xl max-w-2xl w-full border border-white/20 shadow-2xl p-5 sm:p-8 animate-in zoom-in-95 duration-300 text-white relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold font-serif">
                {editingProject ? 'Edit Construction Project' : 'Add New Project'}
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
                <label className="block font-bold text-slate-300 uppercase mb-1">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-sm"
                  placeholder="e.g. Green Valley Residency"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400 capitalize"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovations">Renovations</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400 capitalize"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planning">Planning</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Year of Handover / Construction *</label>
                  <input
                    type="number"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 14 months"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Project Banner Photo</label>
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
                  <div className="mt-2 relative h-32 sm:h-36 rounded-xl overflow-hidden border border-white/20">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Project Description &amp; Scope *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detail the built-up area, amenities, structural specifications..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProject ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
