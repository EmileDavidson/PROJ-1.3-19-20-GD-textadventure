const imageLocation = document.getElementById('imageLocation');
const myInventory = document.getElementById('inventory');
const divLocation = document.getElementById('location');
const myDescription = document.getElementById('beschrijving');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const treasureImage = document.getElementById('treasureimage');
const monsters = document.getElementById('Monsters');
let inv = [];
let items = "";
let currentLocation = 0;

//monster maken
class monster {
  constructor(name) {
    this.health = 50;
    this.name = name;
  }
}

class room {
  constructor(location, image, direction, discriptions, loot, open, monster) {
    this.location = location;
    this.image = image;
    this.directions = direction;
    this.discription = discriptions;
    this.loot = loot;
    this.open = open;
    this.monster = monster;
  }
}

let rooms = [];
rooms[0] = new room("0", "room0.jpg", ["oost"], "room0", null, true, false);
rooms[1] = new room("1", "room0.jpg", ["west", "zuid", "oost"], "room1", null, true, false);
rooms[2] = new room("2", "room0.jpg", ["west", "zuid"], "room2", null, true, false);
rooms[3] = new room("3", "room0.jpg", ["zuid"], "room3", null, true, false);
rooms[4] = new room("4", "room0.jpg", ["oost"], "room4", null, true, false);
rooms[5] = new room("5", "room0.jpg", ["noord", "zuid", "west"], "room5", null, true, false);
rooms[6] = new room("6", "room0.jpg", ["noord", "oost", "zuid"], "room6", null, true, false);
rooms[7] = new room("7", "room0.jpg", ["noord", "zuid", "west"], "room7", null, true, false);
rooms[8] = new room("8", "room0.jpg", ["zuid"], "room8", ["key"], true, false);
rooms[9] = new room("9", "room0.jpg", ["noord", "zuid"], "room9", null, true, false);
rooms[10] = new room("10", "room0.jpg", ["noord"], "room10", null, true, false);
rooms[11] = new room("11", "room0.jpg", ["noord"], "room11", ["key"], true, false);
rooms[12] = new room("12", "room0.jpg", ["oost", "noord"], "room12", null, true, new monster("piet"));
rooms[13] = new room("13", "room0.jpg", ["west", "noord", "oost"], "room13", null, false, false);
rooms[14] = new room("14", "room0.jpg", ["west", "oost"], "room14", null, true, false);
rooms[15] = new room("15", "room0.jpg", ["west"], "room15", null, false, false);
myInput.addEventListener('keydown', getInput, false);



function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (checkformonster()) {
        return;
      }
      if (rooms[currentLocation].directions.indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            if (isopen(currentLocation - 4)) {
              currentLocation -= 4;
            }
            break;
          case "zuid":
            if (isopen(currentLocation + 4)) {
              currentLocation += 4;
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
      if (checkformonster()) {
        return;
      }
      if (rooms[currentLocation].loot != null || rooms[currentLocation] != undefined || rooms[currentLocation].loot.length <= 0) {
        if (inputArray[1] != null && inputArray[1] != undefined) {
          for (let i = 0; i < rooms[currentLocation].loot.length; i++) {
            if (inputArray[1] == rooms[currentLocation].loot[i]) {
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
    if (inputArray[0] == "attack") {

      if (rooms[currentLocation].monster != false) {
        if (!(rooms[currentLocation].monster.health <= 0)) {
          rooms[currentLocation].monster.health += -10;
          feedback.innerHTML = "je hebt het monster aangevallen";
          setTimeout(removeFeedback, 5000);
          giveLocationInformatie();
        }
      }

      myInput.value = "";
    }
  }
}

function isopen(next) {
  if (rooms[next].open == false) {
    if (checkforitem("key")) {
      feedback.innerHTML = "Deur geopend";
      setInterval(removeFeedback, 2000);
      rooms[next].open = true;
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
  myMonsters = "";
  myInventory.innerHTML = "";
  for (let i = 0; i < rooms[currentLocation].directions.length; i++) {
    myOptions += "<li>" + rooms[currentLocation].directions[i] + "</li>";
  }
  if (rooms[currentLocation].loot != null) {
    if (!(rooms[currentLocation].loot.length <= 0)) {
      treasureImage.src = "media/chest.png";
      for (let j = 0; j < rooms[currentLocation].loot.length; j++) {
        console.log("ja");
        myOptions += "<li>" + "pak " + rooms[currentLocation].loot[j] + "</li>";
      }
    } else {
      treasureImage.src = "";
    }
  } else {
    treasureImage.src = "";
  }
  monster.innerHTML = "";
  if(rooms[currentLocation].monster != false){
    if(rooms[currentLocation].monster.health >= 1){
      myOptions += "<li>" + "attack" + "</li>";
      myMonsters += "<li>" + "Monster: " + rooms[currentLocation].monster.health + "</li>";
    }
  }
  myPossibilities.innerHTML = myOptions;
  monsters.innerHTML = myMonsters;

  imageLocation.src = "media/" + rooms[currentLocation].image;
  updateInventory();

  if (currentLocation == 15) {
    feedback.innerHTML = "GEWONNEN!!!!";
    setInterval(removeFeedback, 2000);
  }
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
      inv.splice(i, 1);
      return true;
    }
  }
  return false;
}

function removeFeedback() {
  feedback.innerHTML = "";
}

function checkformonster() {
  if (rooms[currentLocation].monster != false) {
    if (!(rooms[currentLocation].monster.health <= 0)) {
      feedback.innerHTML = "er is een monster die je eerst moet verslaan";
      setTimeout(removeFeedback, 5000);
      myInput.value = "";
      return true;
    }
  }
  return false;
}
