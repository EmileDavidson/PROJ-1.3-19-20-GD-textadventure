const imageLocation = document.getElementById('imageLocation');
const myInventory = document.getElementById('inventory');
const divLocation = document.getElementById('location');
const myDescription = document.getElementById('beschrijving');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');

let inv = [];
let items = "";
let currentLocation = 4;

class room {
  constructor(location, image, direction, discriptions, loot, open) {
    this.location = location;
    this.image = image;
    this.directions = direction;
    this.discription = discriptions;
    this.loot = loot;
    this.lootgepakt = false;
    this.open = open;
  }
}
let rooms = [];
rooms[0] = new room("kantine", "room0.jpg", ["oost"], "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen", [], true);
rooms[1] = new room("trap", "room1.jpg", ["west", "zuid"], "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag", [], true);
rooms[2] = new room("eind", "room2.jpg", ["zuid"], "u heeft gewonnen", [], false);
rooms[3] = new room("docentenkamer", "room3.jpg", ["oost"], "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee", [], true);
rooms[4] = new room("gang", "room4.jpg", ["noord", "west", "zuid"], "u staat in een gang. Studenten en leraren lopen richting de klaslokalen", [], true);
rooms[5] = new room("medialab", "room5.jpg", ["zuid", "noord"], "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen", [], true);
rooms[6] = new room("toiletten", "room6.jpg", ["oost"], "u staat bij de toiletten", ["key"], true);
rooms[7] = new room("klaslokaal", "room7.jpg", ["noord", "west", "oost"], "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard", [], true);
rooms[8] = new room("examenlokaal", "room8.jpg", ["noord", "west"], "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen", [], true);

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (rooms[currentLocation].directions.indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            if (isopen(currentLocation - 3)) {
              currentLocation -= 3;
            }
            break;
          case "zuid":
            if (isopen(currentLocation + 3)) {
              currentLocation += 3;
            }
            break;
          case "oost":
            if (isopen(currentLocation + 1)) {
              currentLocation += 1;
            }
            break;
          case "west":
            if (isopen(currentLocation - 1)) {
              currentLocation -= 1;
            }
            break;
        }
      } else {
        feedback.innerHTML = "dit is geen geldige richting";
        setTimeout(removeFeedback, 2000);
      }
      giveLocationInformatie();
      myInput.value = "";
    }
    if (inputArray[0] == "pak") {
      if (rooms[currentLocation].loot != null || rooms[currentLocation] != undefined || rooms[currentLocation].lootgepakt != true) {
        if(inputArray[1] != null && inputArray[1] != undefined){
          for(let i = 0; i < rooms[currentLocation].loot.length; i++){
            if(inputArray[1] == rooms[currentLocation].loot[i]){
              addtoInventory(rooms[currentLocation].loot[i]);
              rooms[currentLocation].loot.splice(i, 1);
            }
          }
        }
      }
      myInput.value = "";
      giveLocationInformatie();
    }
    if (inputArray[0] == "getlocation") {
      divLocation.innerHTML = rooms[currentLocation].location + "  [" + currentLocation + "]";
      myInput.value = "";
    }
  }
}

function isopen(next) {
  if (rooms[next].open == false) {
    if(checkforitem("key")){
        feedback.innerHTML = "Deur geopend";
        setInterval(removeFeedback, 2000);
        next.isopen = true;
        return true;
      }
    myInput.value = "";
    feedback.innerHTML = "Deze deur is nog dicht";
    setInterval(removeFeedback, 2000);
    return false;
  }
  return true;
}

giveLocationInformatie();
function giveLocationInformatie() {
  divLocation.innerHTML = rooms[currentLocation].location;
  myDescription.innerHTML = rooms[currentLocation].discription;
  imageLocation.src = "media/" + rooms[currentLocation].image;
  myOptions = "";
  myInventory.innerHTML = "";
  for (let i = 0; i < rooms[currentLocation].directions.length; i++) {
    myOptions += "<li>" + rooms[currentLocation].directions[i] + "</li>";
  }
  if (!(rooms[currentLocation].loot.length <= 0) && rooms[currentLocation].lootgepakt == false) {
    for (let j = 0; j < rooms[currentLocation].loot.length; j++) {
      myOptions += "<li>" + "pak " + rooms[currentLocation].loot[j] + "</li>";
    }
  }
  myPossibilities.innerHTML = myOptions;

  imageLocation.src = "media/" + rooms[currentLocation].image;
  updateInventory();
}
function updateInventory() {
  if (inv.length <= 0) {
    myInventory.innerHTML = "";
    return;
  }
  items = "";
  for (let i = 0; i < inv.length; i++) {
    items += "<li>" + inv[i] + "</li>";
  }
  myInventory.innerHTML = items;
}

function addtoInventory(input) {
  inv.push(input);
  updateInventory();
}

function removeFromInventory(input) {
  for (let i = 0; i < inv.length; i++) {
    if (inv[i] == input) {
      inv.splice(i, 1);
      giveLocationInformatie();
      updateInventory();
    }
  }
}

function checkforitem(input) {
  for (let i = 0; i < inv.length; i++) {
    if (inv[i] == input) {
      inv.splice(i,1);
      return true;
    }
  }
  return false;
}

function removeFeedback() {
  feedback.innerHTML = "";
}
