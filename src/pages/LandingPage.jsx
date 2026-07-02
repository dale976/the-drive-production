import { Car, Map, Users } from 'lucide-react';
import wet911 from '../assets/911_wet.jpg';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage({ activePage = 'home' }) {
    const features = [
        {
            icon: <Car className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
            title: 'THE FLEET',
            desc: "Tour-hardened machines built for the road. Two lead cars and a dedicated support vehicle.",
            link: '/fleet'
        },
        {
            icon: <Map className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
            title: 'TOURS',
            desc: "Hand-picked alpine runs, coastal curves, and five-star lodging. Every detail curated.",
            link: '/tours'
        },
        {
            icon: <Users className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
            title: 'ABOUT US',
            desc: 'Who we are, how we operate, and what drives us forward.',
            link: '/about'
        },
    ];

    return (
        <div className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

            <Nav activePage={activePage} />

            {/* HERO */}
            <header className="relative h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden flex-shrink-0">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at center, rgba(11,15,18,0) 0%, rgba(11,15,18,0.7) 85%),
              linear-gradient(to bottom, rgba(11,15,18,0.1), rgba(11,15,18,1)),
              url('${wet911}')
            `,
                    }}
                />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="relative z-10 text-center max-w-5xl px-6 space-y-8">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        DRIVE THE <br />
                        <span className="bg-clip-text text-brandTeal italic font-black pr-4">
              EXTRAORDINARY
            </span>
                    </h1>

                    <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]" />

                    <p className="text-gray-300 tracking-[0.25em] text-xs md:text-sm max-w-xl mx-auto uppercase font-medium leading-loose drop-shadow-md">
                        Epic Roads. Unforgettable Moments. <br />
                        <span className="text-white font-bold">Live to Drive. Drive to Live.</span>
                    </p>

                    <div className="pt-4">
                        <a href="/tours" className="inline-block bg-brandTeal text-brandDark font-black px-10 py-4 tracking-[0.2em] text-xs uppercase shadow-[0_0_30px_rgba(0,168,150,0.3)] hover:shadow-[0_0_50px_rgba(0,168,150,0.6)] hover:scale-105 transition-all duration-300">
                            Explore Tours
                        </a>
                    </div>

                    <div className="inline-flex items-center gap-2 border border-cyan-400/30 bg-brandDark/80 backdrop-blur-md px-5 py-2 text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 2027 TOUR BOOKING COMING SOON
                    </div>
                </div>
            </header>

            {/* CORE EXPERIENCE ANCHORS */}
            <section className="bg-brandGray/30 py-24 border-y border-gray-800 z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {features.map((feat, index) => (
                            <a
                                href={feat.link}
                                key={index}
                                className="flex flex-col items-center text-center p-8 bg-brandDark/80 border border-gray-800 hover:border-brandTeal/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                            >
                                <div className="mb-6 p-4 bg-brandGray/40 border border-gray-700 group-hover:border-brandTeal/50 transition-colors duration-300">
                                    {feat.icon}
                                </div>
                                <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-gray-200 group-hover:text-brandTeal transition-colors">{feat.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed max-w-[220px] font-medium">{feat.desc}</p>
                                <span className="text-[9px] font-bold tracking-widest text-brandTeal mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                  ENTER →
                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
