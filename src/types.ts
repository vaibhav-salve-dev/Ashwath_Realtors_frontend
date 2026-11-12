export interface Flat {
  _id?: string;
  id?: number | string;
  title: string;
  category: 'available' | 'sold' | 'upcoming' | string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  features?: string[];
  image?: string;
  imageGallery?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id?: string;
  id?: number | string;
  Title?: string;
  title?: string;
  Category?: string;
  category?: string;
  Status?: string;
  status?: string;
  Year?: number | string;
  year?: number | string;
  Duration?: string;
  duration?: string;
  Image?: string;
  image?: string;
  Description?: string;
  description?: string;
}

export interface CompanyDetails {
  _id?: string;
  name?: string;
  founded?: number | string;
  description?: string;
  mission?: string;
  vision?: string;
  address?: string;
  phone?: string;
  email?: string;
  totalProjects?: string | number;
  yearsExperience?: string | number;
  teamMembers?: string | number;
  clientSatisfaction?: number | string;
  website?: string;
}

export interface ContactEnquiry {
  _id?: string;
  Name?: string;
  Phone?: string;
  Email?: string;
  Subject?: string;
  Message?: string;
  Date?: string;
  Status?: string;
}

export interface PropertyEnquiry {
  _id?: string;
  Name?: string;
  Email?: string;
  Phone?: string;
  Property?: string;
  Type?: string;
  Message?: string;
  Date?: string;
  Status?: string;
}
