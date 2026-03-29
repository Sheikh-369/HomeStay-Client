// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Room {
  id: string;
  type: string;
  floor: string;
  capacity: number;
  occupied: boolean;
  rent: string;
  amenities: string[];
}

export interface SiteSettings {
  propertyName: string;
  phone: string;
  email: string;
  address: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const mockBookings: Booking[] = [
  { id: 'BK001', name: 'Priya Sharma', room: 'Room 101 — Single AC', checkIn: '2026-04-01', checkOut: '2026-06-30', status: 'Confirmed', amount: '₹12,000/mo' },
  { id: 'BK002', name: 'Rahul Verma', room: 'Room 204 — Double Sharing', checkIn: '2026-04-15', checkOut: '2026-07-14', status: 'Pending', amount: '₹7,500/mo' },
  { id: 'BK003', name: 'Ananya Iyer', room: 'Room 305 — Triple Sharing', checkIn: '2026-03-01', checkOut: '2026-05-31', status: 'Active', amount: '₹5,500/mo' },
  { id: 'BK004', name: 'Karan Mehta', room: 'Room 102 — Single Non-AC', checkIn: '2026-02-01', checkOut: '2026-04-30', status: 'Cancelled', amount: '₹8,000/mo' },
  { id: 'BK005', name: 'Sneha Patel', room: 'Room 203 — Double Sharing', checkIn: '2026-05-01', checkOut: '2026-07-31', status: 'Confirmed', amount: '₹7,500/mo' },
];

export const mockMessages: Message[] = [
  { id: 'MSG001', name: 'Deepak Nair', email: 'deepak@email.com', subject: 'Availability for May', message: 'Hi, I wanted to know if there are any single AC rooms available from May 1st. Please let me know the process.', date: '2026-03-27', read: false },
  { id: 'MSG002', name: 'Meera Joshi', email: 'meera.j@email.com', subject: 'Food menu inquiry', message: 'Could you share the weekly meal plan? I am a vegetarian and want to confirm before booking.', date: '2026-03-26', read: false },
  { id: 'MSG003', name: 'Arjun Singh', email: 'arjun.s@email.com', subject: 'Parking facility', message: 'Do you have parking space for a two-wheeler? I will be bringing my bike.', date: '2026-03-25', read: true },
  { id: 'MSG004', name: 'Pooja Reddy', email: 'pooja.r@email.com', subject: 'Early check-in request', message: 'My booking starts April 15 but I may arrive on April 14 evening. Is early check-in possible?', date: '2026-03-24', read: true },
];

export const mockRooms: Room[] = [
  { id: 'R101', type: 'Single AC', floor: '1st', capacity: 1, occupied: true, rent: '₹12,000/mo', amenities: ['AC', 'Attached Bath', 'WiFi'] },
  { id: 'R102', type: 'Single Non-AC', floor: '1st', capacity: 1, occupied: false, rent: '₹8,000/mo', amenities: ['Fan', 'Attached Bath', 'WiFi'] },
  { id: 'R201', type: 'Double Sharing', floor: '2nd', capacity: 2, occupied: true, rent: '₹7,500/mo', amenities: ['AC', 'Common Bath', 'WiFi'] },
  { id: 'R203', type: 'Double Sharing', floor: '2nd', capacity: 2, occupied: false, rent: '₹7,500/mo', amenities: ['AC', 'Common Bath', 'WiFi'] },
  { id: 'R301', type: 'Triple Sharing', floor: '3rd', capacity: 3, occupied: true, rent: '₹5,500/mo', amenities: ['Fan', 'Common Bath', 'WiFi'] },
  { id: 'R305', type: 'Triple Sharing', floor: '3rd', capacity: 3, occupied: true, rent: '₹5,500/mo', amenities: ['Fan', 'Common Bath', 'WiFi'] },
];

export const defaultSettings: SiteSettings = {
  propertyName: 'PGStay',
  phone: '+91-98765-43210',
  email: 'admin@pgstay.com',
  address: '123, PG Lane, Koramangala, Bengaluru — 560034',
};
