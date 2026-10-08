export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E8E2D8] bg-[#F4EFE6] text-[#57534E] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-xl font-serif font-bold text-[#1C1917]">
              შოთა რუსთაველი
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#78716C] leading-relaxed max-w-md">
              საგანმანათლებლო და კულტურული პორტალი, მიძღვნილი ქართული ოქროს ხანის, მსოფლიო რენესანსის წინამორბედი ეპოსისა და ჰუმანიზმის უდიდესი ძეგლისადმი.
            </p>
            <p className="text-xs font-serif italic text-[#881337]">
              „ბოროტსა სძლია კეთილმან, არსება მისი გრძელია!“
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1C1917] font-semibold">
              ნავიგაცია
            </h4>
            <ul className="text-xs space-y-2 font-serif">
              <li>
                <a href="#biography" className="hover:text-[#881337] transition-colors">
                  ბიოგრაფია და ოქროს ხანა
                </a>
              </li>
              <li>
                <a href="#characters" className="hover:text-[#881337] transition-colors">
                  „ვეფხისტყაოსნის“ გმირები
                </a>
              </li>
              <li>
                <a href="#aphorisms" className="hover:text-[#881337] transition-colors">
                  აფორიზმები და სიბრძნე
                </a>
              </li>
              <li>
                <a href="#shairi" className="hover:text-[#881337] transition-colors">
                  16-მარცვლიანი შაირის ლაბორატორია
                </a>
              </li>
              <li>
                <a href="#manuscripts" className="hover:text-[#881337] transition-colors">
                  ხელნაწერები და თარგმანები
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-[#881337] transition-colors">
                  ინტერაქტიული ვიქტორინა
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1C1917] font-semibold">
              კულტურული მემკვიდრეობა
            </h4>
            <p className="text-xs font-serif leading-relaxed text-[#78716C]">
              იუნესკოს „მსოფლიო მეხსიერების“ საერთაშორისო რეესტრში რეგისტრირებული ქართული ეროვნული საგანძური.
            </p>
            <div className="pt-2 text-xs font-mono text-[#78716C]">
              იერუსალიმის ჯვრის მონასტერი · გელათის აკადემია · თბილისი
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#E2D8C6] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-3">
          <p>© {currentYear} შოთა რუსთაველის კულტურული პორტალი. ყველა უფლება დაცულია.</p>
          <div className="flex items-center gap-4">
            <span>ქართული ლიტერატურის საგანძური</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
