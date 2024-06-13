/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=18ac8682ca5e84f19d2c319d17768434";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeatherData(url, zip, apiKey)
    .then((newData) => {
      const data = {
        temp: Math.round(newData.main.temp),
        city: newData.name,
        date: newDate,
        userInput: feelings,
        icon: newData.weather[0].icon,
      };
      postData("/add", data);
    })
    .then(retreiveData);
}

//fetch data from web api
const getWeatherData = async (url, zip, apiKey) => {
  const response = await fetch(url + zip + apiKey);
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error, "error");
  }
};

//Post request to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Get all the data from the server and dynamicly modyifying the UI
const retreiveData = async () => {
  const res = await fetch("/all");
  try {
    const data = await res.json();
    console.log(data);
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById("content").innerHTML = data.userInput;
    document.getElementById("city").innerHTML = data.city;
    document.getElementById("temp").innerHTML = `${data.temp} °C.`;
    document.getElementById("icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.icon}@2x.png">`;
  } catch (error) {
    console.log("error", error);
  }
};
