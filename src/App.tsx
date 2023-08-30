import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [advice, setAdvice] = useState("");
  const [res, setRes] = useState<any>(null);

  const fetchImage = async () => {
    const unsplashKey = "API_KEY";
    const collectionId = 4809869;
    const data = await fetch(
      `https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${unsplashKey}&w=1920&h=1080&crop=entropy&fit=crop`
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
      console.log(json.slip.advice);
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
    <div className="App">
      {res && 
    <img
      className="col-3 img-fluid img-thumbnail"
      src={res.urls.small}
      alt="val.alt_description"
    />}
      {advice}
    </div>
  );
}

export default App;