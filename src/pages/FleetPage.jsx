import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import porscheImg from '../assets/porsche_gt3rs.jpg';
import ferrariImg from '../assets/ferrari_f8.jpg';
import mclarenImg from '../assets/mclaren_artura.jpg';
import fleetHeroImg from '../assets/fleet_hero.jpg';

export default function FleetPage({ activePage = 'fleet' }) {
    const carFleet = [
        {
            id: 1,
            name: 'PORSCHE 911 GT3 RS',
            tagline: 'LEAD CAR — PRECISION & POISE',
            specs: { power: '518 HP', zeroToSixty: '3.0s', topSpeed: '296 KM/H' },
            image: porscheImg,
        },
        {
            id: 2,
            name: 'LOTUS EXIGE 410 SPORT',
            tagline: 'LEAD CAR — LIGHTWEIGHT DRIVING PURITY',
            specs: { power: '410 HP', zeroToSixty: '3.3s', topSpeed: '280 KM/H' },
            image: ferrariImg,
        },
        {
            id: 3,
            name: 'BMW M3 TOURING',
            tagline: 'SUPPORT CAR — PERFORMANCE & LOGISTICS',
            specs: { power: '503 HP', zeroToSixty: '3.6s', topSpeed: '280 KM/H' },
            image: mclarenImg,
        },
    ];

    return (
        <div className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

            <Nav activePage={activePage} />

            {/* HERO SECTION */}
            <header className="relative h-[60vh] flex items-center justify-center overflow-hidden flex-shrink-0">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at center, rgba(11,15,18,0) 0%, rgba(11,15,18,0.7) 85%),
              linear-gradient(to bottom, rgba(11,15,18,0.1), rgba(11,15,18,1)),
              url('${fleetHeroImg}')
            `,
                    }}
                />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="relative z-10 text-center max-w-5xl px-6 space-y-4">
          <span className="text-brandTeal text-xs font-extrabold tracking-[0.4em] uppercase block">
            The Precision Fleet
          </span>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        MACHINES OF <br />
                        <span className="bg-clip-text text-brandTeal italic font-black pr-4">
              PURE EMOTION
            </span>
                    </h1>
                    <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]" />
                </div>
            </header>

            {/* FLEET SHOWCASE GRID */}
            <section className="py-24 bg-brandGray/20 border-b border-gray-800 z-10 w-full">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {carFleet.map((car) => (
                            <div
                                key={car.id}
                                className="bg-brandDark/80 border border-gray-800 hover:border-brandTeal/30 group transition-all duration-500 flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-[240px] overflow-hidden border-b border-gray-800">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                        style={{ backgroundImage: `url('${car.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Details */}
                                <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] text-brandTeal tracking-widest font-bold block uppercase mb-1">
                                            {car.tagline}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-black tracking-wide text-white group-hover:text-brandTeal transition-colors duration-300">
                                            {car.name}
                                        </h3>
                                    </div>

                                    {/* Performance Metrics */}
                                    <div className="grid grid-cols-3 gap-2 border-y border-gray-800 py-4 text-center bg-brandDark/40">
                                        <div>
                                            <span className="text-[9px] text-gray-500 block tracking-widest font-bold uppercase mb-1">POWER</span>
                                            <span className="text-xs font-black tracking-wider text-gray-200">{car.specs.power}</span>
                                        </div>
                                        <div className="border-x border-gray-800">
                                            <span className="text-[9px] text-gray-500 block tracking-widest font-bold uppercase mb-1">0-100 KM/H</span>
                                            <span className="text-xs font-black tracking-wider text-gray-200">{car.specs.zeroToSixty}</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] text-gray-500 block tracking-widest font-bold uppercase mb-1">V-MAX</span>
                                            <span className="text-xs font-black tracking-wider text-gray-200">{car.specs.topSpeed}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FLEET PROMISE */}
            <section className="py-20 z-10">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
                    <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block">Our Standard</span>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">TOUR-HARDENED. ROAD-READY.</h2>
                    <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-medium">
                        Two lead cars set the pace. A dedicated support vehicle follows the convoy. Every machine in our fleet is prepared for long-distance touring — serviced, detailed, and dialled in for the road ahead.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
