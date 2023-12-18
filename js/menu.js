class Menu {
  create(data) {
    let score = data.score ? data.score : 0;

    this.add.image(320, 180, "background");

    let nameLabel = this.add.text(320, -50, "Coin Collector", {
      font: "50px Arial",
      fill: "#fff",
    });

    nameLabel.setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: nameLabel,
      y: 120,
      duration: 1000,
      ease: "bounce.out",
    });

    let scoreText = "score: " + score;
    let scoreLabel = this.add.text(320, 225, scoreText, {
      font: "25px Arial",
      fill: "#fff",
    });
    scoreLabel.setOrigin(0.5, 0.5);

    let startText = "press the up arrow key to start";
    let startLabel = this.add.text(320, 360, startText, {
      font: "25px Arial",
      fill: "#fff",
    });
    startLabel.setOrigin(0.5, 0.5);

    this.upKey = this.input.keyboard.addKey("up");
  }

  update() {
    if (this.upKey.isDown) {
      this.scene.start("play");
    }
  }
}
