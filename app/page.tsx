import Image from 'next/image';
import InquiryForm from '../components/InquiryForm';

async function getRoutes(databaseId: string) {
  const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${databaseId}/rows`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

export default async function Page() {
  const routesDbId = "e43c35f1-3660-4732-b3b8-ca4aebc808e8";
  const leadsDbId = "a8191d34-6fc2-4aac-8c12-e9168ca1714b";
  const routes = await getRoutes(routesDbId);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center border-b-[8px] border-[#4A3728]">
        <Image 
          src="/images/close-up-overhead-shot-of-a-vintage-topo.png"
          alt="Vintage topography tools"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-[#F4ECD8] px-4 max-w-4xl">
          <p className="uppercase tracking-[0.4em] text-sm mb-4 font-body font-bold">Ridgebound Expedition Logistics</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">Precision Logistics for the Great Unknown.</h1>
          <p className="text-xl md:text-2xl font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            We handle the 40+ hours of paperwork, permit lotteries, and bush plane coordination so you can focus on the miles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#inquiry" className="btn-primary !bg-[#FF5733] hover:!bg-[#6B2D3E]">Start Your 2026 Expedition</a>
            <a href="#routes" className="btn-outline border-white text-white hover:bg-white hover:text-[#4A3728]">View High-Friction Routes</a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#2C3E50] text-[#F4ECD8] py-8 border-b-2 border-[#4A3728]">
        <div className="container mx-auto px-4 flex flex-wrap justify-around items-center gap-8 opacity-70">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif">100%</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Permit Success Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif">24/7</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Satellite Monitoring</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif">Verified</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Bush Plane Network</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif">Boots-on-Ground</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Cache Verification</span>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-24 container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">The Infrastructure Layer for Thru-Hiking.</h2>
          <div className="thick-rule w-24 mx-auto"></div>
          <p className="text-lg font-body text-[#4A3728]/80 max-w-2xl mx-auto">
            Adventure travel companies provide guides. Ridgebound provides the execution. We are the "Chief of Staff" for your expedition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif uppercase tracking-wider text-[#6B2D3E]">01. Permit Mastery</h3>
            <p className="font-body leading-relaxed">
              We navigate the Byzantine lotteries of the NPS and BLM. Our proprietary monitoring ensures you hit the window for the most restricted routes in the Sierra and Alaska.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif uppercase tracking-wider text-[#6B2D3E]">02. Remote Logistics</h3>
            <p className="font-body leading-relaxed">
              Bush plane coordination, 4x4 shuttle drops, and physical water caching in the desert. We handle the "Last Mile" where others fail.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif uppercase tracking-wider text-[#6B2D3E]">03. Technical Reliability</h3>
            <p className="font-body leading-relaxed">
              Custom GPX files, digital permit vaults, and 24/7 SOS monitoring. We are the calm voice and the Plan B in your ear when conditions turn.
            </p>
          </div>
        </div>
      </section>

      {/* Routes Database Section */}
      <section id="routes" className="py-24 bg-[#6B2D3E] text-[#F4ECD8] relative">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-serif mb-4">High-Complexity 2026 Routes</h2>
            <p className="font-body opacity-80">These routes require extreme logistical precision. We specialize in their execution.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {routes.map((route: any) => (
              <div key={route.id} className="border border-[#F4ECD8]/20 p-8 rounded-[4px] bg-[#2C3E50]/30 hover:bg-[#2C3E50]/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif">{route.data.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest border border-current px-2 py-1">{route.data.distance}</span>
                </div>
                <div className="space-y-4 font-body text-sm">
                  <p><strong className="text-[#FF5733] uppercase text-[10px] block mb-1">Complexity</strong> {route.data.complexity}</p>
                  <p><strong className="text-[#FF5733] uppercase text-[10px] block mb-1">Critical Challenge</strong> {route.data.challenges}</p>
                  <p className="opacity-60 italic">{route.data.permits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-24 bg-[#F4ECD8] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4A3728]/5 -skew-x-12"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-serif mb-6 leading-tight">Secure Your Slot for the 2026 Season.</h2>
              <p className="font-body text-lg mb-8 leading-relaxed">
                Permit lotteries for key July 2026 starts open as early as January. Submit your inquiry now to begin the strategic mapping phase.
              </p>
              <ul className="space-y-4 font-body">
                <li className="flex items-start">
                  <span className="text-[#FF5733] mr-3 font-bold">✓</span>
                  No-fee initial logistics audit
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5733] mr-3 font-bold">✓</span>
                  Guaranteed "Plan B" route development
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5733] mr-3 font-bold">✓</span>
                  Direct access to our certified contractor network
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full">
              <InquiryForm databaseId={leadsDbId} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121212] text-[#F4ECD8] py-16 border-t-[12px] border-[#6B2D3E]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <h2 className="text-3xl font-serif mb-6 uppercase tracking-tighter">Ridgebound</h2>
              <p className="font-body opacity-60 max-w-sm">
                Elite logistics for remote wilderness expeditions. Removing the administrative friction of remote travel since 2026.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs mb-4 tracking-widest text-[#FF5733]">Navigation</h4>
              <ul className="space-y-2 font-body text-sm opacity-80">
                <li><a href="#routes" className="hover:text-white">Routes</a></li>
                <li><a href="#inquiry" className="hover:text-white">Inquire</a></li>
                <li><a href="#" className="hover:text-white">Logistics Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs mb-4 tracking-widest text-[#FF5733]">Contact</h4>
              <p className="font-body text-sm opacity-80">
                raphael@baget.ai<br />
                Based in Bettles, AK & Escalante, UT
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:row justify-between text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">
            <span>&copy; 2026 Ridgebound Expedition Logistics. All Rights Reserved.</span>
            <span>Technical Authority / Rugged Reliability / Field Verified</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
