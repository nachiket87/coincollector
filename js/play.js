class Play {
  create() {
    let particles = this.add.particles("pixel");

    this.emitter = particles.createEmitter({
      quantity: 15,
      speed: { min: -150, max: 150 },
      scale: { start: 2, end: 0.1 },
      lifespan: 800,
      on: false,
    });
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
    this.jumpSound = this.sound.add("jump");
    this.coinSound = this.sound.add("coin");
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.movePlayer();
    if (this.player.x > 640) {
      this.player.x = 0;
    } else if (this.player.x < 0) {
      this.player.x = 640;
    }

    if (this.player.y > 480) {
      this.player.y = 0;
    }

    if (this.physics.overlap(this.player, this.coin)) {
      this.coinSound.play();
      this.takeCoin();
    }
    if (this.physics.overlap(this.player, this.enemies)) {
      this.endGame();
    }
  }

  createWorld() {
    this.walls = this.physics.add.staticGroup();

    this.walls.create(50, 10, "wallH");
    this.walls.create(450, 10, "wallH");

    this.walls.create(0, 170, "wallH");

    // these are good
    this.walls.create(500, 220, "wallH");

    // Bottom 2nd last wall
    this.walls.create(220, 340, "wallH");

    // bottom walls
    this.walls.create(0, 470, "wallH");
    this.walls.create(450, 470, "wallH");
  }

  movePlayer() {
    if (!this.player.active) {
      return;
    }
    if (this.arrow.left.isDown) {
      this.player.body.velocity.x = -200;
      this.player.anims.play("left", true);
    } else if (this.arrow.right.isDown) {
      this.player.body.velocity.x = 200;
      this.player.anims.play("right", true);
    } else {
      this.player.body.velocity.x = 0;
      this.player.anims.play("turn", true);
    }
    if (this.arrow.up.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = -420;
      this.jumpSound.play();
    }
  }

  addEnemy() {
    let enemy = this.enemies.create(250, -10, "enemy");
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = Phaser.Math.RND.pick([-100, 100]);
    enemy.body.bounce.x = 1;

    this.time.addEvent({
      delay: 15000,
      callback: () => enemy.destroy(),
    });
  }

  takeCoin() {
    this.coin.setScale(0);
    this.tweens.add({
      targets: this.coin, // on the coin
      scale: 0.5, // to scale it to 1 (its original size)
      duration: 300, // in 300ms
    });

    this.updateCoinPosition();
    this.score++;
    this.scoreLabel.setText("Score: " + this.score);
  }

  endGame() {
    this.emitter.setPosition(this.player.x, this.player.y);
    this.emitter.explode();
    this.player.destroy();
    this.time.addEvent({
      delay: 1000,
      callback: () => this.scene.start("menu", { score: this.score }),
    });
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
