import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import PageMeta from '../components/PageMeta.jsx';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brandDark text-white">
      <PageMeta title="Privacy" description="How The Drive Touring Company handles enquiries and optional website analytics." path="/privacy" />
      <Nav />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-24 text-gray-300 leading-7">
        <h1 className="text-4xl font-black uppercase text-white">Privacy</h1>
        <h2 className="text-xl font-bold text-white">Your enquiries</h2>
        <p>The Drive Touring Company uses the email address, vehicle details and message you submit to respond to your enquiry. Our form is delivered through Web3Forms. Please avoid including sensitive personal information in your message. To ask about your information or request access, correction or deletion, email <a className="underline" href="mailto:info@thedrivetouringcompany.com">info@thedrivetouringcompany.com</a>.</p>
        <h2 className="text-xl font-bold text-white">Optional analytics</h2>
        <p>If you accept analytics, Google Analytics helps us understand visits, traffic sources, page views, selected link clicks, scrolling and successful enquiries. We do not send your form contents, name or email address to Google Analytics. Analytics events omit URL query strings and fragments.</p>
        <p>Google Analytics uses cookies, including _ga and _ga_* identifiers, to recognise browser visits. Google processes analytics information on our behalf and may process it outside the UK. Read <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a> for information about its processing and safeguards.</p>
        <p>Analytics only loads after you accept. You can reject it and continue using the site, or withdraw your choice through Cookie settings in the footer. Withdrawing stops future collection and removes analytics cookies available to this site; it does not automatically erase information already collected. We store your preference in your browser so we can respect it on later visits.</p>
      </main>
      <Footer />
    </div>
  );
}
