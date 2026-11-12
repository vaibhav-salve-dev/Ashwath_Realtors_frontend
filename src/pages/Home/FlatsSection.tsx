import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bed, Bath, Square, Heart, Eye, Phone, Calendar, 
  CheckCircle2, MessageSquare, Home, User, Mail, X, 
  ChevronLeft, ChevronRight, Sparkles, Building, ArrowRight
} from 'lucide-react';
import { BACKEND_URL, formatCurrency, normalizeFlat } from '../../utils/helpers';

const fallbackFlats = [
  {
    _id: '1',
    title: 'Anandvilla Luxury 3BHK Residence',
    category: 'upcoming',
    price: 18500000,
    location: 'Andheri East, Mumbai',
    bedrooms: 3,
    bathrooms: 3,
    area: 1450,
    description: 'Flagship redevelopment residence in prime Andheri East with seamless access to Western Express Highway and international airport. MahaRERA registered: PR1180002501890.',
    features: ['Redevelopment Modernization', 'Earthquake-Resistant RCC', 'MahaRERA PR1180002501890', 'High-speed Elevators', 'Double-height Entrance Lobby'],
    image: '/assets/anandvilla.png',
    imageGallery: [
      '/assets/anandvilla.png',
      '/assets/pooja-apartment.png',
      '/assets/navkshitij.png'
    ]
  },
  {
    _id: '2',
    title: 'Pooja Apartment 3BHK Premium Home',
    category: 'available',
    price: 14500000,
    location: 'Erandwane, Pune',
    bedrooms: 3,
    bathrooms: 3,
    area: 1320,
    description: 'Spacious 3 BHK home situated in upscale Erandwane. Thoughtfully crafted layout featuring premium vitrified flooring, solar water integration, and covered parking.',
    features: ['MahaRERA P52100032378', 'Prime Erandwane Locality', 'Covered Car Parking', '24/7 Security & CCTV', 'Rainwater Harvesting'],
    image: '/assets/pooja-apartment.png',
    imageGallery: [
      '/assets/pooja-apartment.png',
      '/assets/navkshitij.png'
    ]
  },
  {
    _id: '3',
    title: 'NavKshitij 2BHK Smart Residence',
    category: 'available',
    price: 9800000,
    location: 'Kothrud, Pune',
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    description: 'Thoughtfully planned residential address in prime Kothrud. Built with earthquake-resistant RCC construction, landscaped outdoor spaces, and high-quality fittings.',
    features: ['Kothrud Landmark Location', 'Vastu Compliant Layout', 'Power Backup', 'Landscaped Terrace', 'Designer Bathrooms'],
    image: '/assets/navkshitij.png',
    imageGallery: [
      '/assets/navkshitij.png',
      '/assets/pooja-apartment.png'
    ]
  },
  {
    _id: '4',
    title: 'Charisma Commercial & Residential Suite',
    category: 'available',
    price: 11200000,
    location: 'D’Souza Colony, Nashik',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    description: 'Prime mixed-use development combining ground-floor commercial storefronts and corporate spaces with tranquil residential apartments above off College Road.',
    features: ['Off College Road Hub', 'Commercial & Residential Dual Utility', 'Basement Parking', 'Glass Curtain Facade', 'High Footfall Visibility'],
    image: '/assets/charisma.png',
    imageGallery: [
      '/assets/charisma.png',
      '/assets/vijayashree.png'
    ]
  }
];

const FlatsSection = () => {
  const [rawFlats, setRawFlats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedFlatForDetails, setSelectedFlatForDetails] = useState<any | null>(null);
  const [selectedFlatForEnquiry, setSelectedFlatForEnquiry] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/flats`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRawFlats(data);
        } else {
          setRawFlats(fallbackFlats);
        }
      })
      .catch((err) => {
        console.log('Flats fetch fallback:', err.message);
        setRawFlats(fallbackFlats);
      })
      .finally(() => setLoading(false));
  }, []);

  const flats = rawFlats.map(normalizeFlat);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filterOptions = [
    { key: 'all', label: 'All Properties', count: flats.length },
    { key: 'available', label: 'Ready to Move', count: flats.filter((f) => f.category === 'available').length },
    { key: 'upcoming', label: 'Under Construction', count: flats.filter((f) => f.category === 'upcoming').length },
    { key: 'sold', label: 'Sold Out', count: flats.filter((f) => f.category === 'sold').length },
  ];

  const filteredFlats = activeFilter === 'all'
    ? flats
    : flats.filter((flat) => flat.category === activeFilter);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'available':
        return { bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700', label: 'Available' };
      case 'sold':
        return { bg: 'bg-rose-500/15 border-rose-500/30 text-rose-700', label: 'Sold Out' };
      default:
        return { bg: 'bg-amber-500/15 border-amber-500/30 text-amber-800', label: 'Upcoming' };
    }
  };

  return (
    <section id="flats" className="py-20 lg:py-28 relative overflow-hidden bg-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Building className="h-4 w-4 text-amber-600" />
            <span>Prime Real Estate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 tracking-tight mb-4">
            Flats &amp; Luxury <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">Properties</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Discover thoughtfully engineered 1, 2, 3 &amp; 4 BHK apartments and independent villas situated in prime, fast-appreciating neighborhoods.
          </p>
        </div>

        {/* Filter Pills with Glassmorphism */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key;
            return (
              <button
                key={option.key}
                onClick={() => setActiveFilter(option.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105 border border-slate-700'
                    : 'glass-pill text-slate-700 hover:text-amber-700 hover:bg-white/90'
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-amber-500 text-slate-950 font-mono' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Flats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlats.map((flat) => {
            const badge = getCategoryBadge(flat.category);
            const isFav = favorites[flat._id];

            return (
              <div
                key={flat._id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col group"
              >
                {/* Image & Price Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={flat.image}
                    alt={flat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(flat._id, e)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart className={`h-4 w-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Price Tag in Bottom Left */}
                  <div className="absolute bottom-3 left-4">
                    <div className="text-xl sm:text-2xl font-extrabold font-serif text-white tracking-tight drop-shadow-md">
                      {formatCurrency(flat.price)}
                    </div>
                  </div>
                </div>

                {/* Flat Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {flat.title}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 mb-4">
                      <MapPin className="h-3.5 w-3.5 text-amber-600 mr-1.5 flex-shrink-0" />
                      <span className="truncate">{flat.location}</span>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-slate-50 border border-slate-100 text-center mb-4">
                      <div>
                        <Bed className="h-4 w-4 mx-auto mb-1 text-slate-600" />
                        <span className="text-xs font-bold text-slate-900">{flat.bedrooms}</span>
                        <span className="text-[10px] text-slate-500 block">BHK</span>
                      </div>
                      <div>
                        <Bath className="h-4 w-4 mx-auto mb-1 text-slate-600" />
                        <span className="text-xs font-bold text-slate-900">{flat.bathrooms}</span>
                        <span className="text-[10px] text-slate-500 block">Baths</span>
                      </div>
                      <div>
                        <Square className="h-4 w-4 mx-auto mb-1 text-slate-600" />
                        <span className="text-xs font-bold text-slate-900 font-mono">{flat.area}</span>
                        <span className="text-[10px] text-slate-500 block">sq ft</span>
                      </div>
                    </div>

                    {/* Features list pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {flat.features.slice(0, 3).map((feat: string, idx: number) => (
                        <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          &bull; {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex gap-2.5">
                    <button
                      onClick={() => setSelectedFlatForDetails(flat)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => setSelectedFlatForEnquiry(flat)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 transition-all text-center shadow-md shadow-amber-500/20"
                    >
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFlats.length === 0 && (
          <div className="text-center py-16 glass-card rounded-3xl max-w-md mx-auto">
            <div className="text-5xl mb-3">🏢</div>
            <h4 className="text-lg font-bold text-slate-800">No Properties Found</h4>
            <p className="text-xs text-slate-500 mt-1">Please check another filter or submit a custom flat requirement.</p>
          </div>
        )}
      </div>

      {/* Property Details Lightbox Modal */}
      {selectedFlatForDetails && (
        <PropertyDetailModal
          flat={selectedFlatForDetails}
          onClose={() => setSelectedFlatForDetails(null)}
          onEnquire={(flat) => {
            setSelectedFlatForDetails(null);
            setSelectedFlatForEnquiry(flat);
          }}
        />
      )}

      {/* Property Enquiry Form Modal */}
      {selectedFlatForEnquiry && (
        <PropertyEnquiryModal
          flat={selectedFlatForEnquiry}
          onClose={() => setSelectedFlatForEnquiry(null)}
        />
      )}
    </section>
  );
};

/* Component: Property Detail Modal with Gallery */
interface DetailModalProps {
  flat: any;
  onClose: () => void;
  onEnquire: (flat: any) => void;
}

const PropertyDetailModal: React.FC<DetailModalProps> = ({ flat, onClose, onEnquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const gallery = flat.imageGallery && flat.imageGallery.length > 0 ? flat.imageGallery : [flat.image];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-panel-dark rounded-3xl max-w-4xl w-full border border-white/20 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">{flat.title}</h3>
            <div className="flex items-center text-xs text-slate-300 mt-0.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400 mr-1" />
              <span>{flat.location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 grid lg:grid-cols-12 gap-8 text-white">
          {/* Gallery View Column */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black">
              <img
                src={gallery[activeImageIndex]}
                alt="Property gallery"
                className="w-full h-full object-cover"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white">
                {activeImageIndex + 1} / {gallery.length} Photos
              </div>
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gallery.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      i === activeImageIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs & Description Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">All-Inclusive Price</span>
                <div className="text-3xl font-extrabold font-serif text-amber-400 mt-0.5">
                  {formatCurrency(flat.price)}
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-center text-xs">
                <div className="p-2">
                  <Bed className="h-4 w-4 mx-auto mb-1 text-amber-400" />
                  <div className="font-bold text-white">{flat.bedrooms} BHK</div>
                  <div className="text-[10px] text-slate-400">Bedrooms</div>
                </div>
                <div className="p-2">
                  <Bath className="h-4 w-4 mx-auto mb-1 text-amber-400" />
                  <div className="font-bold text-white">{flat.bathrooms}</div>
                  <div className="text-[10px] text-slate-400">Bathrooms</div>
                </div>
                <div className="p-2">
                  <Square className="h-4 w-4 mx-auto mb-1 text-amber-400" />
                  <div className="font-bold text-white font-mono">{flat.area}</div>
                  <div className="text-[10px] text-slate-400">Carpet Sqft</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Description</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {flat.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Key Amenities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {flat.features.map((feat: string, index: number) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/10 border border-white/10 text-slate-200"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => onEnquire(flat)}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Free Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Component: Property Enquiry Modal */
interface EnquiryModalProps {
  flat: any;
  onClose: () => void;
}

const PropertyEnquiryModal: React.FC<EnquiryModalProps> = ({ flat, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello, I am interested in scheduling a site inspection for ${flat?.title}. Please share the detailed brochure and floor plan.`
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      property: flat?.title || 'General Property',
      type: 'flat',
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/enquiry/getData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        setErrorMsg(data.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Failed to connect to the backend server. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-panel-dark rounded-3xl max-w-md w-full border border-white/20 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-300 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-2xl font-bold font-serif mb-2">Visit Scheduled!</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Thank you {formData.name}. Our property advisor will contact you within 2 hours to confirm your site visit slot.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Direct Developer Booking</span>
              <h3 className="text-2xl font-bold font-serif mt-1">Book a Site Visit</h3>
              <p className="text-xs text-slate-300 mt-1">
                Property: <span className="font-semibold text-white">{flat?.title}</span> ({formatCurrency(flat?.price)})
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Questions</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                <span>{submitting ? 'Submitting Enquiry...' : 'Confirm Site Visit'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlatsSection;
