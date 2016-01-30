/// <reference path="phaser.js" />

// If TopDownGame exists, then use it, if it doesn't
// then initiate it as an empty object
var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);

TopDownGame.game.state.start('Boot');