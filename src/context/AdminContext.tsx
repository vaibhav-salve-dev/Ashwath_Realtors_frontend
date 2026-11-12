import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Persistence helpers ---
function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}
function saveLS<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}


interface AdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  projects: any[];
  flats: any[];
  enquiries: any[];
  addProject: (project: any) => void;
  updateProject: (id: number, project: any) => void;
  deleteProject: (id: number) => void;
  addFlat: (flat: any) => void;
  updateFlat: (id: number, flat: any) => void;
  deleteFlat: (id: number) => void;
  addEnquiry: (enquiry: any) => void;
  updateEnquiryStatus: (id: number, status: string) => void;
  stats: {
    totalProjects: number;
    completedProjects: number;
    availableFlats: number;
    totalEnquiries: number;
  };
  recentActivity: any[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>(() => loadLS<any[]>('projects', [
    {
      id: 1,
      title: 'Luxury Waterfront Estate',
      category: 'residential',
      status: 'completed',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'A stunning 6-bedroom waterfront estate',
      year: '2023',
      duration: '18 months'
    },
    {
      id: 2,
      title: 'Downtown Office Complex',
      category: 'commercial',
      status: 'completed',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Modern 15-story office building',
      year: '2023',
      duration: '24 months'
    }
  ]));

  const [flats, setFlats] = useState<any[]>(() => {
    const defaultFlats = [
      {
        id: 1,
        title: 'Modern Downtown Apartment',
        location: 'Downtown District',
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        price: 7500000,
        category: 'available',
        description: 'This beautiful 3BHK apartment offers a perfect blend of modern architecture and comfortable living. Located in a prime area, it provides easy access to schools, hospitals, and shopping centers. The spacious living room and bedrooms are designed to offer maximum comfort and natural light.',
        features: ['Modular Kitchen', 'Wardrobes in all rooms', '24/7 Power Backup', 'Gated Community', 'Swimming Pool', 'Gymnasium'],
        imageGallery: [
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
      },
      {
        id: 2,
        title: 'Cozy 2BHK Garden Flat',
        location: 'Greenwood Society, Pune',
        image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        price: 5500000,
        category: 'sold',
        description: 'A cozy 2BHK flat with a beautiful private garden. Perfect for small families or couples looking for a peaceful and green environment. The society has all modern amenities and is well-connected to the city.',
        features: ['Private Garden', 'Vastu Compliant', 'Children\'s Play Area', 'Clubhouse', '24/7 Security'],
        imageGallery: [
          'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
      },
      {
        id: 3,
        title: 'Luxury Penthouse',
        location: 'Skyline Towers, Mumbai',
        image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        bedrooms: 4,
        bathrooms: 5,
        area: 3500,
        price: 25000000,
        category: 'available',
        description: 'Experience luxury living in this stunning 4BHK penthouse. With panoramic city views, a private terrace, and world-class amenities, this property is the epitome of elegance and style. Located in the heart of Mumbai.',
        features: ['Private Terrace', 'Jacuzzi', 'Home Theatre', 'Concierge Service', 'Rooftop Pool'],
        imageGallery: [
          'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
      },
      {
        id: 4,
        title: 'Upcoming 1BHK Studio',
        location: 'Tech Park Avenue, Bangalore',
        image: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        bedrooms: 1,
        bathrooms: 1,
        area: 800,
        price: 4000000,
        category: 'upcoming',
        description: 'A modern 1BHK studio apartment in the heart of the IT hub. Designed for young professionals, this property offers a smart and compact living space with all necessary amenities. Pre-booking is now open.',
        features: ['Smart Home Automation', 'Coworking Space', 'Gym', 'Cafeteria', 'Close to Metro'],
        imageGallery: [
          'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
      }
    ];

    const loadedFlats = loadLS<any[]>('flats', defaultFlats);
    
    const migratedFlats = loadedFlats.map(flat => ({
      ...flat,
      description: flat.description || 'No description available.',
      features: flat.features || [],
      imageGallery: flat.imageGallery && flat.imageGallery.length > 0 ? flat.imageGallery : [flat.image]
    }));

    return migratedFlats;
  });

  const [enquiries, setEnquiries] = useState<any[]>(() => loadLS<any[]>('enquiries', [
    {
      id: 1,
      type: 'contact',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1234567890',
      subject: 'Project Quote',
      message: 'Interested in residential construction project',
      date: '2024-01-15',
      status: 'new'
    },
    {
      id: 2,
      type: 'flat',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1234567891',
      property: 'Modern Downtown Apartment',
      message: 'Would like to schedule a viewing',
      date: '2024-01-14',
      status: 'replied'
    }
  ]));

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'enquiry', message: 'New contact enquiry from John Smith', time: '2 hours ago' },
    { id: 2, type: 'project', message: 'Project "Downtown Office Complex" marked as completed', time: '1 day ago' },
    { id: 3, type: 'flat', message: 'New flat enquiry for Modern Downtown Apartment', time: '2 days ago' },
    { id: 4, type: 'project', message: 'New project "Eco Homes" added to portfolio', time: '3 days ago' }
  ]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedAuth = localStorage.getItem('adminAuthenticated');
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Could not parse auth status from localStorage", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && (password === 'Ashwath@2024' || password === 'admin123')) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const addProject = (project: any) => {
    const newProject = {
      ...project,
      id: (projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1)
    };
    setProjects(prev => [...prev, newProject]);
    setRecentActivity(prev => [
      { id: Date.now(), type: 'project', message: `New project "${project.title}" added`, time: 'Just now' },
      ...prev
    ]);
  };

  const updateProject = (id: number, updatedProject: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };

  const deleteProject = (id: number) => {
    const project = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    if (project) {
      setRecentActivity(prev => [
        { id: Date.now(), type: 'project', message: `Project "${project.title}" removed`, time: 'Just now' },
        ...prev
      ]);
    }
  };

  const addFlat = (flat: any) => {
    const newFlat = {
      ...flat,
      id: (flats.length ? Math.max(...flats.map(f => f.id)) + 1 : 1)
    };
    setFlats(prev => [...prev, newFlat]);
    setRecentActivity(prev => [
      { id: Date.now(), type: 'flat', message: `New flat "${flat.title}" added`, time: 'Just now' },
      ...prev
    ]);
  };

  const updateFlat = (id: number, updatedFlat: any) => {
    setFlats(prev => prev.map(f => f.id === id ? { ...f, ...updatedFlat } : f));
  };

  const deleteFlat = (id: number) => {
    const flat = flats.find(f => f.id === id);
    setFlats(prev => prev.filter(f => f.id !== id));
    if (flat) {
      setRecentActivity(prev => [
        { id: Date.now(), type: 'flat', message: `Flat "${flat.title}" removed`, time: 'Just now' },
        ...prev
      ]);
    }
  };

  const addEnquiry = (enquiry: any) => {
    const newEnquiry = {
      ...enquiry,
      id: (enquiries.length > 0 ? Math.max(...enquiries.map(e => e.id)) + 1 : 1),
    };
    setEnquiries(prev => [...prev, newEnquiry]);
  };

  const updateEnquiryStatus = (id: number, status: string) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    availableFlats: flats.filter(f => f.category === 'available').length,
    totalEnquiries: enquiries.length
  };


  // Persist to localStorage when data changes
  useEffect(() => saveLS('projects', projects), [projects]);
  useEffect(() => saveLS('flats', flats), [flats]);
  useEffect(() => saveLS('enquiries', enquiries), [enquiries]);

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    projects,
    flats,
    enquiries,
    addProject,
    updateProject,
    deleteProject,
    addFlat,
    updateFlat,
    deleteFlat,
    addEnquiry,
    updateEnquiryStatus,
    stats,
    recentActivity
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};