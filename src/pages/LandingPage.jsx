import {Compass, Hotel, Users} from 'lucide-react';
import {Link} from 'react-router-dom';
import wet911 from '../assets/exige_edit.jpg';
import foundersDriving from '../assets/founders-driving.webp';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import PageMeta from '../components/PageMeta.jsx';
import LifeOnTour from '../components/LifeOnTour.jsx';

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Drive Touring Company',
    url: 'https://thedrivetouringcompany.com/',
    email: 'info@thedrivetouringcompany.com',
    logo: 'https://thedrivetouringcompany.com/favicon.png',
    sameAs: ['https://www.instagram.com/thedrivetouringcompany'],
};

export default function LandingPage({activePage = 'home'}) {
    // const features = [
    //     {
    //         icon: <Car className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
    //         title: 'THE FLEET',
    //         desc: "Tour-hardened machines built for the road. Two lead cars and a dedicated support vehicle.",
    //         link: '/fleet'
    //     },
    //     {
    //         icon: <Map className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
    //         title: 'TOURS',
    //         desc: "Hand-picked alpine runs, coastal curves, and luxury lodging. Every detail curated.",
    //         link: '/tours'
    //     },
    //     {
    //         icon: <Users className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
    //         title: 'ABOUT US',
    //         desc: 'Who we are, how we operate, and what drives us forward.',
    //         link: '/about'
    //     },
    // ];

    const pillars = [
        {
            icon: <Compass className="w-7 h-7 text-brandTeal" strokeWidth={1.5}/>,
            title: 'CURATED EXPLORATION',
            desc: 'Every mountain pass, coastal sweep and technical descent is scouted to provide the most dynamic roads that these cars were born to drive.',
        },
        {
            icon: <Hotel className="w-7 h-7 text-brandTeal" strokeWidth={1.5}/>,
            title: 'PREMIUM VENUES',
            desc: 'Handpicked for character, quality, and location. Our partner venues deliver exceptional hospitality and secure parking at every step of your journey.',
        },
        {
            icon: <Users className="w-7 h-7 text-brandTeal" strokeWidth={1.5}/>,
            title: 'ELITE COMMUNITY',
            desc: 'Our curated community is built with a shared passion for high performance cars and a grand sense of adventure. A network of incredible people with incredible stories and incredible cars. All egos are left at the start line.',
        },
    ];

    return (
        <div
            className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

            <PageMeta
                description="Exclusive supercar touring experiences across epic roads, premium venues and unforgettable destinations."
                path="/"
                structuredData={organizationSchema}
            />

            <Nav activePage={activePage}/>

            {/* HERO */}
            <header
                className="relative h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden flex-shrink-0">
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
                <div
                    className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]"/>

                <div className="relative z-10 text-center max-w-5xl px-6 space-y-8">
                    <h1 className="text-[clamp(2.15rem,10.5vw,5rem)] md:text-8xl font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        DRIVE THE <br/>
                        <span className="bg-clip-text text-brandTeal italic font-black">
              EXTRAORDINARY
            </span>
                    </h1>

                    <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]"/>

                    <p className="text-gray-300 tracking-[0.25em] text-xs md:text-sm max-w-xl mx-auto uppercase font-medium leading-loose drop-shadow-md">
                        Epic Roads. Unforgettable Moments. <br/>
                        <span className="text-white font-bold">We live for The Drive.</span>
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                        <Link to="/tours"
                           className="inline-flex min-h-12 items-center bg-brandTeal px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-brandDark shadow-[0_0_30px_rgba(0,168,150,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,168,150,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal">
                            Explore Tours
                        </Link>
                        <Link to="/contact"
                           className="inline-flex min-h-12 items-center border border-white/30 bg-brandDark/60 px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-brandTeal hover:text-brandTeal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal">
                            Register interest
                        </Link>
                    </div>

                </div>
            </header>

            {/* CORE EXPERIENCE ANCHORS */}
            {/*<section className="bg-brandGray/30 py-24 border-y border-gray-800 z-10">*/}
            {/*    <div className="max-w-7xl mx-auto px-6">*/}
            {/*        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">*/}
            {/*            {features.map((feat, index) => (*/}
            {/*                <a*/}
            {/*                    href={feat.link}*/}
            {/*                    key={index}*/}
            {/*                    className="flex flex-col items-center text-center p-8 bg-brandDark/80 border border-gray-800 hover:border-brandTeal/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"*/}
            {/*                >*/}
            {/*                    <div className="mb-6 p-4 bg-brandGray/40 border border-gray-700 group-hover:border-brandTeal/50 transition-colors duration-300">*/}
            {/*                        {feat.icon}*/}
            {/*                    </div>*/}
            {/*                    <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-gray-200 group-hover:text-brandTeal transition-colors">{feat.title}</h3>*/}
            {/*                    <p className="text-xs text-gray-400 leading-relaxed max-w-[220px] font-medium">{feat.desc}</p>*/}
            {/*                    <span className="text-[9px] font-bold tracking-widest text-brandTeal mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">*/}
            {/*      ENTER →*/}
            {/*    </span>*/}
            {/*                </a>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section id="story" className="py-24 bg-brandGray/20 border-b border-gray-800">
                <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                    <span
                        className="text-brandTeal text-xs font-bold tracking-widest uppercase block">Behind the brand</span>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">WHO WE ARE</h2>
                </div>
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 space-y-4 text-center md:text-left">
                        <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block">
                            Our Manifesto
                        </span>

                        <h2 className="text-3xl font-black tracking-tight uppercase leading-none">
                            Chasing The Perfect Drive.
                        </h2>
                    </div>

                    <div
                        className="md:col-span-7 space-y-6 text-center md:text-left max-w-xl mx-auto md:max-w-none">
                        <p>
                            <strong className="text-white">The Drive Touring Company</strong> was born from a love of
                            the road, the cars, and the unforgettable moments that happen when both are experienced
                            properly.
                        </p>

                        <p>
                            We create curated supercar experiences for people who want more than a route and a
                            hotel booking. Every detail is designed so each driver feels like the hero of their own
                            adventure.
                        </p>

                        <p>
                            Our ambition is simple: to create the most exciting and unforgettable ways to enjoy the
                            world's greatest driving machines.
                        </p>
                    </div>
                </div>
            </section>

            {/* PILLARS */}
            <section id="pillars" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
                        <span
                            className="text-brandTeal text-xs font-bold tracking-widest uppercase block">The Pillars</span>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">HOW WE OPERATE</h2>
                        <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-gray-400 md:text-base">
                            From the first route recce to the final hotel arrival, every element is considered as
                            part of one complete experience. We bring together exceptional roads, distinctive
                            places to stay and a carefully curated group of drivers—leaving you free to enjoy the
                            journey, the car and the company.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((pillar, idx) => (
                            <div key={idx}
                                 className="p-8 border border-gray-800 bg-brandGray/20 relative group hover:border-brandTeal/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center">
                                <div
                                    className="mb-6 inline-block p-3 bg-brandDark/60 border border-gray-700 group-hover:border-brandTeal/50 transition-colors">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-white">{pillar.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium text-center">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LifeOnTour />

            {/* FOUNDERS */}
            <section id="team" className="overflow-hidden border-y border-gray-800 bg-brandGray/20 py-24">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
                    <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0">
                        <div aria-hidden="true"
                             className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-brandTeal md:-left-6 md:-top-6"/>
                        <div className="relative aspect-[3/4] overflow-hidden bg-brandDark">
                            <img
                                src={foundersDriving}
                                alt="Lewis and Alan enjoying a drive together"
                                width="480"
                                height="640"
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                            <div aria-hidden="true"
                                 className="absolute inset-0 bg-gradient-to-t from-brandDark/55 via-transparent to-transparent"/>
                            <figcaption
                                className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
                                Lewis &amp; Alan
                            </figcaption>
                        </div>
                    </figure>

                    <div className="lg:col-span-7 lg:py-8">
                        <span className="block text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
                            The organisers
                        </span>
                        <h2 className="mt-4 max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
                            Built from friendship. Driven by a shared obsession.
                        </h2>

                        <div className="mt-8 max-w-2xl space-y-6 text-base font-medium leading-8 text-gray-300">
                            <p>
                                We’re Lewis and Alan—friends for more than two decades, united by a lifelong love of
                                cars and the freedom of a great road. Over the past three years, we’ve planned and
                                hosted private driving tours, refining every detail through experience: the roads, the
                                pace, the places we stay and the way a group comes together over the course of a
                                journey.
                            </p>
                            <p>
                                The Drive Touring Company grew from a desire to share that experience more widely. We
                                bring people together through a common passion, creating tours where friendships form
                                naturally and the pleasure of driving remains at the heart of every day. Each journey
                                is built around roads with rhythm, thoughtful places to pause and moments that stay
                                with you long after the engines fall silent.
                            </p>
                        </div>

                        <p className="mt-10 border-l-2 border-brandTeal pl-5 text-sm font-black uppercase tracking-[0.16em] text-white md:text-base">
                            Great roads. Remarkable cars. Good company.
                        </p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}
