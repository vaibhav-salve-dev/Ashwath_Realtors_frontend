export const BACKEND_URL = 'http://localhost:5100';

/**
 * Resolves an image path from backend or external URL
 */
export const getImageUrl = (imagePath?: string, fallbackType: 'project' | 'flat' | 'general' = 'general'): string => {
  const fallbacks = {
    project: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    flat: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
    general: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1200'
  };

  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return fallbacks[fallbackType];
  }

  const cleaned = imagePath.trim();
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }

  // Direct frontend assets (e.g. /assets/anandvilla.png or assets/logo.png)
  if (cleaned.startsWith('/assets/') || cleaned.startsWith('assets/')) {
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  }

  // If path starts with /uploads, prepend backend URL
  if (cleaned.startsWith('/uploads')) {
    return `${BACKEND_URL}${cleaned}`;
  }

  // Otherwise assume it's just a filename in /uploads/
  return `${BACKEND_URL}/uploads/${cleaned}`;
};

/**
 * Format currency in Indian format (Lakhs / Crores) or standard
 */
export const formatCurrency = (val: number | string | undefined): string => {
  if (val === undefined || val === null || val === '') return 'Price on Request';
  const num = Number(val);
  if (isNaN(num) || num <= 0) return 'Price on Request';

  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2);
    return `₹ ${cr.replace(/\.00$/, '')} Cr`;
  }
  if (num >= 100000) {
    const lk = (num / 100000).toFixed(2);
    return `₹ ${lk.replace(/\.00$/, '')} Lakh`;
  }
  return `₹ ${num.toLocaleString('en-IN')}`;
};

/**
 * Normalize project object fields (handles both Title/title, Image/image etc.)
 */
export const normalizeProject = (p: any) => {
  const title = p.Title || p.title || 'Untitled Project';

  const defaultLocations: Record<string, { location: string; detail: string }> = {
    'anandvilla': { location: 'Andheri East, Mumbai', detail: 'Redevelopment · Commercial & Residential · MahaRERA PR1180002501890' },
    'chaitanya': { location: 'Kasarwadi, Pune', detail: 'Ongoing development' },
    'chaitanya apartments': { location: 'Kasarwadi, Pune', detail: 'Ongoing development' },
    'navkshitij': { location: 'Kothrud, Pune', detail: '2 & 3 BHK Homes' },
    'pooja apartment': { location: 'Erandwane, Pune', detail: '2 & 3 BHK Homes · MahaRERA P52100032378' },
    'charisma': { location: 'D’Souza Colony, Nashik', detail: 'Commercial & Residential · Off College Road' },
    'vijayashree': { location: 'Karve Road, Pune', detail: 'Commercial & Residential' },
  };

  const key = title.toLowerCase().trim();
  const matched = defaultLocations[key] || {
    location: p.Location || p.location || 'Pune / Mumbai, Maharashtra',
    detail: p.Detail || p.detail || '',
  };

  return {
    _id: p._id || String(p.id || ''),
    id: p._id || p.id,
    title,
    category: (p.Category || p.category || 'residential').toLowerCase(),
    status: (p.Status || p.status || 'in-progress').toLowerCase(),
    image: getImageUrl(p.Image || p.image, 'project'),
    description: p.Description || p.description || 'Modern construction project built with uncompromising quality and sustainable materials.',
    year: p.Year || p.year || new Date().getFullYear(),
    duration: p.Duration || p.duration || '12-18 months',
    location: matched.location,
    detail: matched.detail,
  };
};

/**
 * Normalize flat object fields
 */
export const normalizeFlat = (f: any) => {
  const mainImage = getImageUrl(f.image, 'flat');
  const rawGallery = Array.isArray(f.imageGallery) && f.imageGallery.length > 0 ? f.imageGallery : [];
  const gallery = rawGallery.map((img: string) => getImageUrl(img, 'flat'));
  if (gallery.length === 0) {
    gallery.push(mainImage);
  }

  return {
    _id: f._id || String(f.id || ''),
    id: f._id || f.id,
    title: f.title || 'Luxury Modern Apartment',
    category: (f.category || 'available').toLowerCase(),
    price: Number(f.price) || 0,
    location: f.location || 'Prime Location',
    bedrooms: Number(f.bedrooms) || 2,
    bathrooms: Number(f.bathrooms) || 2,
    area: Number(f.area) || 1200,
    description: f.description || 'Premium modern property designed for comfortable, contemporary urban living with scenic surroundings.',
    features: Array.isArray(f.features) && f.features.length > 0 
      ? f.features 
      : ['24/7 Security', 'Covered Parking', 'Power Backup', 'Landscaped Garden'],
    image: mainImage,
    imageGallery: gallery,
  };
};

