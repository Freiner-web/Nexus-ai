import UploadVideo from "./components/UploadVideo";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Nexus AI Uploader</h1>
      <UploadVideo />
    </div>
  );
}

export default App;
