export enum Status{
    IDLE="idle",
    ERROR="error",
    LOADING="loading",
    SUCCESS="success"
}

export enum IdType {
  CITIZENSHIP = "citizenship",
  PASSPORT = "passport",
  LICENSE = "license",
  NATIONAL_ID = "national-id",
}

export enum RoomPreference {
  SINGLE = "single",
  DOUBLE_SHARING = "double-sharing",
  TRIPLE_SHARING = "triple-sharing",
}

export enum PurposeOfStay {
  STUDENT = "student",
  JOB = "job",
  OTHER = "other",
  ABROAD_PROCESSING = "abroad-processing",
}

export enum PaymentStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}