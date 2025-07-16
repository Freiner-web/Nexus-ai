import { useState } from "react";
import supabase from "../supabase";

export default function UploadVideo() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const upload = async () => {
    if (!file) return;
    setUploading(true);

    const { data, error } = await supabase.storage
      .from("videos")
      .upload(`public/${file.name}`, file);

    if (data) {
      const { data: publicUrl } = supabase.storage
        .from("videos")
        .getPublicUrl(data.path);
      setUrl(publicUrl.publicUrl);
    }

    if (error) console.error("Upload error:", error.message);
    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={upload}
        disabled={uploading}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {url && (
        <div className="mt-4">
          <p>Video URL:</p>
          <a href={url} className="text-blue-400" target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
                      }
