import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null); 
  };

  const handleScan = async () => {
    if (!file) {
      alert("Please select a QR code image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Talking to the Backend on Port 5000
      const response = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      console.error("Error talking to robot:", error);
      alert("Error! Is your Backend running?");
    }
    
    setLoading(false);
  };

  return (
    <div className="scanner-box">
      <h1>🕵️‍♂️ QR Detective</h1>
      <p>Upload a QR Code to check for traps.</p>
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <br />
      
      <button onClick={handleScan} disabled={loading}>
        {loading ? "Scanning..." : "Scan Now"}
      </button>

      {result && (
        <div className={result.isSafe ? "result-safe" : "result-danger"}>
          <h3>{result.isSafe ? "✅ Safe!" : "⚠️ DANGER!"}</h3>
          <p><strong>Link:</strong> {result.url}</p>
          <p><strong>Note:</strong> {result.message}</p>
        </div>
      )}
    </div>
  )
}

export default App