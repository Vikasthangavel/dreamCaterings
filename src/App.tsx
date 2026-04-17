import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Clock, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

// --- Data Arrays ---
const services = [
  { title: "Wedding Catering", desc: "Transform your special day with our authentic thali.", img: "/assets/service-wedding.png" },
  { title: "Corporate Events", desc: "Sophisticated lunch boxes tailored for professionals.", img: "/assets/service-corporate.png" },
  { title: "Housewarming", desc: "Traditional satvik menus served with heritage.", img: "/assets/service-traditional.png" }
];

const menuItems = [
  { id: 1, name: "Traditional Thali", img: "/assets/menu-thali.png", angle: 0 },
  { id: 2, name: "Mysore Pak", img: "/assets/menu-dessert.png", angle: 72 },
  { id: 3, name: "Ghee Roast Dosa", img: "/assets/menu-dosa.png", angle: 144 },
  { id: 4, name: "Bisi Bele Bath", img: "/assets/menu-rice.png", angle: 216 },
  { id: 5, name: "Filter Coffee", img: "/assets/menu-coffee.png", angle: 288 },
];

const royalMenu = [
  { name: "Banana Leaf Thali", desc: "The grand traditional full course meal served on a fresh plantain leaf." },
  { name: "Chettinad Mutton", desc: "Tender meat slow-cooked in rich, aromatic hand-pounded spices." },
  { name: "Ghee Roast Dosa", desc: "Crispy, golden crepes roasted in pure, traditional bilona ghee." },
  { name: "Mysore Pak", desc: "A royal melt-in-the-mouth sweet delicacy born in the palaces." },
  { name: "Elaneer Payasam", desc: "Refreshing tender coconut kheer with a touch of cardamom." },
  { name: "Degree Coffee", desc: "Authentic Kumbakonam filter coffee to perfectly end the feast." }
];

const cookingProcess = [
  { step: "01", title: "Sourcing", desc: "Selecting the finest organic ingredients at dawn." },
  { step: "02", title: "Preparation", desc: "Traditional hand-grinding of spices to retain natural oils." },
  { step: "03", title: "Slow Cooking", desc: "Cooking over firewood for the signature smoky flavor." },
  { step: "04", title: "Royal Serving", desc: "Presented traditionally on a fresh banana leaf." }
];

// --- Sub Components ---
const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (onClick) onClick();
      }
    }}
    className="relative font-sans text-secondary-brown hover:text-primary-maroon transition-colors duration-300 group cursor-pointer font-bold"
  >
    {label}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-gold transition-all duration-300 group-hover:w-full" />
  </a>
);
const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // GSAP Refs
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thaliContainerRef = useRef<HTMLDivElement>(null);
  // Scroll Event for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- OPTIMIZED GSAP ZERO-LAG ANIMATIONS ---
  useGSAP(() => {
    
    // 🌟 VIRTUAL THALI EXPERIENCE (MUST BE FIRST because it's higher in the DOM) 🌟
    const thaliTl = gsap.timeline({
      scrollTrigger: {
        trigger: thaliContainerRef.current,
        start: 'top top',
        end: '+=2500', // Adjusted for smooth unrolling without overlapping
        scrub: 1,
        pin: true,
        // pinSpacing defaults to true, which PUSHES the next sections down correctly
      }
    });

    thaliTl.fromTo('.thali-leaf', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
           .fromTo('.thali-rice', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
           .fromTo('.thali-sambar', { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
           .fromTo('.thali-rasam', { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
           .fromTo('.thali-poriyal', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
           .fromTo('.thali-kootu', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
           .fromTo('.thali-appalam', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 })
           .fromTo('.thali-pickle', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
           .fromTo('.thali-tumbler', { x: 100, y: -100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6 });

    // 1. Staggered Service Cards (Smooth GPU fade)
    // ... (YOUR EXISTING GSAP CODE CONTINUES HERE) ...
    
    // 1. Staggered Service Cards (Smooth GPU fade)
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '#services', start: 'top 75%', toggleActions: "play reverse play reverse" },
      y: 80, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
    });

    // 2. Horizontal Process Timeline Animation
    gsap.fromTo('.process-line', 
      { width: '0%' },
      { 
        width: '100%', ease: 'none',
        scrollTrigger: { trigger: '#process', start: 'top center', end: 'bottom center', scrub: true }
      }
    );
    gsap.from('.process-step', {
      scrollTrigger: { trigger: '#process', start: 'top 60%', toggleActions: "play reverse play reverse" },
      y: 40, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(1.5)'
    });

    // 3. REALISTIC ANCIENT SCROLL UNROLL
    const paperHeight = (document.querySelector('.scroll-paper') as HTMLElement)?.clientHeight || 800;
    const scrollTl = gsap.timeline({
      scrollTrigger: { trigger: scrollContainerRef.current, start: 'top 15%', end: `+=${paperHeight}`, scrub: 1, pin: true },
    });

    gsap.set('.scroll-paper', { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.set('.bottom-roller', { y: -paperHeight });

    scrollTl.to('.scroll-paper', { clipPath: 'inset(0% 0% 0% 0%)', duration: 2, ease: 'none' }, 0);
    scrollTl.to('.bottom-roller', { y: 0, duration: 2, ease: 'none' }, 0); 
    scrollTl.from('.menu-grid-card', { opacity: 0, y: 30, duration: 0.5, stagger: 0.2, ease: 'back.out(1.5)' }, 1);

    // 4. Testimonials Horizontal Scroll
    const testSections = gsap.utils.toArray('.test-card');
    gsap.to(testSections, {
      xPercent: -100 * (testSections.length - 1), ease: "none",
      scrollTrigger: { trigger: ".test-container", pin: true, scrub: 1, end: () => "+=" + ((document.querySelector(".test-container") as HTMLElement)?.offsetWidth || 0) }
    });

    // 5. Signature Creations Orbit Entry
    gsap.from('.orbit-item', {
      scrollTrigger: { trigger: '#showcase', start: 'top 60%', toggleActions: "play reverse play reverse" },
      scale: 0, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)'
    });

  }, { scope: mainRef });

  const scrollToSection = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); };

  const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <div ref={mainRef} className="relative overflow-hidden bg-secondary-beige min-h-screen font-sans">
      <div className="kolam-pattern fixed inset-0 z-0 pointer-events-none" />
      
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 will-change-transform ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-white/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-full bg-primary-maroon" />
            <span className="text-2xl font-serif font-bold text-primary-maroon tracking-tighter uppercase">DREAMS <span className="text-primary-gold">CATERING</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="#about" label="Heritage" />
            <NavLink href="#process" label="Process" />
            <NavLink href="#services" label="Services" />
            <NavLink href="#menu-scroll" label="Scroll" />
            <NavLink href="#showcase" label="The Feast" />
            <button onClick={() => scrollToSection('contact')} className="bg-primary-maroon text-primary-gold px-8 py-2.5 rounded-full font-bold border border-primary-gold/30 hover:bg-primary-maroon/90 shadow-lg">Book Now</button>
          </div>
          <button className="lg:hidden text-primary-maroon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden"><div className="w-[800px] h-[800px] absolute -top-20 -right-20 rounded-full border-[1px] border-primary-maroon opacity-10 animate-spin-slow"></div></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeUpVariant}>
            <p className="font-tamil font-black text-primary-maroon text-xl md:text-2xl mb-4 tracking-wide">பாரம்பரிய தென்னிந்திய உணவு விருந்து</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-secondary-brown leading-[1.1] mb-8">Authentic <span className="text-primary-maroon italic">South Indian</span> Heritage</h1>
            <p className="text-lg md:text-xl text-secondary-brown/70 mb-10 leading-relaxed max-w-lg">Experience the royalty of Chettinad, the richness of Mysore, and the simplicity of Tanjore in every bite.</p>
            <button onClick={() => scrollToSection('menu-scroll')} className="bg-primary-maroon text-primary-gold px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform">Unroll the Menu</button>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-8 border-white/80 bg-white/40">
              <img src="/assets/hero-thali.png" alt="South Indian Thali" className="w-full aspect-[4/5] object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* HERITAGE & STATS */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative"><img src="/assets/about-kitchen.png" alt="Kitchen" className="rounded-3xl shadow-2xl w-full aspect-square object-cover" /></div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeUpVariant}>
            <p className="font-tamil font-black text-primary-gold text-xl mb-4">எங்கள் கதை</p>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-brown mb-8 leading-tight font-serif">Preserving Culinary <br/><span className="text-primary-maroon italic">Artistry Since 1995</span></h2>
            <p className="text-lg text-secondary-brown/80 leading-relaxed mb-10">Founded on authenticity, Dreams Catering is the custodian of traditional South Indian recipes passed down through generations.</p>
            <div className="grid grid-cols-2 gap-6">
                <div><h3 className="text-3xl font-bold text-primary-maroon font-serif">30+</h3><p className="text-sm font-bold uppercase text-secondary-brown/60">Years Legacy</p></div>
                <div><h3 className="text-3xl font-bold text-primary-maroon font-serif">10k+</h3><p className="text-sm font-bold uppercase text-secondary-brown/60">Happy Guests</p></div>
            </div>
          </motion.div>
        </div>
      </section>
{/* VIRTUAL THALI EXPERIENCE */}
      <section ref={thaliContainerRef} className="relative h-screen w-full bg-secondary-beige flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-24 w-full text-center z-40 px-4">
          <p className="font-tamil font-black text-primary-gold text-xl mb-2">வாழை இலை விருந்து</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-maroon font-serif mb-4">The Traditional Serving</h2>
          <div className="w-16 h-1 bg-primary-gold mx-auto mb-4" />
          <p className="text-secondary-brown/80 italic max-w-lg mx-auto">Keep scrolling to experience the authentic order of a South Indian feast...</p>
        </div>
<br></br><br></br><br></br>
        {/* Responsive Container for the Leaf and Food */}
        {/* CHANGED: max-w-[1100px] and mt-40 to push images down away from text */}
        <div className="relative w-full max-w-[1100px] h-[60vh] flex items-center justify-center mt-40 origin-center will-change-transform">
          
          {/* Base Leaf */}
          {/* CHANGED: md:w-[1000px] and w-[95%] to make the leaf bigger */}
          <img src="/assets/banana-leaf.png" alt="Banana Leaf" className="thali-leaf absolute w-[95%] md:w-[1000px] object-contain drop-shadow-2xl" />

          {/* Center Main */}
          <img src="/assets/rice.png" alt="Rice" className="thali-rice absolute z-10 w-[35%] md:w-[250px] left-[36%] bottom-[20%] drop-shadow-lg" />
          <img src="/assets/poriyal.png" alt="Poriyal"  className="thali-poriyal absolute z-10 w-[12%] md:w-[100px] bottom-[20%] left-[25%] drop-shadow-md"  />

          {/* Right Side Curries */}
          <img src="/assets/sambar.png" alt="Sambar" className="thali-sambar absolute z-20 w-[15%] md:w-[120px] right-[30%] bottom-[40%] drop-shadow-md" />
          <img src="/assets/rasam.png" alt="Rasam" className="thali-rasam absolute z-20 w-[14%] md:w-[110px] right-[25%] bottom-[20%] drop-shadow-md" />

          {/* Top Half Veggies */}
          <img src="/assets/appalam.png" alt="Appalam" className="thali-appalam absolute z-30 w-[20%] md:w-[120px] left-[25%] top-[25%] drop-shadow-xl" />
          
          <img src="/assets/jilebi.png" alt="jilebi" className="thali-kootu absolute z-10 w-[12%] md:w-[50px] left-[45%] top-[8%] drop-shadow-md" />
          <img src="/assets/pickle.png" alt="Pickle" className="thali-pickle absolute z-10 w-[8%] md:w-[60px] left-[15%] top-[35%] drop-shadow-lg" />

          {/* Off-Leaf Items */}
          <img src="/assets/tumbler.png" alt="Water Tumbler" className="thali-tumbler absolute z-10 w-[10%] md:w-[100px] right-[25%] top-[10%] drop-shadow-lg" />
        </div>
      </section>
      {/* UPDATED: THE ROYAL PROCESS (Horizontal & Centered) */}
      <section id="process" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeUpVariant} className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-maroon font-serif mb-4">The Royal Making</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto" />
            <p className="mt-6 text-secondary-brown/70 italic max-w-2xl mx-auto">Our journey from farm to the royal feast.</p>
          </motion.div>
          
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full">
            {/* GSAP Animated Horizontal Line */}
            <div className="hidden md:block absolute top-[3rem] left-0 w-full h-[2px] bg-secondary-brown/10 z-0"></div>
            <div className="process-line hidden md:block absolute top-[3rem] left-0 h-[3px] bg-primary-gold z-10" style={{ width: '0%' }}></div>
            
            {cookingProcess.map((step, i) => (
              <div key={i} className="process-step relative z-20 flex flex-col items-center text-center w-full md:w-1/4 px-4 mb-12 md:mb-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-maroon border-4 border-white flex items-center justify-center text-primary-gold font-serif text-2xl font-bold shadow-[0_10px_20px_rgba(107,23,31,0.3)] mb-6 transition-transform hover:scale-110 cursor-pointer">{step.step}</div>
                <h3 className="text-2xl font-serif text-secondary-brown font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-secondary-brown/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION (Spacing Fixed with pb-32) */}
      <section id="services" className="pt-24 pb-40 px-6 md:px-12 relative overflow-hidden bg-secondary-beige">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-brown font-serif mb-4">Elevating Every Occasion</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto" />
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-white p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 mb-6 overflow-hidden rounded-2xl"><img src={service.img} alt={service.title} className="w-full h-full object-cover" /></div>
              <h3 className="text-2xl font-bold text-primary-maroon font-serif mb-4">{service.title}</h3>
              <p className="text-secondary-brown/80">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE ROYAL SCROLL SECTION (With Food Texture inside Paper) */}
      <section id="menu-scroll" className="py-20 relative bg-secondary-brown min-h-screen">
        <div className="text-center mb-10"><h2 className="text-4xl md:text-5xl font-bold text-primary-gold font-serif mb-4">The Royal Feast</h2><p className="text-secondary-beige/70 italic">Scroll slowly to unroll the ancient menu...</p></div>
        <div ref={scrollContainerRef} className="relative w-full max-w-5xl mx-auto px-4 mt-10">
            <div className="relative z-30 w-full h-12 md:h-16 bg-gradient-to-b from-[#5c3a21] via-[#a67c52] to-[#5c3a21] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-x-[12px] border-[#d4af37] flex items-center justify-center"><div className="w-[98%] h-[2px] bg-black/20" /></div>
            
            {/* Scroll Paper with Base Ancient Texture */}
            <div className="scroll-paper relative z-20 w-[94%] mx-auto shadow-2xl bg-[#f4e4bc] border-x-4 border-black/10 origin-top overflow-hidden" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")', boxShadow: 'inset 0 0 50px rgba(107,23,31,0.1)' }}>
                
                {/* 🌟 NEW: Traditional Food Spices Watermark Background 🌟 */}
                <div className="absolute inset-0 z-0 opacity-[0.07] mix-blend-multiply" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1000&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                <div className="p-10 md:p-16 relative z-10">
                    <div className="text-center mb-12"><img src="/logo.png" alt="Emblem" className="w-16 h-16 mx-auto mb-4 opacity-50 contrast-200 sepia" /><h3 className="font-serif text-3xl md:text-4xl font-black text-primary-maroon uppercase tracking-[0.3em] border-b-2 border-primary-maroon/20 pb-4 inline-block">Grand Menu</h3></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {royalMenu.map((item, i) => (
                            <div key={i} className="menu-grid-card bg-white/60 backdrop-blur-sm border border-[#d2b48c] p-8 rounded-tr-3xl rounded-bl-3xl shadow-md hover:bg-white/90 transition-colors duration-300 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-gold/20 rounded-bl-full transition-transform group-hover:scale-150" />
                                <h4 className="font-bold text-xl md:text-2xl text-secondary-brown font-serif mb-3 relative z-10">{item.name}</h4>
                                <p className="text-secondary-brown/80 italic text-sm md:text-base leading-relaxed relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom-roller relative z-30 w-full h-12 md:h-16 bg-gradient-to-b from-[#5c3a21] via-[#a67c52] to-[#5c3a21] rounded-full shadow-[0_20px_30px_rgba(0,0,0,0.6)] border-x-[12px] border-[#d4af37] -mt-2 flex items-center justify-center"><div className="w-[98%] h-[2px] bg-black/20" /></div>
        </div>
      </section>

      {/* UPDATED: GRAND THALI SHOWCASE (Optimized Lag-Free Animation) */}
      <section id="showcase" className="py-32 bg-white relative overflow-hidden">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeUpVariant} className="text-center mb-20 relative z-10">
          <p className="font-tamil font-black text-primary-gold text-xl mb-4">சுவை மற்றும் மணம்</p><h2 className="text-4xl md:text-5xl font-bold text-primary-maroon font-serif mb-4">Signature Creations</h2>
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="relative h-[500px] md:h-[800px] flex items-center justify-center">
            {/* CSS Only Spin (No Framer Motion JS lag) */}
            <div className="absolute w-[280px] md:w-[500px] h-[280px] md:h-[500px] border-[2px] border-primary-gold/30 rounded-full border-dashed animate-spin-slow" />
            
            <div className="z-20 w-40 md:w-80 h-40 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white"><img src="/assets/menu-main-center.png" alt="Center Dish" className="w-full h-full object-cover" /></div>
            
            {menuItems.map((item) => (
              // Pre-calculated static positions, animated by GSAP for performance
              <div key={item.id} className="orbit-item absolute z-30 flex flex-col items-center group cursor-pointer" style={{ transform: `translate(${Math.cos(item.angle * (Math.PI / 180)) * (window.innerWidth < 768 ? 140 : 350)}px, ${Math.sin(item.angle * (Math.PI / 180)) * (window.innerWidth < 768 ? 140 : 350)}px)` }}>
                <div className="w-20 md:w-40 h-20 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3 bg-white"><img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                <div className="bg-white/95 px-4 py-1 rounded-full shadow-md"><p className="text-primary-maroon font-bold text-xs md:text-lg whitespace-nowrap">{item.name}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="test-container py-24 bg-secondary-beige overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary-brown font-serif mb-16">Words from our Guests</h2>
        <div className="flex w-[300vw] lg:w-[200vw] gap-10 px-10">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="test-card w-full lg:w-1/2 flex-shrink-0 bg-white border border-white p-12 rounded-[3rem] shadow-lg">
                    <div className="flex gap-2 text-primary-gold mb-6">{[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}</div>
                    <p className="text-2xl font-serif text-secondary-brown italic mb-8">"The food was absolutely divine. It felt like a royal feast straight out of a palace. Every guest was raving about the traditional thali!"</p>
                    <p className="font-bold text-primary-maroon uppercase tracking-widest">- Happy Client {item}</p>
                </div>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary-maroon pt-20 pb-10 px-6 md:px-12 text-primary-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8"><img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain rounded-full bg-primary-gold p-1" /><span className="text-3xl font-serif font-bold tracking-tighter uppercase text-white">DREAMS <span className="text-primary-gold">CATERING</span></span></div>
              <p className="text-lg text-white/70 max-w-md leading-relaxed">Weaving stories through flavors since 1995. Preserving the rich culinary traditions of South India.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Quick Links</h4>
              <ul className="space-y-4 font-sans opacity-80"><li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Our Heritage</button></li><li><button onClick={() => scrollToSection('menu-scroll')} className="hover:text-white transition-colors">The Scroll</button></li></ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Working Hours</h4>
              <ul className="space-y-4 font-sans opacity-80"><li className="flex items-center gap-3"><Clock size={16} /> 09:00 AM - 08:00 PM</li><li>Mon - Sun (Open All Days)</li></ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm font-bold"><p>© 2026 Dreams Catering Services. Crafted with Tradition in Chennai.</p></div>
        </div>
      </footer>
    </div>
  );
};

export default App;