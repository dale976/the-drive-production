import { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { alpineGtTour } from '../data/tours.js';

const accessKey = 'b41dbf56-7093-4ec2-81b5-dac6ef5f350e';
const fieldClass = 'mt-2 min-h-12 w-full border border-white/15 bg-brandDark px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-gray-600 hover:border-white/30 focus:border-brandTeal focus:ring-1 focus:ring-brandTeal';
const labelClass = 'text-xs font-bold uppercase tracking-[0.18em] text-gray-300';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', accessKey);
    formData.append('subject', 'New Alpine GT 2027 registration interest');
    formData.append('from_name', 'The Drive Touring Company Website');
    formData.append('Tour', alpineGtTour.title);

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
      setStatus('success');
      setMessage('Thank you. Your interest has been registered and our team will be in touch.');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again or email bookings@thedrivetouringcompany.com.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-brandDark font-sans text-white antialiased">
      <PageMeta
        title="Register Interest — Alpine GT 2027"
        description="Register your interest in The Drive Touring Company's Alpine GT 2027 tour."
        path="/contact"
      />
      <Nav activePage="tours" />

      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[0.78fr_1.22fr]">
          <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 lg:border-b-0 lg:border-r lg:px-10 lg:py-24">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,168,150,0.18),transparent_38%)]" />
            <div className="relative lg:sticky lg:top-32">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-brandTeal">
                Register interest
              </p>
              <h1 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.045em] md:text-7xl">
                Begin the journey.
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">
                Tell us about your car and anything you would like to know. Our team will personally follow up about The Alpine GT 2027.
              </p>

              <dl className="mt-12 max-w-sm border border-white/10 bg-white/10">
                <div className="bg-brandDark p-5">
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gray-500">Dates</dt>
                  <dd className="mt-2 text-sm font-bold uppercase">{alpineGtTour.date}</dd>
                </div>
              </dl>

              <Link
                to={alpineGtTour.path}
                className="mt-10 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-300 transition-colors hover:text-brandTeal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Return to tour details
              </Link>
            </div>
          </section>

          <section aria-labelledby="enquiry-form-heading" className="bg-[#11171b] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">Your details</p>
              <h2 id="enquiry-form-heading" className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
                Alpine GT enquiry
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-400">
                Registering interest is not a booking and carries no obligation.
              </p>

              <form onSubmit={onSubmit} aria-busy={status === 'submitting'} className="mt-10 space-y-7">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

                <label className={`block ${labelClass}`}>
                  Email address
                  <input className={fieldClass} type="email" name="email" autoComplete="email" required />
                </label>

                <label className={`block ${labelClass}`}>
                  Your car
                  <input
                    className={fieldClass}
                    type="text"
                    name="Vehicle"
                    placeholder="Make and model"
                    required
                  />
                </label>

                <label className={`block ${labelClass}`}>
                  Anything you would like us to know?
                  <textarea
                    className={`${fieldClass} min-h-36 resize-y`}
                    name="message"
                    placeholder="Questions, previous touring experience, or anything else that may help us"
                    required
                  />
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
                  {status === 'submitting' ? 'Sending…' : 'Register interest'}
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
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
