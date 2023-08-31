import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [advice, setAdvice] = useState("");
  const [res, setRes] = useState<any>(null);

  const fetchImage = async () => {
    const unsplashKey = "API_KEY";
    const collectionId = 4809869;
    const data = await fetch(
      `https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${unsplashKey}&w=1920&h=1080&crop=entropy&fit=crop&auto=format&q=70&fm=jpg`
    );
    const dataJ = await data.json();
    console.log(dataJ);
    setRes(dataJ);
  };
  
  const adviceUrl = "https://api.adviceslip.com/advice";

  const fetchAdvice = async () => {
    try {
      const response = await fetch(adviceUrl);
      const json = await response.json();
      setAdvice(json.slip.advice);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchImage();
    fetchAdvice();
  }, []);

  return (
    <>
    {res && advice &&
      <div className="App fade-in-image" style={{backgroundImage: `url(${res.urls.full})`}}>
        <div className="text-container">
          <h1 className="text">
            {advice}
          </h1>
        </div>
      </div>
    }
    {!res && 
      <div>Loading</div>
    }
    </>
  );
}

export default App;