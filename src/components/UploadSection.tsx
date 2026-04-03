import { detectHelmet, detectHelmetVideo } from "@/services/helmetApi";
import { useState, useCallback } from "react";
import { Upload, Image, Video, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import DetectionResult from "./DetectionResult";

type DetectionStatus = "idle" | "scanning" | "helmet" | "no-helmet";

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>("idle");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDetectionStatus("idle");
  };

  const clearFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setDetectionStatus("idle");
  };

  // 🔥 REAL DETECTION FUNCTION (NO FAKE LOGIC)
  const runDetection = async () => {
    if (!uploadedFile) return;

    try {
      setDetectionStatus("scanning");

      let data;

      console.log("File type:", uploadedFile.type);

      if (uploadedFile.type.startsWith("video/")) {
        console.log("Calling VIDEO API");
        data = await detectHelmetVideo(uploadedFile);
      } else {
        console.log("Calling IMAGE API");
        data = await detectHelmet(uploadedFile);
      }

      console.log("Backend Response:", data);

      if (data.result === "Without Helmet") {
        setDetectionStatus("no-helmet");
      } else {
        setDetectionStatus("helmet");
      }

    } catch (error) {
      console.error("Error:", error);
      setDetectionStatus("idle");
    }
  };

  return (
    <section className="py-20 relative" id="detect">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Detection Zone</h2>
          <p className="text-muted-foreground">
            Upload an image or video to detect helmet compliance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed p-12 text-center cursor-pointer ${
                isDragging ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="fileInput"
              />

              <label htmlFor="fileInput" className="cursor-pointer">
                <Upload className="mx-auto mb-4" />
                <p>Click or Drag & Drop file here</p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative border p-4">
                <button onClick={clearFile} className="absolute top-2 right-2">
                  <X />
                </button>

                {uploadedFile.type.startsWith("image/") ? (
                  <img src={previewUrl!} className="w-full" />
                ) : (
                  <video src={previewUrl!} controls className="w-full" />
                )}

                {detectionStatus === "scanning" && (
                  <p className="text-center mt-4">Scanning...</p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span>{uploadedFile.name}</span>
                <Button onClick={runDetection}>
                  {detectionStatus === "scanning" ? "Analyzing..." : "Run Detection"}
                </Button>
              </div>

              <DetectionResult status={detectionStatus} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;