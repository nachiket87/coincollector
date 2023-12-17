class Load {
  preload() {
    // Load all assets
    this.load.image("background", "assets/background.png");
    this.load.image("wallH", "assets/platform.png");
    this.load.image("coin", "assets/coin.png");
    this.load.image("enemy", "assets/enemy.png");
    this.load.audio("jump", ["assets/jump.mp3"]);
    this.load.audio("coin", ["assets/coin.mp3"]);
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    // Display a loading label
    let loadLabel = this.add.text(250, 170, "loading", {
      font: "30px Arial",
      fill: "#fff",
    });

    // Change the point of origin of the text
    // To make sure the text will be centered on the screen
    loadLabel.setOrigin(0.5, 0.5);
  }

  create() {
    // Start the menu scene
    this.scene.start("menu");
  }
}
