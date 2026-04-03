import { Brain, Camera, Zap, Lock, Database, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced computer vision algorithms analyze images in real-time to detect helmet presence with high accuracy.",
    color: "primary",
  },
  {
    icon: Camera,
    title: "Multi-Format Support",
    description: "Process both images and video files to analyze rider compliance across various media types.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Get detection results within seconds, enabling rapid response to traffic violations.",
    color: "warning",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "All data is processed securely with no permanent storage of personal information.",
    color: "success",
  },
  {
    icon: Database,
    title: "Automated Challan",
    description: "Automatic generation of traffic violation challans with complete incident documentation.",
    color: "destructive",
  },
  {
    icon: Globe,
    title: "Scalable Solution",
    description: "Designed to integrate with existing traffic management infrastructure nationwide.",
    color: "primary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            System <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            H.E.A.D.S. combines cutting-edge technology with smart governance to revolutionize road safety enforcement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                <div className={`
                  inline-flex p-4 rounded-xl mb-4 transition-all duration-300
                  ${feature.color === "primary" ? "bg-primary/10 group-hover:bg-primary/20" : ""}
                  ${feature.color === "accent" ? "bg-accent/10 group-hover:bg-accent/20" : ""}
                  ${feature.color === "warning" ? "bg-warning/10 group-hover:bg-warning/20" : ""}
                  ${feature.color === "success" ? "bg-success/10 group-hover:bg-success/20" : ""}
                  ${feature.color === "destructive" ? "bg-destructive/10 group-hover:bg-destructive/20" : ""}
                `}>
                  <feature.icon className={`
                    w-6 h-6
                    ${feature.color === "primary" ? "text-primary" : ""}
                    ${feature.color === "accent" ? "text-accent" : ""}
                    ${feature.color === "warning" ? "text-warning" : ""}
                    ${feature.color === "success" ? "text-success" : ""}
                    ${feature.color === "destructive" ? "text-destructive" : ""}
                  `} />
                </div>
                
                <h3 className="font-display text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
