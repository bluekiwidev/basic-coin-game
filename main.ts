let player2 = sprites.create(img`
. . 5 5 . .
. 5 5 5 5 .
. 5 5 5 5 . 
. . 5 5 . . 
`, SpriteKind.Player)

randTilemapbak()

let nemeny = sprites.create(img`
    . 2 2 2 .
    2 2 2 2 2
    2 2 2 2 2
    . 2 2 2 .
`, SpriteKind.Enemy)

controller.moveSprite(player2, 69, 69)

forever(function() {
    let gazornogaz = randint(1, 69)
    nemeny.follow(player2, gazornogaz)
    console.log(gazornogaz)
    pause(1000)
})

forever(function() {
    if (levelCoins >= 5){
        levelCoins = 0
        randTilemapbak()
        for (let i = 0; i >= 5; i++) {
            spawnCoin();
        }
    }
})

nemeny.setPosition(130, 0)
scene.cameraFollowSprite(player2)

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(player2, nemeny) {
    game.gameOver(false)
})
info.setScore(0)
let coins = 0
let coin: Sprite = null
let levelCoins = 0

namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
    
function spawnCoin() {
    let coin = sprites.create(img`
            . . 4 4 . .
            . 4 f f 4 .
            4 4 f 4 4 4
            . 4 f f 4 .
            . . 4 4 . .
    `, SpriteKind.Coin)
    tiles.placeOnRandomTile(coin, sprites.castle.tileGrass2)
}

function randTilemapbak() {
    let seed = randint(1, 5)
    if (seed == 1) {
        tiles.setCurrentTilemap(tilemap`_1`)
        spawnlotsofcoins()
    } else if (seed == 2) {
        tiles.setCurrentTilemap(tilemap`_2`)
        spawnlotsofcoins()
    } else if (seed == 3) {
        tiles.setCurrentTilemap(tilemap`_3`)
        spawnlotsofcoins()
    } else if (seed == 4) {
        tiles.setCurrentTilemap(tilemap`_4`)
        spawnlotsofcoins()
    } else if (seed == 5) {
        tiles.setCurrentTilemap(tilemap`_5`)
        spawnlotsofcoins()
    }
}

function spawnlotsofcoins() {
    for (let i = 0; i < 5; i++) {
        spawnCoin()
    }
}

for (let i = 0; i < 5; i++) {
    spawnCoin()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function(player2, coin){
    coin.destroy()
    coins++
    levelCoins++
    info.changeScoreBy(1)
})