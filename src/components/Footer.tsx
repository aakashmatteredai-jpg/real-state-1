
export default function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-gray-100">
      <div className="section-container flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32">
        <div className="max-w-xs">
          <div className="text-3xl font-bold tracking-tight text-rialta-navy mb-6">Rialta</div>
          <p className="text-rialta-navy/50 leading-relaxed mb-8">
            Setting a modern standard for premium real estate experiences through curated quality and client-first support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-10 flex-grow">
          <div>
            <h4 className="font-bold text-rialta-navy mb-6">Explore</h4>
            <ul className="space-y-4 text-rialta-navy/60">
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Properties</a></li>
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Transactions</a></li>
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Market Reports</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-rialta-navy mb-6">Company</h4>
            <ul className="space-y-4 text-rialta-navy/60">
              <li><a href="#" className="hover:text-rialta-tan transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-rialta-navy mb-6">Legal</h4>
            <ul className="space-y-4 text-rialta-navy/60">
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rialta-tan transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-rialta-navy mb-6">Newsletter</h4>
            <p className="text-rialta-navy/50 text-sm mb-4">Subscribe to receive the latest property updates.</p>
            <div className="flex bg-gray-50 rounded-xl overflow-hidden p-1 border border-gray-100">
              <input type="email" placeholder="Email address" className="bg-transparent border-none px-4 py-2 text-sm flex-grow focus:outline-none" />
              <button className="bg-rialta-navy text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-rialta-tan transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-rialta-navy/30 text-xs">
          © 2026 Rialta Luxury Real Estate. All rights reserved.
        </p>
        <p className="text-rialta-navy/30 text-xs flex items-center gap-1">
          Made with excellence in Beverly Hills
        </p>
      </div>
    </footer>
  );
}
