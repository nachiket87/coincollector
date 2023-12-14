class Main {
  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("wallH", "assets/platform.png");
  }

  create() {
    this.player = this.physics.add.sprite(250, 170, "player");
    this.player.body.gravity.y = 500;
    this.createWorld();
    this.physics.add.collider(this.player, this.walls);
    this.arrow = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.movePlayer();
    if (this.player.x > 500) {
      this.player.x = 0;
      console.log("out of bounds");
    } else if (this.player.x < 0) {
      this.player.x = 500;
    }
  }

  movePlayer() {
    if (this.arrow.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.arrow.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }
  }

  createWorld() {
    this.walls = this.physics.add.staticGroup();

    this.walls.create(50, 10, "wallH");
    this.walls.create(450, 10, "wallH");
    this.walls.create(50, 330, "wallH");
    this.walls.create(450, 330, "wallH");
    this.walls.create(0, 170, "wallH");
    this.walls.create(500, 170, "wallH");
    this.walls.create(250, 90, "wallH");
    this.walls.create(250, 250, "wallH");
  }
}

let game = new Phaser.Game({
  width: 500, // Width of the game in pixels
  height: 340, // Height of the game in pixels
  backgroundColor: "#3498db", // The background color (blue)
  physics: { default: "arcade" }, // The physics engine to use
  parent: "game", // The ID of the element that will contain the game
  scene: Main,
});
