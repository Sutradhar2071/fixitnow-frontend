export type Role = 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'BANNED';
export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio?: string;
  skills: string[];
  experience: number;
  location?: string;
  avgRating: number;
  user?: { id: string; name: string; email: string; phone?: string };
  services?: Service[];
  availability?: Availability[];
  reviews?: Review[];
}

export interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  title: string;
  description?: string;
  price: number;
  categoryId: string;
  category?: Category;
  technicianId: string;
  technician?: TechnicianProfile;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  status: BookingStatus;
  notes?: string;
  service?: Service;
  technician?: TechnicianProfile;
  customer?: { id: string; name: string; phone?: string; email?: string };
  payment?: Payment;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  transactionId: string;
  amount: number;
  provider: string;
  status: PaymentStatus;
  paidAt?: string;
  booking?: Booking;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string;
  customer?: { name: string };
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errorDetails: unknown;
}