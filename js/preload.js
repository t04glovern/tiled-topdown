/// <reference path="phaser.js" />

var TopDownGame = TopDownGame || {};

// loading the game assets
TopDownGame.Preload = function () {};

TopDownGame.Preload.prototype = {
    preload: function () {
        // show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        // load game assets
        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tiles.png');
        this.load.image('burger', 'assets/images/burger.png');
        this.load.image('hotdog', 'assets/images/hotdog.png');
        this.load.image('browndoor', 'assets/images/browndoor.png');
        this.load.spritesheet('player', 'assets/images/player.png', 16, 16, 3);
    },
    create: function () {
        this.state.start('Game');
    }
};
