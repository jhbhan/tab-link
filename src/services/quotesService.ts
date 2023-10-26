export const fetchImage = async () => {
    const unsplashKey = "UVrem5z1U-JBNJ2UPNpZk0HuTLUpWbIG2O8KAtgrkwA";
    const collectionId = 4809869;
    const data = await fetch(
      `https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${unsplashKey}&w=1920&h=1080&crop=entropy&fit=crop&auto=format&q=70&fm=jpg`
    );
    const dataJ = await data.json();
    return dataJ;
  };
  
const adviceUrl = "https://api.adviceslip.com/advice";

export const fetchAdvice = async () => {
try {
    const response = await fetch(adviceUrl);
    const json = await response.json();
    return(json.slip.advice);
} catch (error) {
    console.log("error", error);
}
};