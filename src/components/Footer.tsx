import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">H.E.A.D.S.</span>
          </div>

          {/* Info */}
          <p className="text-sm text-muted-foreground text-center">
            AI-Powered Helmet Detection System – Promoting Road Safety Through Smart Governance
          </p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prototype Demo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
