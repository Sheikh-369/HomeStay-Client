// types/booking.ts
import { BookingStatus, IdType, PaymentStatus, PurposeOfStay, RoomPreference, Status } from "../../global/type";

// Booking Interface
export interface IBookingData {
  id?: string;

  // Personal Info
  fullName: string;
  phone: string;
  email: string;
  address: string;

  // Emergency Contact
  emergencyName?: string;
  emergencyPhone?: string;

  // Identity Details
  idType: IdType;
  idDocumentImage:File | string | null;

  // Stay Details
  entryDate: string;
  exitDate: string;
  roomPreference: RoomPreference;
  numberOfOccupants: number;
  purposeOfStay: PurposeOfStay;

  // Payment Details
  paymentProofImage:File | string | null;
  advanceAmount?: number;
  paymentStatus: PaymentStatus;

  // Booking Status
  bookingStatus: BookingStatus;

  // Additional Info
  message?: string;
  agreeToTerms: boolean;

  // Metadata
  submittedAt?: Date;
}

// Redux Slice State
export interface IBookingSliceState {
  bookingData: IBookingData[];
  status: Status;
}