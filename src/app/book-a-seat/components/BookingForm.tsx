'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormSection from './FormSection';
import FormField from './FormField';

// TypeScript interfaces
interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

interface EmergencyContact {
  emergencyName: string;
  emergencyPhone: string;
}

interface IdentityDetails {
  idType: 'citizenship' | 'passport' | 'license' | '';
  idNumber: string;
  idDocument: FileList | null;
}

interface StayDetails {
  entryDate: string;
  exitDate: string;
  roomPreference: 'single' | 'double-sharing' | 'triple-sharing' | '';
  numberOfOccupants: string;
  purposeOfStay: 'student' | 'job' | 'other' | '';
}

interface AdditionalInfo {
  message: string;
  agreeToTerms: boolean;
}

type BookingFormData = PersonalInfo &
  EmergencyContact &
  IdentityDetails &
  StayDetails &
  AdditionalInfo;

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      emergencyName: '',
      emergencyPhone: '',
      idType: '',
      idNumber: '',
      idDocument: null,
      entryDate: '',
      exitDate: '',
      roomPreference: '',
      numberOfOccupants: '',
      purposeOfStay: '',
      message: '',
      agreeToTerms: false,
    },
  });

  const entryDateValue = watch('entryDate');

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('PGStay Booking Submission:', {
      personalInfo: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
      },
      emergencyContact: {
        name: data.emergencyName,
        phone: data.emergencyPhone,
      },
      identityDetails: {
        idType: data.idType,
        idNumber: data.idNumber,
        idDocumentName: data.idDocument?.[0]?.name || null,
      },
      stayDetails: {
        entryDate: data.entryDate,
        exitDate: data.exitDate,
        roomPreference: data.roomPreference,
        numberOfOccupants: data.numberOfOccupants,
        purposeOfStay: data.purposeOfStay,
      },
      additionalInfo: {
        message: data.message,
        agreeToTerms: data.agreeToTerms,
      },
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    reset();
    setFileName('');
  };

  if (submitted) {
    return (
      <div className="bg-white border border-primary/8 rounded-4xl p-10 md:p-14 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-bold text-primary mb-3">Booking Received!</h2>
        <p className="text-primary/60 text-base leading-relaxed max-w-sm mx-auto mb-8">
          Thank you for choosing PGStay. Our team will call you within 2 business hours to confirm your seat.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-7 py-3 bg-primary text-cream rounded-full text-sm font-bold hover:bg-accent transition-all duration-300"
          aria-label="Submit another booking"
        >
          Submit Another Booking
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-primary/8 rounded-4xl overflow-hidden shadow-sm"
      noValidate
      aria-label="PGStay seat booking form"
    >
      {/* ── Section 1: Personal Info ── */}
      <FormSection
        number="01"
        title="Personal Information"
        description="Your primary contact details for booking confirmation."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Full Name"
            htmlFor="fullName"
            required
            error={errors.fullName?.message}
            className="sm:col-span-2"
          >
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              placeholder="Priya Nair"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
                },
              })}
            />
          </FormField>

          <FormField
            label="Phone Number"
            htmlFor="phone"
            required
            error={errors.phone?.message}
          >
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+91 98765 43210"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[\d\s\-()]{8,15}$/,
                  message: 'Enter a valid phone number',
                },
              })}
            />
          </FormField>

          <FormField
            label="Email Address"
            htmlFor="email"
            required
            error={errors.email?.message}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="priya@example.com"
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </FormField>

          <FormField
            label="Current Address"
            htmlFor="address"
            required
            error={errors.address?.message}
            className="sm:col-span-2"
          >
            <textarea
              id="address"
              rows={3}
              autoComplete="street-address"
              aria-required="true"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? 'address-error' : undefined}
              className={`form-input resize-none ${errors.address ? 'error' : ''}`}
              placeholder="Flat No, Street, City, State, PIN"
              {...register('address', {
                required: 'Current address is required',
                minLength: { value: 10, message: 'Please enter your complete address' },
              })}
            />
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 2: Emergency Contact ── */}
      <FormSection
        number="02"
        title="Emergency Contact"
        description="Someone we can reach in case of emergencies."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Contact Name"
            htmlFor="emergencyName"
            error={errors.emergencyName?.message}
          >
            <input
              id="emergencyName"
              type="text"
              autoComplete="off"
              aria-invalid={!!errors.emergencyName}
              className={`form-input ${errors.emergencyName ? 'error' : ''}`}
              placeholder="Rajan Nair"
              {...register('emergencyName', {
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />
          </FormField>

          <FormField
            label="Contact Phone"
            htmlFor="emergencyPhone"
            error={errors.emergencyPhone?.message}
          >
            <input
              id="emergencyPhone"
              type="tel"
              autoComplete="off"
              aria-invalid={!!errors.emergencyPhone}
              className={`form-input ${errors.emergencyPhone ? 'error' : ''}`}
              placeholder="+91 91234 56789"
              {...register('emergencyPhone', {
                pattern: {
                  value: /^[+]?[\d\s\-()]{8,15}$/,
                  message: 'Enter a valid phone number',
                },
              })}
            />
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 3: Identity Details ── */}
      <FormSection
        number="03"
        title="Identity Details"
        description="Required for verification. Your data is stored securely."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="ID Type"
            htmlFor="idType"
            required
            error={errors.idType?.message}
            className='sm:col-span-2'
          >
            <select
              id="idType"
              aria-required="true"
              aria-invalid={!!errors.idType}
              aria-describedby={errors.idType ? 'idType-error' : undefined}
              className={`form-input ${errors.idType ? 'error' : ''}`}
              {...register('idType', {
                required: 'Please select an ID type',
                validate: (v) => v !== '' || 'Please select an ID type',
              })}
            >
              <option value="">Select ID type</option>
              <option value="citizenship">Citizenship Certificate</option>
              <option value="passport">Passport</option>
              <option value="license">Driving License</option>
            </select>
          </FormField>         

          <FormField
            label="Upload ID Document"
            htmlFor="idDocument"
            required
            error={errors.idDocument?.message}
            className="sm:col-span-2"
          >
            <div className="relative">
              <input
                id="idDocument"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                aria-required="true"
                aria-describedby="idDocument-hint"
                className="sr-only"
                {...register('idDocument', {
                  required: 'Please upload your ID document',
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    setFileName(file ? file.name : '');
                  },
                })}
              />
              <label
                htmlFor="idDocument"
                className={`flex items-center justify-between w-full px-4 py-3 bg-cream border-2 border-dashed rounded-xl cursor-pointer hover:border-accent transition-colors ${
                  errors.idDocument ? 'border-red-400' : 'border-primary/15'
                }`}
              >
                <span className="text-sm text-primary/50">
                  {fileName || 'Click to upload PDF, JPG, or PNG'}
                </span>
                <span className="px-3 py-1 bg-primary text-cream rounded-lg text-xs font-bold flex-shrink-0 ml-3">
                  Browse
                </span>
              </label>
              <p id="idDocument-hint" className="text-xs text-primary/40 mt-1.5">
                Max file size: 5 MB. Accepted: PDF, JPG, PNG
              </p>
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 4: Stay Details ── */}
      <FormSection
        number="04"
        title="Stay Details"
        description="Tell us when you're arriving and what you're looking for."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Entry Date"
            htmlFor="entryDate"
            required
            error={errors.entryDate?.message}
          >
            <input
              id="entryDate"
              type="date"
              aria-required="true"
              aria-invalid={!!errors.entryDate}
              aria-describedby={errors.entryDate ? 'entryDate-error' : undefined}
              className={`form-input ${errors.entryDate ? 'error' : ''}`}
              {...register('entryDate', {
                required: 'Entry date is required',
                validate: (v) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return new Date(v) >= today || 'Entry date cannot be in the past';
                },
              })}
            />
          </FormField>

          <FormField
            label="Exit Date"
            htmlFor="exitDate"
            required
            error={errors.exitDate?.message}
          >
            <input
              id="exitDate"
              type="date"
              aria-required="true"
              aria-invalid={!!errors.exitDate}
              aria-describedby={errors.exitDate ? 'exitDate-error' : undefined}
              className={`form-input ${errors.exitDate ? 'error' : ''}`}
              {...register('exitDate', {
                required: 'Exit date is required',
                validate: (v) => {
                  if (!entryDateValue) return true;
                  return new Date(v) > new Date(entryDateValue) || 'Exit date must be after entry date';
                },
              })}
            />
          </FormField>

          <FormField
            label="Room / Seat Preference"
            htmlFor="roomPreference"
            required
            error={errors.roomPreference?.message}
          >
            <select
              id="roomPreference"
              aria-required="true"
              aria-invalid={!!errors.roomPreference}
              aria-describedby={errors.roomPreference ? 'roomPreference-error' : undefined}
              className={`form-input ${errors.roomPreference ? 'error' : ''}`}
              {...register('roomPreference', {
                required: 'Please select a room preference',
                validate: (v) => v !== '' || 'Please select a room preference',
              })}
            >
              <option value="">Select room type</option>
              <option value="single">Single Room (1 occupant) — ₹9,500/mo</option>
              <option value="double-sharing">Double Sharing — ₹7,500/mo</option>
              <option value="triple-sharing">Triple Sharing — ₹6,000/mo</option>
            </select>
          </FormField>

          <FormField
            label="Number of Occupants"
            htmlFor="numberOfOccupants"
            required
            error={errors.numberOfOccupants?.message}
          >
            <select
              id="numberOfOccupants"
              aria-required="true"
              aria-invalid={!!errors.numberOfOccupants}
              className={`form-input ${errors.numberOfOccupants ? 'error' : ''}`}
              {...register('numberOfOccupants', {
                required: 'Please select number of occupants',
                validate: (v) => v !== '' || 'Please select number of occupants',
              })}
            >
              <option value="">Select number</option>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
            </select>
          </FormField>

          <FormField
            label="Purpose of Stay"
            htmlFor="purposeOfStay"
            required
            error={errors.purposeOfStay?.message}
            className="sm:col-span-2"
          >
            <div className="flex flex-wrap gap-3" role="group" aria-labelledby="purposeOfStay-label">
              {[
                { value: 'student', label: '🎓 Student' },
                { value: 'job', label: '💼 Working Professional' },
                { value: 'other', label: '✦ Other' },
              ].map((option) => {
                const isSelected = watch('purposeOfStay') === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/10 text-accent' :'border-primary/10 bg-cream text-primary/60 hover:border-primary/25'
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="sr-only"
                      {...register('purposeOfStay', { required: 'Please select purpose of stay' })}
                    />
                    <span className="text-sm font-semibold">{option.label}</span>
                  </label>
                );
              })}
            </div>
            {errors.purposeOfStay && (
              <p className="mt-1.5 text-xs text-red-500 font-medium" role="alert">
                {errors.purposeOfStay.message}
              </p>
            )}
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 5: Additional Info ── */}
      <FormSection
        number="05"
        title="Additional Information"
        description="Any special requests or notes for our team."
        isLast
      >
        <div className="space-y-5">
          <FormField
            label="Message / Special Requests"
            htmlFor="message"
            error={errors.message?.message}
          >
            <textarea
              id="message"
              rows={4}
              className={`form-input resize-none ${errors.message ? 'error' : ''}`}
              placeholder="Any dietary preferences, accessibility needs, or questions for our team..."
              {...register('message', {
                maxLength: { value: 500, message: 'Message cannot exceed 500 characters' },
              })}
            />
            <p className="text-xs text-primary/35 mt-1">
              {watch('message')?.length || 0}/500 characters
            </p>
          </FormField>

          {/* T&C Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <div className="relative mt-0.5">
              <input
                id="agreeToTerms"
                type="checkbox"
                aria-required="true"
                aria-invalid={!!errors.agreeToTerms}
                aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                className="sr-only"
                {...register('agreeToTerms', {
                  required: 'You must agree to the terms and conditions',
                })}
              />
              <label
                htmlFor="agreeToTerms"
                className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all ${
                  watch('agreeToTerms')
                    ? 'bg-accent border-accent'
                    : errors.agreeToTerms
                    ? 'border-red-400 bg-cream' :'border-primary/20 bg-cream hover:border-accent'
                }`}
                aria-hidden="true"
              >
                {watch('agreeToTerms') && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </label>
            </div>
            <div className="flex-1">
              <label htmlFor="agreeToTerms" className="text-sm text-primary/70 leading-relaxed cursor-pointer">
                I agree to PGStay's{' '}
                <a href="#" className="text-accent font-semibold hover:underline" tabIndex={0}>
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-accent font-semibold hover:underline" tabIndex={0}>
                  Privacy Policy
                </a>
                . I confirm that all information provided is accurate.
              </label>
              {errors.agreeToTerms && (
                <p id="agreeToTerms-error" className="mt-1 text-xs text-red-500 font-medium" role="alert">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-cream rounded-xl text-base font-bold hover:bg-accent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              aria-busy={isSubmitting}
              aria-label="Submit seat booking"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Submit Booking
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </FormSection>
    </form>
  );
}