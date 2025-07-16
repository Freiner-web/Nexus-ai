import { useState } from 'react';
import { supabase } from './supabase';

export default function UploadVideo() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('videos') // make sure you created a 'videos' bucket in Supabase
      .upload(fileName, file);

    if (error) {
      setMessage('Upload failed ❌');
      console.error(error);
    } else {
      setMessage(`Uploaded ✅: ${data.path}`);
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-white"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-500 px-4 py-2 rounded text-black"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
