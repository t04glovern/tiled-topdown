/// <reference path="phaser.js" />

var TopDownGame = TopDownGame || {};

// title screen
TopDownGame.Game = function () { };

TopDownGame.Game.prototype = {
    create: function () {
        this.map = this.game.add.tilemap('level1');

        // the first parameter is the tileset name as specified
        // in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');

        // create layer
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        // collision on blockedLayer
        this.map.setCollisionBetween(1, 3500, true, 'blockedLayer');

        // resizes the game world to match the layer dimensions
        this.backgroundLayer.resizeWorld();

        this.createItems();
        this.createDoors();

        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);

        // player animations
        this.player.animations.add('right', [0, 1, 2], 7, true);
        this.player.animations.add('left', [4, 5, 6], 7, true);

        // the camera will follow the player in the world
        this.game.camera.follow(this.player);

        // move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },

    createItems: function() {
        // create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var itmes;
        results = this.findObjectsByType('item', this.map, 'objectsLayer');
        results.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },

    createDoors: function() {
        // create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        result = this.findObjectsByType('door', this.map, 'objectsLayer')

        result.forEach(function(element){
            this.createFromTiledObject(element, this.doors);
        }, this);
    },

    findObjectsByType: function(type, map, layer) {
        // find objects in a Tiled layer that contains a property called
        // 'type' equal to a certain value
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                // Phaser uses lop left, Tiled bottom left so we have to
                // adjust. Also keep in mind that the food images are a bit
                // smaller than the tile which is 16x16 so they might not
                // be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    createFromTiledObject: function(element, group) {
        // create a sprite from an object
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        // copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    },

    update: function() {
        // collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        // player movement
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= 50;
            this.player.animations.play('left');

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x -= 50;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x += 50;
                this.player.animations.play('right');
            }
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += 50;
            this.player.animations.play('right');

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x -= 50;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x += 50;
                this.player.animations.play('right');
            }
        }
        else if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
            this.player.animations.play('left');

            if (this.cursors.down.isDown) {
                this.player.body.velocity.y += 50;
                this.player.animations.play('left');
            }
            else if (this.cursors.up.isDown) {
                this.player.body.velocity.y -= 50;
                this.player.animations.play('left');
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
            this.player.animations.play('right');

            if (this.cursors.down.isDown) {
                this.player.body.velocity.y += 50;
                this.player.animations.play('right');
            }
            else if (this.cursors.up.isDown) {
                this.player.body.velocity.y -= 50;
                this.player.animations.play('right');
            }
        }
        else {
            // stand still
            this.player.animations.stop();
            this.player.frame = 3;
        }
    },

    collect: function(player, collectable) {
        console.log('yummy!');

        // remove sprite
        collectable.destroy();
    },

    enterDoor: function(player, door) {
        console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
    }
};
