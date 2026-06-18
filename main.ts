let player2 = sprites.create(img`
. . 5 5 . .
. 5 5 5 5 .
. 5 5 5 5 . 
. . 5 5 . . 
`, SpriteKind.Player)

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

nemeny.setPosition(130, 0)
scene.cameraFollowSprite(player2)

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(player2, nemeny) {
    game.gameOver(false)
})

tiles.setCurrentTilemap(tilemap`5`)
tiles.setCurrentTilemap(tilemap`3`)
tiles.setCurrentTilemap(tilemap`leveltest`)

function rotateLevel(){
    tiles.setCurrentTilemap(tilemap(randint(1, 5)))
}

let coins = 0
let coin: Sprite = null

namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
    
function spawnCoin() {
    randint(0, 10)
    let coin = sprites.create(img`
            . . 4 4 . .
            . 4 f f 4 .
            4 4 f 4 4 4
            . 4 f f 4 .
            . . 4 4 . .
    `, SpriteKind.Coin)
    tiles.placeOnRandomTile(coin, sprites.castle.tileGrass2)
}

for (let i = 0; i < 5; i++) {
    spawnCoin()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function(player2, coin){
    coin.destroy()
    coins +=1
    if (coins >= 10){
        rotateLevel()
    }
    spawnCoin()
})