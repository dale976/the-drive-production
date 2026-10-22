import { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { getEnquiryTour } from '../data/enquiries.js';
import TourPrice from '../components/tours/TourPrice.jsx';
import { trackEvent } from '../analytics.js';

const accessKey = 'b41dbf56-7093-4ec2-81b5-dac6ef5f350e';
const fieldClass = 'mt-2 min-h-12 w-full border border-white/15 bg-brandDark px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-gray-600 hover:border-white/30 focus:border-brandTeal focus:ring-1 focus:ring-brandTeal';
const labelClass = 'text-xs font-bold uppercase tracking-[0.18em] text-gray-300';

function EnquiryForm({ tour }) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', accessKey);
    formData.append('subject', `New enquiry — ${tour?.title ?? 'General enquiry'}`);
    formData.append('from_name', 'The Drive Touring Company Website');
    formData.append('Enquiry', tour?.title ?? 'General enquiry');

    setStatus('submitting');
    setMessage('Sending your enquiry…');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'We could not send your enquiry.');
      }

      form.reset();
      trackEvent('generate_lead', { tour: tour?.slug ?? 'general', method: 'enquiry_form' });
      setStatus('success');
      setMessage(tour
        ? 'Thank you. We’ll personally review your enquiry and be in touch. This is not a booking and no space has been reserved.'
        : 'Thank you for getting in touch. Our team will reply to your enquiry personally.');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again or email bookings@thedrivetouringcompany.com.');
    }
  };

  return (
              <form onSubmit={onSubmit} aria-busy={status === 'submitting'} className="mt-10 space-y-7">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

                <label className={`block ${labelClass}`}>
                  Your name
                  <input className={fieldClass} type="text" name="name" autoComplete="name" required />
                </label>

                <label className={`block ${labelClass}`}>
                  Email address
                  <input className={fieldClass} type="email" name="email" autoComplete="email" required />
                </label>

                {tour && (
                  <>
                    <label className={`block ${labelClass}`}>
                      Car make and model
                      <input className={fieldClass} type="text" name="Vehicle" placeholder="For example, Porsche 911 GT3" required />
                    </label>

                    <label className={`block ${labelClass}`}>
                      Your ownership and driving experience
                      <span className="mt-3 block text-sm font-normal normal-case tracking-normal leading-6 text-gray-400">
                        Tell us how long you’ve owned your car, your experience driving it or similar performance cars, and any road trips, tours or driver training you’ve enjoyed.
                      </span>
                      <textarea className={`${fieldClass} min-h-36 resize-y`} name="Experience" required />
                    </label>
                  </>
                )}

                <label className={`block ${labelClass}`}>
                  {tour ? 'Anything else you’d like us to know? (optional)' : 'How can we help?'}
                  {tour && (
                    <span className="mt-3 block text-sm font-normal normal-case tracking-normal leading-6 text-gray-400">
                      Questions or different circumstances? Let us know so we can consider them personally.
                    </span>
                  )}
                  <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" required={!tour} />
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-400">
                  <input
                    type="checkbox"
                    name="Consent"
                    value="Agreed to be contacted about this enquiry"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[#00A896]"
                  />
                  <span>I agree that The Drive Touring Company may contact me about this enquiry.</span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-brandTeal px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-brandDark transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                  {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
                </button>

                <div aria-live="polite" aria-atomic="true" className="min-h-8">
                  {message && (
                    <p className={`flex items-start gap-2 text-sm leading-6 ${status === 'error' ? 'text-red-300' : status === 'success' ? 'text-brandTeal' : 'text-gray-400'}`}>
                      {status === 'success' && <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
                      {status === 'error' && <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
                      <span>{message}</span>
                    </p>
                  )}
                </div>
              </form>
  );
}

export default function ContactPage() {
  const { search } = useLocation();
  const tour = getEnquiryTour(search);

  return (
    <div className="flex min-h-screen flex-col bg-brandDark font-sans text-white antialiased">
      <PageMeta
        title={tour ? `Enquire — ${tour.title}` : 'Get in touch'}
        description={tour ? `Enquire about joining ${tour.title}. Every enquiry is reviewed personally.` : 'Get in touch with The Drive Touring Company about tours, events and bespoke experiences.'}
        path="/contact"
      />
      <Nav activePage={tour ? 'tours' : undefined} />

      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 lg:border-b-0 lg:border-r lg:px-10 lg:py-24">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,168,150,0.18),transparent_38%)]" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-brandTeal">
                {tour ? tour.title : 'Let’s talk'}
              </p>
              <h1 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.045em] md:text-6xl">
                {tour ? 'Your car. Your experience. Our shared adventure.' : 'Great experiences start with a conversation.'}
              </h1>
              <p className="mt-8 max-w-lg text-base leading-8 text-gray-300">
                {tour
                  ? `${tour.shortTitle} is designed for owners who enjoy driving their performance cars and sharing the experience with like-minded people. We personally review each enquiry, considering the car, your driving experience and the group as a whole. If your circumstances are different, tell us a little more—we’re happy to have a conversation.`
                  : 'Have a question about our tours, a future event or a bespoke experience? Tell us what you have in mind. Our team will reply personally.'}
              </p>

              {tour && (
                <div className="mt-10 space-y-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-300">{tour.date}</p>
                  <TourPrice tour={tour} />
                </div>
              )}

              <Link
                to={tour ? tour.path : '/tours'}
                className="mt-10 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-300 transition-colors hover:text-brandTeal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                {tour ? 'Return to tour details' : 'Explore our tours'}
              </Link>
            </div>
          </section>

          <section aria-labelledby="enquiry-form-heading" className="bg-[#11171b] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">Your details</p>
              <h2 id="enquiry-form-heading" className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
                {tour ? 'Tell us your story' : 'General enquiry'}
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-400">
                {tour
                  ? 'An enquiry carries no obligation and does not reserve a space. After personal approval, we’ll send you a payment link. You’ll read and accept the booking terms before paying your deposit.'
                  : 'Tell us how we can help and we’ll be in touch.'}
              </p>
              <EnquiryForm key={tour?.slug ?? 'general'} tour={tour} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
