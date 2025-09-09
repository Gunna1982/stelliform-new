import { useEffect } from "react";

export default function App() {
  // Scrollspy: highlight nav link for the section in view
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("header[id], section[id]"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]'));
    const byId = new Map<string, HTMLAnchorElement>();
    links.forEach((a) => {
      const id = a.getAttribute("href")!.slice(1);
      byId.set(id, a);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const link = byId.get(e.target.id);
          if (!link) continue;
          if (e.isIntersecting) {
            links.forEach((l) => l.removeAttribute("data-active"));
            link.setAttribute("data-active", "true");
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b bg-black/50 border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-wide">Stelliform</a>
          <div className="flex items-center gap-2">
            <a href="#home" className="rounded-full px-3 py-1 text-sm text-white/85 hover:text-white">Home</a>
            <a href="#services" className="rounded-full px-3 py-1 text-sm text-white/85 hover:text-white">Services</a>
            <a href="#why" className="rounded-full px-3 py-1 text-sm text-white/85 hover:text-white">Why Us</a>
            <a href="#contact" className="rounded-full px-3 py-1 text-sm text-white/85 hover:text-white">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO with background video */}
     <header id="home" className="relative min-h-[70vh] grid place-items-center px-6 overflow-hidden">
  {/* background layer */}
  <div aria-hidden className="absolute inset-0 z-0">
    <video
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-poster.jpg"
      style={{ filter: "saturate(.85) brightness(.9) contrast(1.05)" }}
      onError={(e) => console.warn("Hero video failed to load", e.currentTarget.currentSrc)}
    >
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4"  type="video/mp4" />
    </video>

    {/* dark overlay for readability */}
    <div className="absolute inset-0 bg-black/55" />
    {/* subtle brand glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(60vmax 60vmax at 12% 85%, color-mix(in srgb, var(--brand-gold) 12%, transparent), transparent 60%),
          radial-gradient(50vmax 50vmax at 82% 18%, color-mix(in srgb, var(--brand-gold-2) 10%, transparent), transparent 60%)
        `,
      }}
    />
  </div>

  {/* foreground content */}
  <div className="relative z-10 text-center max-w-4xl">
    <p className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs tracking-widest">
      Where Industry Leaders Turn for Scalable Growth
    </p>

    <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[0.9]">
      Strategic Growth for{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-gold-strong)] via-[var(--brand-gold)] to-[var(--brand-gold-2)]">
        Driven Businesses
      </span>
    </h1>

    <p className="mt-6 text-white/90 max-w-3xl mx-auto">
      Stelliform analyzes, optimizes, and scales purpose-driven businesses — removing inefficiencies, aligning operations and marketing, and building credibility that compounds.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#contact"
        className="px-8 py-4 rounded-2xl font-semibold text-black shadow-lg transition-transform"
        style={{
          background: "linear-gradient(90deg, var(--brand-gold-strong), var(--brand-gold))",
          boxShadow: "0 18px 40px rgba(230,183,10,.45)",
        }}
      >
        Book a Consultation
      </a>
      <a
        className="px-8 py-4 rounded-2xl border-2 text-white font-semibold bg-white/10"
        href="#contact"
        style={{ borderColor: "rgba(255,255,255,.25)" }}
      >
        Start Your Strategic Audit
      </a>
    </div>
  </div>
</header>

      {/* SERVICES (light) */}
      <section id="services" className="scroll-mt-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold">Built in Layers, Measured for Growth</h2>
            <p className="mt-4 text-slate-600">Strengthen foundation → launch targeted initiatives → sustain growth.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Business Systems & Operational Analysis","Uncover bottlenecks, inefficiencies, and hidden obstacles."],
              ["Strategic Solutions","Implement tailored frameworks that scale cleanly."],
              ["Marketing Alignment","Campaigns that amplify your unique model."],
              ["Reputation Management","Review velocity, brand positioning, trust signals."],
              ["Lead Gen & Growth Marketing","Initiatives that drive acquisition and revenue."],
            ].map(([t,d])=>(
              <article key={t as string} className="p-6 rounded-3xl bg-white shadow-md ring-1 ring-slate-200">
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="mt-2 text-slate-600">{d}</p>
                <a href="#contact" className="mt-3 inline-block font-semibold" style={{ color: "var(--brand-gold-strong)" }}>
                  Start Your Strategic Audit →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY (light) */}
      <section id="why" className="scroll-mt-24 bg-slate-50 text-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Why Choose <span style={{ color:"var(--brand-gold-strong)" }}>Us?</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              ["Industry Expertise","Deep knowledge across high-value sectors."],
              ["Tailored Solutions","Custom frameworks for your exact challenges."],
              ["Measurable Results","Data-driven growth and ROI you can track."],
              ["Credibility & Trust","Professionalism and integrity that elevate your brand."],
            ].map(([t,d])=>(
              <article key={t as string} className="p-8 rounded-3xl bg-white ring-1 ring-slate-200">
                <h3 className="text-2xl font-bold mb-2">{t}</h3>
                <p className="text-slate-600">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT with raw GHL iframe (works without extra scripts) */}
      <section id="contact" className="scroll-mt-24 bg-gradient-to-b from-[var(--brand-ink)] via-slate-900 to-[var(--brand-ink)] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-4">
              <div className="h-[1120px]">
                <iframe
                  src="https://clients.sonoreviews.com/widget/form/qgEwrwA0T2Cpp90yzBWl"
                  title="Stelliform Contact Us"
                  style={{ width: "100%", height: "100%", border: "none", borderRadius: 12 }}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-bold">
                Ready to Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-gold-strong)] to-[var(--brand-gold)]">Legacy?</span>
              </h3>
              <p className="text-white/85 mt-4">Tailored strategies to accelerate growth and build enduring credibility.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-2xl px-6 py-3 font-semibold text-black"
                  style={{ background:"linear-gradient(90deg, var(--brand-gold-strong), var(--brand-gold))", boxShadow:"0 14px 36px rgba(230,183,10,.35)" }}
                >
                  Book a Consultation
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-2xl border-2 text-white font-semibold bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,.25)" }}
                >
                  Start Your Strategic Audit
                </a>
              </div>
              <ul className="mt-6 text-white/80 list-disc ml-5 space-y-1">
                <li>Fast response and clear next steps</li>
                <li>No obligation — free reputation/systems snapshot</li>
                <li>Actionable recommendations in 24–48 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Stelliform LLC — Illuminating Excellence
      </footer>
    </div>
  );
}
