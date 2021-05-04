//add event listener for search button press
// var searchButton = document.getElementById("searchButton");

var searchButton = $("#searchButton");
searchButton.on("click", function (event) {
  event.preventDefault();
  search();
});

var idList = [];

function search() {
  var searchInput = document.getElementById("searchInput").value;
  var searchHistory = document.getElementById("searchHistoryButtons");
  var button = document.createElement("button");
  var buttonName = document.createTextNode(searchInput);

  console.log(buttonName);
  button.className = "form-control";
  button.id = searchInput;
  button.appendChild(buttonName);
  searchHistory.appendChild(button);
  idList.push(button.id);
  console.log(idList);
  localStorage.setItem("city", JSON.stringify(idList));
  var name = JSON.parse(localStorage.getItem("city"));
  console.log(name + " saved");
}

saveSearch();

function saveSearch() {
  var name = JSON.parse(localStorage.getItem("city"));
  console.log(name + " saved");

  for (var i = 0; i < name.length; i++) {
    console.log(name[i]);
    var searchHistory = document.getElementById("searchHistoryButtons");
    var button = document.createElement("button");
    var buttonName = document.createTextNode(name[i]);
    button.className = "form-control";
    button.id = name[i];
    button.appendChild(buttonName);
    searchHistory.appendChild(button);
  }
}
