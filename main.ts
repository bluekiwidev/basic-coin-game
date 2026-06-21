namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, nemeny) {
    game.gameOver(false)
})
function spawnCoin () {
coin2 = sprites.create(img`
        . . 4 4 . . 
        . 4 f f 4 . 
        4 4 f 4 4 4 
        . 4 f f 4 . 
        . . 4 4 . . 
        `, SpriteKind.Coin)
    tiles.placeOnRandomTile(coin2, sprites.castle.tileGrass2)
}
function rotateLevel () {
    tiles.setCurrentTilemap(tilemap(randint(1, 5)))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (player2, coin) {
    coin.destroy()
    coins += 1
})
let gazornogaz = 0
let coins = 0
let coin2: Sprite = null
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
nemeny.setPosition(130, 0)
scene.cameraFollowSprite(player2)
tiles.setCurrentTilemap(tilemap`5`)
tiles.setCurrentTilemap(tilemap`3`)
tiles.setCurrentTilemap(tilemap`2`)

forever(function () {
    gazornogaz = randint(1, 69)
    nemeny.follow(player2, gazornogaz)
    console.log(gazornogaz)
    pause(1000)
})
forever(function(){
    for (let index = 0; index < 5; index++) {
        spawnCoin();
    }

    rotateLevel()
})