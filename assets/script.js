var appID = "879fa5a3379aff15dec6456e147800b1";
var idList = [];
var fiveDayIcon = [];
var fiveDayTemp = [];
var fiveDayWind = [];
var fiveDayHumidity = [];
var buttonPressed = false;
var historicalCity = "";

var currentCity = $("#currentCity");
var currentTemp = $("#currentTemp");
var currentWind = $("#currentWind");
var currentHumidity = $("#currentHumidity");
var currentUV = $("#currentUV");

//add event listener for search button press

// var searchButton = $("#searchButton");
// searchButton.on("click", function () {
//   search();
// });

var historyDiv = $("#wrapper");
historyDiv.on("click", function (event) {
  var target = event.target;
  console.log(target);
  if (target.nodeName == "BUTTON") {
    buttonPressed = true;
    console.log(event.target);
    historicalCity = event.target.id;
    console.log("Event target ID: " + historicalCity);
    search();
  } else if (target.id == "searchButton") {
    search();
  } else {
    console.log("nothing");
    console.log(buttonPressed);
  }
});

// var histButtonPressed = $(".histButton");
// histButtonPressed.on("click", function (event) {
//   console.log("searched item pressed");
//   search();
// });

//function to create buttons based on search

function search() {
  var searchInput = "";
  if (buttonPressed == true) {
    console.log("button pressed true in search function");
    searchInput = historicalCity;
    idList.splice(0, idList.length);
    fiveDayTemp.splice(0, fiveDayTemp.length);
    fiveDayWind.splice(0, fiveDayWind.length);
    fiveDayHumidity.splice(0, fiveDayHumidity.length);
    fiveDayIcon.splice(0, fiveDayIcon.length);
  } else {
    searchInput = document.getElementById("searchInput").value;
    idList.splice(0, idList.length);
    fiveDayTemp.splice(0, fiveDayTemp.length);
    fiveDayWind.splice(0, fiveDayWind.length);
    fiveDayHumidity.splice(0, fiveDayHumidity.length);
    fiveDayIcon.splice(0, fiveDayIcon.length);
  }

  var searchHistory = document.getElementById("searchHistoryButtons");
  var button = document.createElement("button");
  var buttonName = document.createTextNode(searchInput);

  if (searchInput == "") {
    alert("You must enter a valid city name!");
  } else {
    if (buttonPressed == false) {
      console.log(buttonName);
      button.className = "form-control histButton btn-secondary";
      button.id = searchInput;
      button.appendChild(buttonName);
      searchHistory.appendChild(button);
      idList.push(button.id);
      console.log(idList);
      localStorage.setItem("city", JSON.stringify(idList));
      var name = JSON.parse(localStorage.getItem("city"));
      console.log(name + " saved");
    }
    var latValue;
    var lonValue;

    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
            "&units=imperial&exclude=alerts&appid=" +
            appID
        )
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            currentTemp.text("Temp: " + data["current"].temp + " °F");
            currentWind.text("Wind: " + data["current"].wind_speed + " MPH");
            currentHumidity.text(
              "Humidity: " + data["current"].humidity + " %"
            );
            currentUV.text("UV Index: " + data["current"].uvi);

            console.log("generating 5 day");
            //five day
            for (var i = 0; i < 5; i++) {
              fiveDayIcon.push(data.daily[i].weather[0].icon);
              fiveDayTemp.push(data.daily[i].temp.day);
              fiveDayWind.push(data.daily[i].wind_speed);
              fiveDayHumidity.push(data.daily[i].humidity);
              console.log(fiveDayTemp);
              console.log("5 day generated");
              setDays(i);
            }
          });
      });
  }

  buttonPressed = false;
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
    button.className = "form-control histButton btn-secondary";
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

//yippee

function setDays(i) {
  console.log(i + "setDays called");

  $(".wincon").each(function (i) {
    var code = fiveDayIcon[i];
    var iconURL = "https://openweathermap.org/img/w/" + code + ".png";
    $(this).attr("src", iconURL);
  });
  $(".dayTemp").each(function (i) {
    var t = fiveDayTemp[i];
    $(this).text(t + " °F");
  });
  $(".dayWind").each(function (i) {
    var t = fiveDayWind[i];
    $(this).text(t + " MPH");
  });
  $(".dayHumid").each(function (i) {
    var t = fiveDayHumidity[i];
    $(this).text(t + " %");
  });

  $("#main").removeClass("invisible");
  $("#main").addClass("visible");
}

var c = moment().format("MM-DD-YYYY");
var d1 = moment().add(1, "days").format("MM-DD-YYYY");
var d2 = moment().add(2, "days").format("MM-DD-YYYY");
var d3 = moment().add(3, "days").format("MM-DD-YYYY");
var d4 = moment().add(4, "days").format("MM-DD-YYYY");
var d5 = moment().add(5, "days").format("MM-DD-YYYY");
$("#currentDay").text(c);
$("#day1Li").text(d1);
$("#day2Li").text(d2);
$("#day3Li").text(d3);
$("#day4Li").text(d4);
$("#day5Li").text(d5);
