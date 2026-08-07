import { Calendar, Clock, Users, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import toursHeroImg from '../assets/gt3_chateau.jpg';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { alpineGtTour } from '../data/tours.js';

export default function ToursPage({ activePage = 'tours' }) {
    const tour = alpineGtTour;

    return (
        <div className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

            <PageMeta
                title="Tours"
                description="Discover The Alpine GT 2027: five days through Germany's Black Forest, the Swiss Alps and Burgundy."
                path="/tours"
            />

            <Nav activePage={activePage} />

            {/* HERO SECTION */}
            <header className="relative h-[60vh] flex items-center justify-center overflow-hidden flex-shrink-0">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at center, rgba(11,15,18,0) 0%, rgba(11,15,18,0.7) 85%),
              linear-gradient(to bottom, rgba(11,15,18,0.1), rgba(11,15,18,1)),
              url('${toursHeroImg}')
            `,
                    }}
                />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="relative z-10 text-center max-w-5xl px-6 space-y-4">
          <span className="text-brandTeal text-xs font-extrabold tracking-[0.4em] uppercase block">
            Curated Expeditions
          </span>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        UPCOMING <br />
                        <span className="bg-clip-text text-brandTeal italic font-black pr-4">
              EXPERIENCES
            </span>
                    </h1>
                    <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]" />
                </div>
            </header>

            {/* FEATURED TOUR */}
            <section className="py-24 bg-brandGray/20 border-b border-gray-800 z-10 w-full">
                <div className="max-w-6xl mx-auto px-6">
                <div className="bg-brandDark/80 border border-gray-800 hover:border-brandTeal/20 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 overflow-hidden group shadow-2xl">

                    {/* Left: Imagery Column */}
                    <Link
                        to={tour.path}
                        aria-label={`Explore ${tour.title}`}
                        className="relative lg:col-span-5 min-h-[300px] lg:min-h-auto overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                            style={{ backgroundImage: `url('${tour.images.listing}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brandDark via-transparent to-transparent opacity-90 lg:opacity-60" />

                        {/* Floating Date Badge */}
                        <div className="absolute top-6 left-6">
                            <div className="flex items-center gap-2 bg-brandDark border border-gray-800 px-4 py-2 shadow-xl">
                                <Calendar className="w-3.5 h-3.5 text-brandTeal" />
                                <span className="text-[10px] font-black tracking-widest text-white">{tour.date}</span>
                            </div>
                        </div>
                    </Link>

                    {/* Right: Specification & Copy */}
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">

                        {/* Header */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-brandTeal uppercase">
                                <Compass className="w-3.5 h-3.5" />
                                <span>{tour.subtitle}</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white group-hover:text-brandTeal transition-colors duration-300">
                                <Link
                                    to={tour.path}
                                    className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
                                >
                                    {tour.title}
                                </Link>
                            </h3>
                            <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase italic">
                                "{tour.tagline}"
                            </p>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-800 bg-brandDark/30 px-4">
                            <div className="space-y-0.5">
                                <span className="text-[9px] text-gray-500 font-bold tracking-widest block uppercase">DURATION</span>
                                <div className="flex items-center gap-1.5 text-xs font-black text-gray-200">
                                    <Clock className="w-3.5 h-3.5 text-brandTeal/70" strokeWidth={2} />
                                    <span>{tour.duration}</span>
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-[9px] text-gray-500 font-bold tracking-widest block uppercase">DISTANCE</span>
                                <div className="flex items-center gap-1.5 text-xs font-black text-gray-200">
                                    <Compass className="w-3.5 h-3.5 text-brandTeal/70" strokeWidth={2} />
                                    <span>{tour.distance}</span>
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-[9px] text-gray-500 font-bold tracking-widest block uppercase">TOUR SIZE</span>
                                <div className="flex items-center gap-1.5 text-xs font-black text-gray-200">
                                    <Users className="w-3.5 h-3.5 text-brandTeal/70" strokeWidth={2} />
                                    <span>{tour.groupSize}</span>
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-[9px] text-gray-500 font-bold tracking-widest block uppercase">PRICE</span>
                                <div className="text-xs font-black text-brandTeal">
                                    <span className="block">{tour.price.display}</span>
                                    <span className="mt-1 block text-[8px] tracking-widest text-gray-500">FOR TWO SHARING</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                            {tour.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2">
                            <span className="text-[9px] text-gray-500 font-bold tracking-widest block uppercase">ROUTE INCLUSIONS</span>
                            <div className="flex flex-wrap gap-2">
                                {tour.highlights.map((item, idx) => (
                                    <span key={idx} className="text-[10px] font-bold tracking-wide border border-gray-800 bg-brandDark/40 px-3 py-1 text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-4 flex items-center justify-between border-t border-gray-800/60">
                            <Link
                                to={tour.path}
                                aria-label={`Explore ${tour.title}`}
                                className="inline-flex min-h-11 items-center border-2 border-brandTeal px-6 py-3 text-[10px] font-black tracking-[0.2em] text-brandTeal transition-colors hover:bg-brandTeal hover:text-brandDark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
                            >
                                EXPLORE THE TOUR
                            </Link>
                            <span className="hidden md:flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-600 cursor-default opacity-50">
                                BOOKING OPENING SOON
                            </span>
                        </div>

                    </div>
                </div>
                </div>
            </section>

            {/* MORE TOURS COMING */}
            <section className="py-16 z-10 text-center">
                <div className="max-w-3xl mx-auto px-6 space-y-4">
                    <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block">Stay Connected</span>
                    <h2 className="text-2xl font-black tracking-tight uppercase">MORE EXPERIENCES IN DEVELOPMENT</h2>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto font-medium">
                        Additional tours, events and bespoke experiences across the UK and Europe are in development and more information will be announced here soon. Register your interest here to receive early access to our future events.
                    </p>
                    <div className="pt-2">
                        <a href="mailto:info@thedrivetouringcompany.com?subject=Tour Interest Registration" className="text-[11px] text-brandTeal font-black tracking-widest border-b border-brandTeal/30 pb-1 hover:border-brandTeal transition-all">
                            REGISTER INTEREST →
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
