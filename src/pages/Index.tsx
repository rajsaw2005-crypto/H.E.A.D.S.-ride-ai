import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <UploadSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};
export async function detectHelmet(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/detect", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}

export default Index;
