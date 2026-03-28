
import Header from '@/src/components/header';
import BookingFormPage from './components/BookingFormPage';
import { WebPage, HowTo } from 'schema-dts';
import Footer from '@/src/components/footer';

const webPageSchema: WebPage = {
  '@type': 'WebPage',
  name: 'Book a Seat — PGStay',
  description: 'Book your PG seat at PGStay online. Fill in personal, identity, and stay details to reserve your room.',
  url: 'http://localhost:3000/book-a-seat',
};

const howToSchema: HowTo = {
  '@type': 'HowTo',
  name: 'How to book a PG seat at PGStay',
  step: [
    { '@type': 'HowToStep', name: 'Fill personal information', text: 'Enter your full name, phone, email, and address.' },
    { '@type': 'HowToStep', name: 'Provide emergency contact', text: 'Add an emergency contact name and phone number.' },
    { '@type': 'HowToStep', name: 'Upload identity document', text: 'Select ID type and upload your ID document.' },
    { '@type': 'HowToStep', name: 'Choose stay details', text: 'Pick entry/exit dates, room preference, and purpose of stay.' },
    { '@type': 'HowToStep', name: 'Submit booking', text: 'Agree to terms and submit the booking form.' },
  ],
};

export default function BookASeatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ '@context': 'https://schema.org', ...webPageSchema }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ '@context': 'https://schema.org', ...howToSchema }),
        }}
      />
      <Header />
      <main id="main-content">
        <BookingFormPage />
      </main>
      <Footer />
    </>
  );
}