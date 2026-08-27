/**
 * Resizes an image URL (blob or data URL) to a maximum width/height and returns a highly compressed base64 string.
 * This is used to store images directly in Firestore without exceeding the 1MB document limit.
 */
export async function compressImageToBase64(imageUrl, maxWidth = 300) {
  if (!imageUrl) return "";
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.floor((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.floor((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      
      // Compress to JPEG with 0.7 quality
      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      resolve(dataUrl);
    };

    img.onerror = () => {
      console.error("Failed to load image for compression", imageUrl);
      resolve(imageUrl); // fallback to original if it fails
    };

    img.src = imageUrl;
  });
}
