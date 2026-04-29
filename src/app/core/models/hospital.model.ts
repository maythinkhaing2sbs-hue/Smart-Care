export interface Hospital {
  id: string;
  name: string;
  location: string;
  country: string;
  city: string;
  image: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  specialties: string[];
  description: string;
  facilities: string[];
  doctors: Doctor[];
  about: string;
  // Contact & metadata
  address: string;
  phone: string;
  email: string;
  website?: string;
  established: number;
  bedCount: number;
  accreditation?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  avatar: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Booking {
  id: string;
  hospitalId: string;
  hospitalName: string;
  hospitalImage: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  bookingNumber: string;
}

export interface ConsultationSession {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface TripPlan {
  id: string;
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  hotel?: string;
  flightNumber?: string;
  flightTime?: string;
  vehicle?: string;
  itinerary: ItineraryItem[];
}

export interface ItineraryItem {
  day: number;
  date: string;
  title: string;
  description: string;
  type: 'arrival' | 'visit' | 'treatment' | 'recovery' | 'departure';
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc';
  size: string;
  uploadedAt: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  showConsultButton?: boolean;
}
