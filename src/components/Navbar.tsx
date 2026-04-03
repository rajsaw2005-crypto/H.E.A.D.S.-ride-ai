import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToDetect = () => {
    document.getElementById("detect")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-lg font-bold tracking-wider">
              H.E.A.D.S.
            </span>
          </div>

          {/* CTA */}
          <Button variant="outline" size="sm" onClick={scrollToDetect}>
            Try Detection
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
