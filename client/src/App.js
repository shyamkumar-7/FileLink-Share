import { useRef, useState, useEffect } from "react";
import "./App.css";
import { uploadFile } from "./services/api";
// import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const textAreaRef = useRef(null);

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  // console.log(file)

  const handleRefresh = () => {
    // Reload the page or perform any other refresh logic here
    window.location.reload();
  };

  
  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };
  

  return (
    <div className="container">
      <div className="center">
        <h1 className="heading">Share your Files</h1>
        <p>Upload and share the download link!</p>
        <br />
        <button onClick={() => handleClick()} className="btn-1">
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
         

        <div>
        <input
            ref={textAreaRef}
            type="text"
            value={result}
            readOnly
            style={{ position: "absolute", left: "-9999px" }}
          />

          {result && (
          <>
            <a href={result} target="_blank" rel="noopener noreferrer">
              {result}
            </a>
            <button onClick={() => handleCopy()} className="btn-3">
              Copy
            </button>
            {/* {isCopied && <div className="toast">Link copied to clipboard!</div>} */}
            {isCopied && <div className={`toast ${isCopied ? 'show' : ''}`}>Link copied to clipboard!</div>}

          </>
          )}
          <button onClick={() => handleRefresh()} className="btn-2">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
