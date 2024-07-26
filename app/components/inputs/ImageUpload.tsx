"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "dguoxeu4");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/nomadhubworldwide/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onChange(data.secure_url);
      } catch (error) {
        console.error("Upload error:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  return (
    <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
      />
      <TbPhotoPlus size={50} />
      <div className="font-bold text-lg">
        {uploading ? "Uploading..." : "Click to upload"}
      </div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            alt="Upload"
            fill
            style={{ objectFit: "cover" }}
            src={value}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;