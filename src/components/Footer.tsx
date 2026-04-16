import { MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-surface-2 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img src={logo} alt="SABBIR FITNESS" className="h-14 w-auto rounded mb-3" />
            <p className="text-muted-foreground text-sm">
              শরীর গঠন করুন, নিজেকে সুস্থ রাখুন
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">মূল্য তালিকা</a></li>
              <li><a href="#trainers" className="hover:text-primary transition-colors">প্রশিক্ষক</a></li>
              <li><a href="#admission" className="hover:text-primary transition-colors">ভর্তি ফর্ম</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">যোগাযোগ</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>৩৭ নং ওয়ার্ড, খালেদা সুপার মার্কেট (৪র্থ তলা), গাজীপুর</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>০১৯৯৯-৫৯৪৯৪৪ | ০১৬৮১-২৩৪৪৬২</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SABBIR FITNESS। সকল স্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
