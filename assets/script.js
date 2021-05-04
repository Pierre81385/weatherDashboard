var appID = "879fa5a3379aff15dec6456e147800b1";
var idList = [];

var currentCity = $("#currentCity");
var currentTemp = $("#currentTemp");
var currentWind = $("#currentWind");
var currentHumidity = $("#currentHumidity");
var currentUV = $("#currentUV");

//add event listener for search button press

var searchButton = $("#searchButton");
searchButton.on("click", function (event) {
  event.preventDefault();
  search();
});

var histButtonPressed = $(".histButton");
histButtonPressed.on("click", function (event) {
  event.preventDefault();
  console.log("searched item pressed");
  search();
});

//function to create buttons based on search

function search() {
  var searchInput = document.getElementById("searchInput").value;
  var searchHistory = document.getElementById("searchHistoryButtons");
  var button = document.createElement("button");
  var buttonName = document.createTextNode(searchInput);

  if (searchInput == "") {
    alert("You must enter a valid city name!");
  } else {
    console.log(buttonName);
    button.className = "form-control histButton";
    button.id = searchInput;
    button.appendChild(buttonName);
    searchHistory.appendChild(button);
    idList.push(button.id);
    console.log(idList);
    localStorage.setItem("city", JSON.stringify(idList));
    var name = JSON.parse(localStorage.getItem("city"));
    console.log(name + " saved");

    var latValue;
    var lonValue;

    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        searchInput +
        "&limit=1&appid=879fa5a3379aff15dec6456e147800b1"
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        latValue = data[0].lat;
        console.log(latValue);
        lonValue = data[0].lon;
        console.log(lonValue);

        currentCity.text(data[0].name);

        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            latValue +
            "&lon=" +
            lonValue +
            "&exclude=alerts&appid=" +
            appID
        )
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            currentTemp.text("Temp: " + data["current"].temp);
            currentWind.text("Wind: " + data["current"].wind_speed);
            currentHumidity.text("Humidity: " + data["current"].humidity);
            currentUV.text("UV Index: " + data["current"].uvi);
          });
      });
  }
}

saveSearch();

//function to create buttons based on search history saved to local storage

function saveSearch() {
  var name = JSON.parse(localStorage.getItem("city"));
  console.log(name + " saved");

  for (var i = 0; i < name.length; i++) {
    console.log(name[i]);
    var searchHistory = document.getElementById("searchHistoryButtons");
    var button = document.createElement("button");
    var buttonName = document.createTextNode(name[i]);
    button.className = "form-control histButton";
    button.id = name[i];
    button.appendChild(buttonName);
    searchHistory.appendChild(button);
  }
}

//funtion to get weather information

function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      latValue +
      "&lon=" +
      lonValue +
      "&exclude=alerts&appid=" +
      appID
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
