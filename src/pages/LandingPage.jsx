import { Car, Map, Shield, Calendar, ChevronRight } from 'lucide-react';
import wet911 from '../assets/911_wet.jpg'
import tripImg from '../assets/trip.jpeg'
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage({ activePage = 'home' }) {
  const upcomingEvents = [
    {
      id: 1,
      title: 'The ALPINE GT 2027',
      date: 'SAT 15 JUN',
      route: 'Thrilling Alpine rush',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const features = [
    {
      icon: <Car className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
      title: 'EXCLUSIVE SUPERCARS',
      desc: 'The world\'s most sought after cars.',
    },
    {
      icon: <Map className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
      title: 'EPIC ROUTES',
      desc: 'Hand-picked drives on Australia\'s best roads.',
    },
    {
      icon: <Shield className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
      title: 'UNFORGETTABLE EXPERIENCES',
      desc: 'Curated events. Lasting memories.',
    },
    {
      icon: <Calendar className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
      title: 'MEMBERS & EVENTS',
      desc: 'Join us for exclusive events & benefits.',
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
          {/*<div className="inline-flex items-center gap-2 border border-cyan-400/30 bg-brandDark/80 backdrop-blur-md px-5 py-2 text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">*/}
          {/*  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 2027 TOUR BOOKING COMING SOON*/}
          {/*</div>*/}

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            DRIVE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandTeal via-cyan-400 to-emerald-400 italic font-black pr-4">
              EXTRAORDINARY
            </span>
          </h1>

          <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]" />

          <p className="text-gray-300 tracking-[0.25em] text-xs md:text-sm max-w-xl mx-auto uppercase font-medium leading-loose drop-shadow-md">
            Epic Roads. Unforgettable Moments. <br />
            <span className="text-white font-bold">Live to Drive. Drive to Live.</span>
          </p>

            <div className="inline-flex items-center gap-2 border border-cyan-400/30 bg-brandDark/80 backdrop-blur-md px-5 py-2 text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 2027 TOUR BOOKING COMING SOON
            </div>

          {/*<div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">*/}
          {/*  <button className="w-full border-2 border-brandTeal text-brandTeal font-bold px-9 py-4 tracking-[0.2em] text-xs bg-brandDark/40 backdrop-blur-sm hover:bg-brandTeal hover:text-brandDark transition-all duration-300 uppercase shadow-[0_0_20px_rgba(0,168,150,0.15)] hover:shadow-[0_0_40px_rgba(0,168,150,0.5)]">*/}
          {/*    Explore Tours*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </header>

      {/* FEATURE CARDS */}
      {/*<section id="about" className="bg-brandDark py-24 border-y border-gray-900 z-10">*/}
      {/*  <div className="max-w-7xl mx-auto px-6">*/}
      {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">*/}
      {/*      {features.map((feat, index) => (*/}
      {/*        <div*/}
      {/*          key={index}*/}
      {/*          className="flex flex-col items-center text-center p-8 bg-brandGray/30 border border-gray-900 hover:border-brandTeal/40 hover:-translate-y-0.5 transition-all duration-300 group"*/}
      {/*        >*/}
      {/*          <div className="mb-6 p-4 bg-brandDark border border-gray-800 group-hover:border-brandTeal/50 transition-colors duration-300">*/}
      {/*            {feat.icon}*/}
      {/*          </div>*/}
      {/*          <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-gray-200 group-hover:text-brandTeal transition-colors">{feat.title}</h3>*/}
      {/*          <p className="text-xs text-gray-400 leading-relaxed max-w-[220px] font-medium">{feat.desc}</p>*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

        <div className="relative z-10 text-center px-6">
            <span className="text-brandTeal text-xs font-extrabold tracking-[0.4em] uppercase block mb-3">Behind The Brand</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                WHO WE <span
                className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-brandTeal to-cyan-400 pr-2">ARE</span>
            </h1>
            <div className="w-12 h-[2px] bg-brandTeal mx-auto mt-4"/>
        </div>

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


        {/* UPCOMING EVENTS */}
      <section id="events" className="py-28 max-w-7xl mx-auto px-6 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div>
            <span className="text-brandTeal text-xs font-extrabold tracking-[0.3em] uppercase block mb-2">Next Departures</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">UPCOMING EXPERIENCES</h2>
          </div>
          {/*<span className="text-xs font-bold text-gray-600 flex items-center gap-1 tracking-[0.2em] border-b border-gray-800 pb-1 cursor-not-allowed">*/}
          {/*  VIEW ALL TOURS <ChevronRight className="w-4 h-4" />*/}
          {/*</span>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Existing event cards */}
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group relative h-[420px] w-[320px] overflow-hidden border border-gray-900 cursor-pointer shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `linear-gradient(to top, rgba(11,15,18,1) 10%, rgba(11,15,18,0.4) 50%, rgba(11,15,18,0.1) 100%), url('${tripImg}')` }}
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black tracking-[0.2em] text-brandDark bg-brandTeal px-4 py-1.5">
                    {event.date}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-brandTeal tracking-widest font-bold block uppercase">{event.route}</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-wide text-white group-hover:translate-x-1 transition-transform duration-300">{event.title}</h3>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-300">
                    SECURE PASS <ChevronRight className="w-4 h-4 text-brandTeal" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Coming soon companion card */}
          <div className="group relative h-[420px] overflow-hidden border border-gray-900 border-dashed shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-brandDark to-brandGray/40" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <div>
                <span className="text-[11px] font-black tracking-[0.2em] text-brandDark bg-brandTeal/70 px-4 py-1.5 inline-block">
                  COMING SOON
                </span>
              </div>
              <div className="space-y-3 text-center pb-8">
                <div className="w-8 h-[1px] bg-brandTeal/40 mx-auto" />
                <p className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">More dates dropping soon</p>
                <p className="text-[10px] text-gray-600 tracking-widest">Stay tuned for the next season</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
