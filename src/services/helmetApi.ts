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
export async function detectHelmetVideo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/detect-video", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}