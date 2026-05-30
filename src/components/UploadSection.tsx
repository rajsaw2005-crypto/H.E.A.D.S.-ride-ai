import { detectHelmet, detectHelmetVideo } from "@/services/helmetApi";
import { useState, useCallback } from "react";
import { Upload, Image, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DetectionResult from "./DetectionResult";

type DetectionStatus = "idle" | "scanning" | "helmet" | "no-helmet";

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>("idle");
  const [plateNumber, setPlateNumber] = useState<string>("");

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
    if (file) processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDetectionStatus("idle");
    setPlateNumber(""); // reset
  };

  const clearFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setDetectionStatus("idle");
    setPlateNumber("");
  };

  const runDetection = async () => {
    if (!uploadedFile) return;

    try {
      setDetectionStatus("scanning");

      let data;

      if (uploadedFile.type.startsWith("video/")) {
        data = await detectHelmetVideo(uploadedFile);
      } else {
        data = await detectHelmet(uploadedFile);
      }

      console.log("Backend Response:", data);

      if (data.result === "Without Helmet") {
        setDetectionStatus("no-helmet");
      } else {
        setDetectionStatus("helmet");
      }

      // 🔥 SET PLATE
      setPlateNumber(data.plate || "");

    } catch (err) {
      console.error(err);
      setDetectionStatus("idle");
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {!uploadedFile ? (
          <div className="border-2 border-dashed p-10 text-center">
            <input type="file" onChange={handleFileSelect} />
          </div>
        ) : (
          <div className="space-y-6">

            {/* Preview */}
            <div className="relative border p-4 rounded-lg">
              <button onClick={clearFile} className="absolute top-2 right-2">
                <X />
              </button>

              {uploadedFile.type.startsWith("image/") ? (
                <img src={previewUrl!} className="w-full rounded" />
              ) : (
                <video src={previewUrl!} controls className="w-full rounded" />
              )}
            </div>

            {/* Button */}
            <Button onClick={runDetection}>
              {detectionStatus === "scanning" ? "Analyzing..." : "Run Detection"}
            </Button>

            {/* Result */}
            <DetectionResult status={detectionStatus} />

            {/* 🔥 NUMBER PLATE BOX */}
            {plateNumber && (
              <div className="bg-gray-100 border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Detected Number Plate</p>
                <p className="text-xl font-bold text-red-600">{plateNumber}</p>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;