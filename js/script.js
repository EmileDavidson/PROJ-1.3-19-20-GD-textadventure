const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');

let currentLocation = 4;
let inventory = [];
let items = "";

class room {
  constructor(location, image, direction, discriptions, loot) {
    this.location = location;
    this.image = image;
    this.directions = direction;
    this.discription = discriptions;
    this.loot = loot;
    this.lootgepakt = false;
  }
}
let rooms = [];
rooms[0] = new room("kantine", "room0.jpg", ["oost"], "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen", null);
rooms[1] = new room("trap", "room1.jpg", ["west", "zuid"], "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag", null);
rooms[2] = new room("eind", "room2.jpg", ["zuid"], "u heeft gewonnen", "key");
rooms[3] = new room("docentenkamer", "room3.jpg", ["oost"], "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee", null);
rooms[4] = new room("gang", "room4.jpg", ["noord", "west", "zuid"], "u staat in een gang. Studenten en leraren lopen richting de klaslokalen");
rooms[5] = new room("medialab", "room5.jpg", ["zuid", "noord"], "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen", null);
rooms[6] = new room("toiletten", "room6.jpg", ["oost"], "u staat bij de toiletten", "key");
rooms[7] = new room("klaslokaal", "room7.jpg", ["noord", "west", "oost"], "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard", null);
rooms[8] = new room("examenlokaal", "room8.jpg", ["noord", "west"], "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen", null);

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (rooms[currentLocation].directions.indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            if (keycontrole() == true) {
              currentLocation -= 3;
            }
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "west":
            currentLocation -= 1;
            break;
        }
        console.log(currentLocation);
      } else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    //zorg dat je wat kan pakken wanneer er ook echt iets is
    if (inputArray[0] == "pak") {
            myInput.value = "";
      if (rooms[currentLocation].loot != null) {
        if (rooms[currentLocation].lootgepakt == false) {
          rooms[currentLocation].lootgepakt = true;
          inventory.push(rooms[currentLocation].loot);
          console.log("gelukt");
          console.log(inventory);

        } else {
          alert("er is geen loot meer om op te pakken");
        }
      } else {
        alert("er is hier geen loot en nooit geweest");
      }
      updateInventory();
    }

    //help command
    if (inputArray[0] == "help") {
      alert("commando's zijn: [ ga richting ], [ pak ], [ help ]")
      myInput.value = "";
    }
    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "help") {
      feedback.innerHTML = "mogelijke commando's zijn: ga, pak, gebruik en help";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

function giveLocation() {
  divLocation.innerHTML = rooms[currentLocation].location;
  myDescription.innerHTML = rooms[currentLocation].discription;
  imageLocation.src = "media/" + rooms[currentLocation].image;
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < rooms[currentLocation].directions.length; i++) {
    myDirections += "<li>" + rooms[currentLocation].directions[i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  if (currentLocation == 6) {
    if (rooms[6].lootgepakt == false) {
      alert("je kan loot pakken type ' pak ' ")
    }
  }
  if (currentLocation == 8) {
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i] == "schat") {
        alert("GEWONNEN");
      }
    }
  }
}

function updateInventory() {
  if (inventory.length <= 0) {
    myInventory.innerHTML = "Uw inventory is leeg";
  } else {
    items = "";
    for (let i = 0; i < inventory.length; i++) {
      items += "<li>" + inventory[i] + "</li>";
      console.log(items);
    }
    myInventory.innerHTML = items;
  }
}

function keycontrole() {
  if (currentLocation == "5") {
    if (inventory.length <= 0) {
      alert("je hebt niet de juiste benodigdheden");
      myInput.value = "";
      return false;
    }
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i] == "key") {
        currentLocation -= 3;
        alert("GEWONNEN!");
      } else {
        alert("Je hebt een key nodig");
        myInput.value = "";
        return false;
      }
    }
  } else {
    return true;
  }
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
updateInventory();
