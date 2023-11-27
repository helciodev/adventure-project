class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    const pickedItem = this.currentRoom.items.find(
      (item) => item.name === itemName
    );

    this.currentRoom.items = this.currentRoom.items.filter(
      (item) => item.name !== itemName
    );
    this.items.push(pickedItem);
  }

  dropItem(itemName) {
    const itemDropped = this.items.find((item) => item.name === itemName);
    this.currentRoom.items.push(itemDropped);
    this.items = this.items.filter((item) => item.name !== itemDropped.name);
  }

  eatItem(itemName) {
    const chosenItem = this.items.find((item) => item.name === itemName);
    if (chosenItem.isFood) {
      this.items = this.items.filter((item) => item.name !== itemName);
    } else {
      console.log(`${itemName} is not edible!`);
    }
  }

  getItemByName(name) {
    const itemByName = this.items.find((item) => item.name === name);
    return itemByName;
  }
}

module.exports = {
  Player,
};
