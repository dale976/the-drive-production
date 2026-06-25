import {Compass, Users, Hotel} from 'lucide-react';
import lordBusinessImage from '../assets/Lord_Business.jpg';
import rear911 from '../assets/rear_911.jpeg'
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function AboutPage({activePage = 'about'}) {
    const pillars = [
        {
            icon: <Compass className="w-7 h-7 text-brandTeal" strokeWidth={1.5}/>,
            title: 'CURATED EXPLORATION',
            desc: 'We don\'t do standard routes. Every tarmac deviation, mountain pass, and coastal corner is meticulously scouted to match the dynamics of elite machinery.',
        },
        {
            icon: <Hotel className="w-7 h-7 text-brandTeal" strokeWidth={1.5}/>,
            title: 'PREMIUM VENUES',
            desc: 'Every venue is handpicked for its character, quality, and location—delivering exceptional hospitality and unforgettable settings at every stage of your journey.',
        },
        {
            icon: <Users className="w-7 h-7 text-brandTeal" strokeWidth={1.5}/>,
            title: 'ELITE COMMUNITY',
            desc: 'Beyond the cars, we curate a collective of like-minded individuals. Stripping away pretension, we unite on a shared obsession for mechanical purity and adventure.',
        },
    ];

    return (
        <div
            className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

            <Nav activePage={activePage}/>

            {/* MINI-HERO */}
            <header
                className="relative h-[45vh] flex items-center justify-center overflow-hidden flex-shrink-0 border-b border-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `
              linear-gradient(to bottom, rgba(11,15,18,0.4), rgba(11,15,18,1)),
              url('${rear911}')
            `,
                    }}
                />
                <div className="relative z-10 text-center px-6">
                    <span className="text-brandTeal text-xs font-extrabold tracking-[0.4em] uppercase block mb-3">Behind The Brand</span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                        WHO WE <span
                        className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-brandTeal to-cyan-400 pr-2">ARE</span>
                    </h1>
                    <div className="w-12 h-[2px] bg-brandTeal mx-auto mt-4"/>
                </div>
            </header>

            {/* MANIFESTO */}
            <section id="story"
                     className="py-24 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 space-y-4">
                    <span
                        className="text-brandTeal text-xs font-bold tracking-widest uppercase block">Our Manifesto</span>
                    <h2 className="text-3xl font-black tracking-tight uppercase leading-none">Chasing The Perfect
                        Drive.</h2>
                </div>
                <div className="md:col-span-7 space-y-6 text-gray-400 text-sm leading-relaxed font-medium">
                    <p>
                        <strong className="text-white">The Drive Touring Company</strong> was born from a love of the
                        road, the cars, and the unforgettable moments that happen when both are experienced properly.
                    </p>
                    <p>
                        What began as personal driving adventures soon became something we wanted to share: spectacular
                        roads, breathtaking viewpoints, perfectly timed stops, and hotels that make your arrival feel as
                        special as the drive itself.
                    </p>
                    <p>Our founders bring two worlds together. One comes from a creative video game background, with a
                        passion for building immersive, cinematic, and personal experiences. The other has an instinct
                        for discovering scenic European routes and bespoke high-end accommodation that elevates every
                        stage of the tour.
                    </p>
                    <p>
                        Together, we create curated supercar experiences for people who want more than a route and a
                        hotel booking. Every detail is designed so each driver feels like the hero of their own
                        adventure.
                    </p>
                    <p>
                        This is only the beginning. Our ambition is simple: to create the most exciting and
                        unforgettable ways to enjoy the world’s greatest driving machines.
                    </p>
                </div>
            </section>

            {/* PILLARS */}
            <section id="pillars" className="bg-brandGray/20 border-y border-gray-900 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span
                            className="text-brandTeal text-xs font-bold tracking-widest uppercase block">The Pillars</span>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">HOW WE OPERATE</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((pillar, idx) => (
                            <div key={idx}
                                 className="p-8 border border-gray-900 bg-brandDark relative group hover:border-brandTeal/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center">
                                <div
                                    className="mb-6 inline-block p-3 bg-brandGray/40 border border-gray-800 group-hover:border-brandTeal/50 transition-colors">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-white">{pillar.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed font-medium">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section id="team" className="py-24 max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block mb-2">The Organizers</span>
                    <h2 className="text-3xl font-black tracking-tight uppercase">DRIVEN BY PROFESSIONALS</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    {/* Member 1 — real photo */}
                    <div className="border border-gray-900 bg-brandGray/10 group">
                        <div className="h-72 overflow-hidden relative">
                            <img
                                src={lordBusinessImage}
                                alt="Lewis Harvey"
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="p-6 space-y-1 border-t border-gray-900 text-center">
                            <span className="text-[10px] text-brandTeal font-bold uppercase tracking-widest">Lord Business</span>
                            <h3 className="text-base font-black tracking-wide text-white uppercase">Lewis Harvey</h3>
                        </div>
                    </div>

                    {/* Member 2 — initials placeholder */}
                    <div className="border border-gray-900 bg-brandGray/10 group">
                        <div className="h-72 overflow-hidden relative bg-brandGray flex items-center justify-center">
              <span
                  style={{fontFamily: 'RoadRage, sans-serif'}}
                  className="text-6xl text-brandTeal/60 select-none"
              >
                AD
              </span>
                        </div>
                        <div className="p-6 space-y-1 border-t border-gray-900 text-center">
                            <span className="text-[10px] text-brandTeal font-bold uppercase tracking-widest">Head of Exploration</span>
                            <h3 className="text-base font-black tracking-wide text-white uppercase">Alan Dale</h3>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
}
