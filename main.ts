let player2 = sprites.create(img`
. . 5 5 . .
. 5 5 5 5 .
. 5 5 5 5 . 
. . 5 5 . . 
`, SpriteKind.Player)

randTilemap()

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
        randTilemap()
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

function randTilemap() {
    switch (randint(1, 5)) {
        case 1:
        tiles.setCurrentTilemap(tilemap`_1`)

        case 2:
        tiles.setCurrentTilemap(tilemap`_2`)

        case 3:
        tiles.setCurrentTilemap(tilemap`_3`)

        case 4:
        tiles.setCurrentTilemap(tilemap`_4`)

        case 5:
        tiles.setCurrentTilemap(tilemap`_5`)

    }
}

for (let i = 0; i < 5; i++) {
    spawnCoin()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function(player2, coin){
    coin.destroy()
    coins++
    levelCoins++
})