import { Shield, ShieldAlert, FileWarning, User, Calendar, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type DetectionStatus = "idle" | "scanning" | "helmet" | "no-helmet";

interface DetectionResultProps {
  status: DetectionStatus;
}

const DetectionResult = ({ status }: DetectionResultProps) => {
  if (status === "idle" || status === "scanning") return null;

  const isHelmetDetected = status === "helmet";

  // Generate random challan data
  const challanData = {
    challanNo: `TRF${Date.now().toString().slice(-8)}`,
    date: new Date().toLocaleDateString("en-IN"),
    time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    location: "Junction 14, MG Road",
    fine: "₹1,000",
    violation: "Riding without helmet - Section 129 MV Act",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {isHelmetDetected ? (
          // Safe Result
          <div className="rounded-2xl bg-success/10 border border-success/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="p-6 rounded-full bg-success/20 glow-success"
              >
                <Shield className="w-12 h-12 text-success" />
              </motion.div>
              
              <div className="text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-2xl md:text-3xl font-bold text-success mb-2"
                >
                  Helmet Detected
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-success/80 text-lg"
                >
                  Safe Ride Confirmed – No Violation
                </motion.p>
              </div>
            </div>
          </div>
        ) : (
          // Violation Result
          <div className="space-y-6">
            {/* Alert Banner */}
            <div className="rounded-2xl bg-destructive/10 border border-destructive/30 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="p-6 rounded-full bg-destructive/20 glow-destructive"
                >
                  <ShieldAlert className="w-12 h-12 text-destructive" />
                </motion.div>
                
                <div className="text-center md:text-left">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-2xl md:text-3xl font-bold text-destructive mb-2"
                  >
                    No Helmet Detected
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-destructive/80 text-lg"
                  >
                    Traffic Violation Identified – Generating Challan
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Challan Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl bg-card border border-warning/30 overflow-hidden"
            >
              {/* Challan Header */}
              <div className="bg-warning/10 border-b border-warning/20 p-4 flex items-center gap-3">
                <FileWarning className="w-6 h-6 text-warning" />
                <h4 className="font-display text-lg font-semibold text-warning">
                  Traffic Challan Generated
                </h4>
              </div>

              {/* Challan Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <FileWarning className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Challan No.</p>
                      <p className="font-mono font-semibold">{challanData.challanNo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Vehicle Owner</p>
                      <p className="font-semibold">Pending Identification</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold">{challanData.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-semibold">{challanData.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary md:col-span-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-semibold">{challanData.location}</p>
                    </div>
                  </div>
                </div>

                {/* Violation Details */}
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-muted-foreground mb-1">Violation</p>
                  <p className="font-semibold text-destructive">{challanData.violation}</p>
                </div>

                {/* Fine Amount */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <span className="font-display text-lg">Fine Amount</span>
                  <span className="font-display text-3xl font-bold text-warning">{challanData.fine}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="warning" className="flex-1">
                    Download Challan
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Report Issue
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default DetectionResult;
