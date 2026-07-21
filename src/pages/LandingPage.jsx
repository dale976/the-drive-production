import {Car, Compass, Hotel, Map, Users} from 'lucide-react';
import wet911 from '../assets/exige_edit.jpg';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

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
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        DRIVE THE <br/>
                        <span className="bg-clip-text text-brandTeal italic font-black pr-4">
              EXTRAORDINARY
            </span>
                    </h1>

                    <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]"/>

                    <p className="text-gray-300 tracking-[0.25em] text-xs md:text-sm max-w-xl mx-auto uppercase font-medium leading-loose drop-shadow-md">
                        Epic Roads. Unforgettable Moments. <br/>
                        <span className="text-white font-bold">We live for The Drive.</span>
                    </p>

                    <div className="pt-4">
                        <a href="/tours"
                           className="inline-block bg-brandTeal text-brandDark font-black px-10 py-4 tracking-[0.2em] text-xs uppercase shadow-[0_0_30px_rgba(0,168,150,0.3)] hover:shadow-[0_0_50px_rgba(0,168,150,0.6)] hover:scale-105 transition-all duration-300">
                            Explore Tours
                        </a>
                    </div>

                    <div
                        className="inline-flex items-center gap-2 border border-cyan-400/30 bg-brandDark/80 backdrop-blur-md px-5 py-2 text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/> 2027 TOUR BOOKING COMING SOON
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
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span
                            className="text-brandTeal text-xs font-bold tracking-widest uppercase block">The Pillars</span>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">HOW WE OPERATE</h2>
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
                                <p className="text-xs text-gray-400 leading-relaxed font-medium text-center">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section id="team" className="py-24 bg-brandGray/20 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block mb-2">The Organizers</span>
                        <h2 className="text-3xl font-black tracking-tight uppercase">DRIVEN WITH EXPERIENCE</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {/* Member 1 */}
                        <div
                            className="border border-gray-800 bg-brandDark/80 group hover:border-brandTeal/30 transition-all duration-300">
                            <div
                                className="h-72 overflow-hidden relative bg-brandGray/60 flex flex-col items-center justify-center gap-4">
                                <span
                                    style={{fontFamily: 'RoadRage, sans-serif'}}
                                    className="text-7xl text-brandTeal/60 group-hover:text-brandTeal group-hover:scale-110 transition-all duration-500 select-none"
                                >
                                    LH
                                </span>
                                <span
                                    className="text-[10px] text-gray-500 font-bold tracking-widest uppercase group-hover:text-gray-300 transition-colors duration-300">Creative & Experience Design</span>
                            </div>
                            <div className="p-6 space-y-1 border-t border-gray-800 text-center">
                                {/*<span className="text-[10px] text-brandTeal font-bold uppercase tracking-widest">Lord Business</span>*/}
                                <h3 className="text-base font-black tracking-wide text-white uppercase">Lewis
                                    Harvey</h3>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div
                            className="border border-gray-800 bg-brandDark/80 group hover:border-brandTeal/30 transition-all duration-300">
                            <div
                                className="h-72 overflow-hidden relative bg-brandGray/60 flex flex-col items-center justify-center gap-4">
                                <span
                                    style={{fontFamily: 'RoadRage, sans-serif'}}
                                    className="text-7xl text-brandTeal/60 group-hover:text-brandTeal group-hover:scale-110 transition-all duration-500 select-none"
                                >
                                    AD
                                </span>
                                <span
                                    className="text-[10px] text-gray-500 font-bold tracking-widest uppercase group-hover:text-gray-300 transition-colors duration-300">Routes & Logistics</span>
                            </div>
                            <div className="p-6 space-y-1 border-t border-gray-800 text-center">
                                {/*<span className="text-[10px] text-brandTeal font-bold uppercase tracking-widest">Head of Exploration</span>*/}
                                <h3 className="text-base font-black tracking-wide text-white uppercase">Alan Dale</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}
