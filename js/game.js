class Main {
  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("wallH", "assets/platform.png");
    this.load.image("coin", "assets/coin.png");
    this.load.image("enemy", "assets/enemy.png");
  }

  create() {
    this.player = this.physics.add.sprite(250, 170, "player");
    this.coin = this.physics.add.sprite(60, 130, "coin");
    this.enemies = this.physics.add.group({ collideWorldBounds: true });

    this.player.body.gravity.y = 500;
    this.createWorld();
    this.physics.add.collider(this.player, this.walls);
    this.arrow = this.input.keyboard.createCursorKeys();
    this.scoreLabel = this.add.text(20, 40, "Score: 0");
    this.score = 0;
    this.coin.body.gravity.y = 500;
    this.physics.add.collider(this.coin, this.walls);
    this.coin.setScale(0.5);
    this.physics.add.collider(this.enemies, this.walls);
    this.time.addEvent({
      delay: 2200,
      callback: () => this.addEnemy(),
      loop: true,
    });
  }

  addEnemy() {
    let enemy = this.enemies.create(250, -10, "enemy");
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = Phaser.Math.RND.pick([-100, 100]);
    enemy.body.bounce.x = 1;

    this.time.addEvent({
      delay: 10000,
      callback: () => enemy.destroy(),
    });
  }

  update() {
    this.movePlayer();
    if (this.player.x > 500) {
      this.player.x = 0;
    } else if (this.player.x < 0) {
      this.player.x = 500;
    }

    if (this.player.y > 340 || this.player.y < 0) {
      this.endGame();
    }

    if (this.physics.overlap(this.player, this.coin)) {
      this.takeCoin();
    }
    if (this.physics.overlap(this.player, this.enemies)) {
      this.endGame();
    }
  }

  takeCoin() {
    this.updateCoinPosition();
    this.score++;
    this.scoreLabel.setText("Score: " + this.score);
  }

  endGame() {
    this.scene.start("main");
  }

  movePlayer() {
    if (this.arrow.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.arrow.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }
    if (this.arrow.up.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = -320;
    }
  }

  createWorld() {
    this.walls = this.physics.add.staticGroup();

    this.walls.create(50, 10, "wallH");
    this.walls.create(450, 10, "wallH");
    this.walls.create(0, 330, "wallH");
    this.walls.create(450, 330, "wallH");
    this.walls.create(0, 170, "wallH");
    this.walls.create(500, 170, "wallH");
    this.walls.create(250, 90, "wallH");
    this.walls.create(250, 250, "wallH");
  }
  updateCoinPosition() {
    // Store all the possible coin positions in an array
    let positions = [
      { x: 140, y: 60 },
      { x: 360, y: 60 },
      { x: 60, y: 140 },
      { x: 440, y: 140 },
      { x: 130, y: 300 },
      { x: 370, y: 300 },
    ];

    // Remove the current coin position from the array
    positions = positions.filter((coin) => coin.x !== this.coin.x);

    // Randomly select a position from the array
    let newPosition = Phaser.Math.RND.pick(positions);

    // Set the new position of the coin
    this.coin.setPosition(newPosition.x, newPosition.y);
  }
}

let game = new Phaser.Game({
  width: 500, // Width of the game in pixels
  height: 340, // Height of the game in pixels
  backgroundColor: "#3498db", // The background color (blue)
  physics: { default: "arcade" }, // The physics engine to use
  parent: "game", // The ID of the element that will contain the game
});

game.scene.add("main", Main);
game.scene.start("main");
