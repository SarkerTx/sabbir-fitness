import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "হোম", href: "#" },
  { label: "আমাদের সম্পর্কে", href: "#about" },
  { label: "মূল্য তালিকা", href: "#pricing" },
  { label: "প্রশিক্ষক", href: "#trainers" },
  { label: "নোটিশ বোর্ড", href: "#notices" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between h-16 sm:h-18 md:h-20">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="SABBIR FITNESS" className="h-12 sm:h-16 md:h-18 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a href="#admission">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              ভর্তি হোন
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
            >
              {l.label}
            </a>
          ))}
          <a href="#admission" onClick={() => setOpen(false)}>
            <Button className="w-full bg-gradient-primary text-primary-foreground">ভর্তি হোন</Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
