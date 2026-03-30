'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import FormSection from './FormSection';
import FormField from './FormField';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { IBookingData } from '@/src/lib/store/booking/booking-slice-type';
import { BookingStatus, PaymentStatus, Status } from '@/src/lib/global/type';
import { createBooking } from '@/src/lib/store/booking/booking-slice';

export default function BookingForm() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.bookingSlice);
  
  const [submitted, setSubmitted] = useState(false);
  const [idFileName, setIdFileName] = useState<string>('');
  const [payFileName, setPayFileName] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IBookingData>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      emergencyName: '',
      emergencyPhone: '',
      idType: undefined,
      idDocumentImage: null,
      entryDate: '',
      exitDate: '',
      roomPreference: undefined,
      numberOfOccupants: 1,
      purposeOfStay: undefined,
      paymentProofImage: null,
      message: '',
      agreeToTerms: false,
      bookingStatus: BookingStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
    },
  });

  const entryDateValue = watch('entryDate');
  const isSubmitting = status === Status.LOADING;

  const onSubmit: SubmitHandler<IBookingData> = async (data) => {
    // Preparing the data for the multipart/form-data thunk
    const submissionData: IBookingData = {
      ...data,
      // Extracting actual File objects from FileList
      idDocumentImage: (data.idDocumentImage as unknown as FileList)?.[0] || null,
      paymentProofImage: (data.paymentProofImage as unknown as FileList)?.[0] || null,
      numberOfOccupants: Number(data.numberOfOccupants),
    };

    const result = await dispatch(createBooking(submissionData));

    if (result.success) {
      setSubmitted(true);
      reset();
      setIdFileName('');
      setPayFileName('');
    } else {
      alert(result.message || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-primary/8 rounded-4xl p-10 md:p-14 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-bold text-primary mb-3">Booking Received!</h2>
        <p className="text-primary/60 text-base leading-relaxed max-w-sm mx-auto mb-8">
          Your request is pending verification. We will review your ID and Payment Proof and contact you within 2 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-7 py-3 bg-primary text-cream rounded-full text-sm font-bold hover:bg-accent transition-all duration-300"
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
    >
      {/* ── Section 01: Personal Information ── */}
      <FormSection
        number="01"
        title="Personal Information"
        description="Your primary contact details for booking confirmation."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName?.message} className="sm:col-span-2">
            <input
              id="fullName"
              type="text"
              placeholder="Priya Nair"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              {...register('fullName', { required: 'Full name is required' })}
            />
          </FormField>

          <FormField label="Phone Number" htmlFor="phone" required error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              {...register('phone', { required: 'Phone number is required' })}
            />
          </FormField>

          <FormField label="Email Address" htmlFor="email" required error={errors.email?.message}>
            <input
              id="email"
              type="email"
              placeholder="priya@example.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
          </FormField>

          <FormField label="Current Address" htmlFor="address" required error={errors.address?.message} className="sm:col-span-2">
            <textarea
              id="address"
              rows={3}
              placeholder="Flat No, Street, City, State, PIN"
              className={`form-input resize-none ${errors.address ? 'error' : ''}`}
              {...register('address', { required: 'Address is required' })}
            />
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 02: Emergency Contact ── */}
      <FormSection
        number="02"
        title="Emergency Contact"
        description="Someone we can reach in case of emergencies."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Contact Name" htmlFor="emergencyName" error={errors.emergencyName?.message}>
            <input id="emergencyName" type="text" className="form-input" {...register('emergencyName')} />
          </FormField>
          <FormField label="Contact Phone" htmlFor="emergencyPhone" error={errors.emergencyPhone?.message}>
            <input id="emergencyPhone" type="tel" className="form-input" {...register('emergencyPhone')} />
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 03: Identity Details ── */}
      <FormSection
        number="03"
        title="Identity Details"
        description="Required for verification. Your data is stored securely."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="ID Type" htmlFor="idType" required error={errors.idType?.message}>
            <select id="idType" className="form-input" {...register('idType', { required: 'Select ID type' })}>
              <option value="">Select ID type</option>
              <option value="citizenship">Citizenship Certificate</option>
              <option value="passport">Passport</option>
              <option value="license">Driving License</option>
            </select>
          </FormField>

          <FormField label="Upload ID Document" htmlFor="idDocumentImage" required error={errors.idDocumentImage?.message} className="sm:col-span-2">
            <div className="relative">
              <input
                id="idDocumentImage"
                type="file"
                accept="image/*,.pdf"
                className="sr-only"
                {...register('idDocumentImage', { 
                  required: 'ID document is required',
                  onChange: (e) => setIdFileName(e.target.files?.[0]?.name || '')
                })}
              />
              <label htmlFor="idDocumentImage" className="flex items-center justify-between w-full px-4 py-3 bg-cream border-2 border-dashed rounded-xl cursor-pointer hover:border-accent transition-colors">
                <span className="text-sm text-primary/50 truncate max-w-[250px]">{idFileName || 'Click to upload ID Image'}</span>
                <span className="px-3 py-1 bg-primary text-cream rounded-lg text-xs font-bold">Browse</span>
              </label>
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 04: Stay Details ── */}
      <FormSection
        number="04"
        title="Stay Details"
        description="Tell us when you're arriving and your room preference."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Entry Date" htmlFor="entryDate" required error={errors.entryDate?.message}>
            <input id="entryDate" type="date" className="form-input" {...register('entryDate', { required: 'Required' })} />
          </FormField>

          <FormField label="Exit Date" htmlFor="exitDate" required error={errors.exitDate?.message}>
            <input 
              id="exitDate" 
              type="date" 
              className="form-input" 
              {...register('exitDate', { 
                required: 'Required',
                validate: (v) => !entryDateValue || new Date(v) > new Date(entryDateValue) || 'Must be after entry'
              })} 
            />
          </FormField>

          <FormField label="Room Preference" htmlFor="roomPreference" required error={errors.roomPreference?.message}>
            <select id="roomPreference" className="form-input" {...register('roomPreference', { required: 'Required' })}>
              <option value="">Select room type</option>
              <option value="single">Single Room</option>
              <option value="double-sharing">Double Sharing</option>
              <option value="triple-sharing">Triple Sharing</option>
            </select>
          </FormField>

          <FormField label="Number of Occupants" htmlFor="numberOfOccupants" required error={errors.numberOfOccupants?.message}>
            <select id="numberOfOccupants" className="form-input" {...register('numberOfOccupants', { required: 'Required' })}>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
            </select>
          </FormField>

          <FormField label="Purpose of Stay" htmlFor="purposeOfStay" required error={errors.purposeOfStay?.message} className="sm:col-span-2">
            <div className="flex flex-wrap gap-3">
              {['student', 'job', 'other'].map((val) => (
                <label key={val} className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${watch('purposeOfStay') === val ? 'border-accent bg-accent/10 text-accent' : 'border-primary/10 bg-cream text-primary/60'}`}>
                  <input type="radio" value={val} className="sr-only" {...register('purposeOfStay', { required: 'Select purpose' })} />
                  <span className="text-sm font-semibold capitalize">{val}</span>
                </label>
              ))}
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* ── Section 05: Additional Info & Payment ── */}
      <FormSection
        number="05"
        title="Payment & Finalize"
        description="Upload payment proof and confirm your booking."
        isLast
      >
        <div className="space-y-5">
          <FormField label="Upload Payment Proof" htmlFor="paymentProofImage" required error={errors.paymentProofImage?.message}>
            <div className="relative">
              <input
                id="paymentProofImage"
                type="file"
                accept="image/*"
                className="sr-only"
                {...register('paymentProofImage', { 
                  required: 'Payment proof is required',
                  onChange: (e) => setPayFileName(e.target.files?.[0]?.name || '')
                })}
              />
              <label htmlFor="paymentProofImage" className="flex items-center justify-between w-full px-4 py-3 bg-cream border-2 border-dashed rounded-xl cursor-pointer hover:border-accent">
                <span className="text-sm text-primary/50 truncate max-w-[250px]">{payFileName || 'Upload transaction screenshot'}</span>
                <span className="px-3 py-1 bg-accent text-white rounded-lg text-xs font-bold">Upload</span>
              </label>
            </div>
          </FormField>

          <FormField label="Special Requests" htmlFor="message">
            <textarea id="message" rows={3} className="form-input resize-none" placeholder="Any dietary needs or questions..." {...register('message')} />
          </FormField>

          <div className="flex items-start gap-3 pt-2">
            <input 
              id="agreeToTerms" 
              type="checkbox" 
              className="mt-1 w-4 h-4 accent-accent" 
              {...register('agreeToTerms', { required: 'You must agree to terms' })} 
            />
            <label htmlFor="agreeToTerms" className="text-xs text-primary/70 leading-relaxed">
              I agree to the Terms and Conditions and confirm that all provided information is accurate.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-cream rounded-xl text-base font-bold hover:bg-accent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Processing...' : 'Confirm & Submit Booking'}
          </button>
        </div>
      </FormSection>
    </form>
  );
}