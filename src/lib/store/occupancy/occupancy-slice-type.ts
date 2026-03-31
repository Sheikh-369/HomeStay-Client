import { BillingCycle, IdType, OccupancyStatus, Status } from "../../global/type";

// Occupancy Interface
export interface IOccupancyData {
  id?: string;

  // Guest Core Info (Transferred from Booking or Walk-in)
  fullName: string;
  phone: string;
  address: string;

  // Identity Details (Focusing on the image record)
  idType?: IdType; 
  idDocumentImage: File | string | null;

  // Room & Stay Details
  roomNumber: string;
  entryDate: string; // "YYYY-MM-DD"
  exitDate: string;  // This updates live to change the bill

  // Financial / Calculator Fields
  billingCycle: BillingCycle; // 'daily' | 'monthly'
  rateAmount: number;         // e.g., 10000
  totalPaid: number;          // Cumulative payments made
  securityDeposit?: number;   // Refundable amount

  // Status Management
  status: OccupancyStatus;    // 'active' | 'checked-out'

  // Metadata
  adminNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Redux Slice State
export interface IOccupancySliceState {
  occupancyData: IOccupancyData[];
  selectedOccupancy: IOccupancyData | null; // For the "Check-out Modal"
  status: Status;
}