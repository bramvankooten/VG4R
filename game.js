screenHeight = window.innerHeight
screenWidth = Math.min(window.innerWidth, Math.floor((screenHeight / 16) * 9))


const game = new ex.Engine({
    width: screenWidth,
    height: screenHeight,
})

var loader = new ex.Loader();
for (let i = 0; i < AnimalImages.length; i++){
	loader.addResource(AnimalImages[i]);
}
for (let i = 0; i < FlowerImages.length; i++){
	loader.addResource(FlowerImages[i]);
}
for (let i = 0; i < FruitImages.length; i++) {
	loader.addResource(FruitImages[i]);
}
for (let i = 0; i < HouseImages.length; i++ ){
	loader.addResource(HouseImages[i]);
}
for (let i = 0; i < ShapeImages.length; i++) {
	loader.addResource(ShapeImages[i]);
}
for (var sound in Sounds) {
    loader.addResource(Sounds[sound])
}

const screenPadding = 25

function randomPosition() {
    let x = Math.floor(Math.random() * (game.drawWidth - 2*screenPadding) ) + screenPadding,
        y = Math.floor(Math.random() * (game.drawHeight - 200) ) + 100;
    return {x, y}
}

function chooseIcons() {
    choice = Math.floor(Math.random() * 5)

    switch (choice) {
        case 0:
            return AnimalImages
        case 1:
            return FlowerImages
        case 2:
            return FruitImages
        case 3:
            return HouseImages
        case 4:
            return ShapeImages
    }
}

let round = 20

function newRound() {
    icons = chooseIcons()

    let targetPos = randomPosition()
    let targetIndex = Math.floor(Math.random() * icons.length)

    const target = new ex.Actor({
        x: targetPos.x,
        y: targetPos.y,
        height:50,
        width:50,
    })

    sprite = new ex.Sprite({
        image: icons[targetIndex],
        destSize: {
            height: 50,
            width: 50,
        }
    })

    target.graphics.use(sprite)

    let iconsNoTarget = icons.slice()
    iconsNoTarget.splice(targetIndex,1)
    console.log(iconsNoTarget.length)
    
    game.add(target)
    
    const targetGraphic = new ex.Actor({
        x: 130,
        y: screenHeight - 35,
        height:50,
        width:50,
    })
    const targetGraphicBackground = new ex.Actor({
        x: 130,
        y: screenHeight - 35,
        height:60,
        width:60,
        color: ex.Color.White
    })
    const targetLabel = new ex.Label({
        text: 'Target:',
        pos: ex.vec(5, screenHeight - 25),
        font: new ex.Font({
            family: 'impact',
            size: 32,
        }),
    })

    targetGraphic.graphics.use(sprite)

    game.add(targetLabel)
    game.add(targetGraphicBackground)
    game.add(targetGraphic)
    

    obstacles = []

    for (let i = 0; i < round*5; i++) {
        pos = randomPosition()

        distX = pos.x - targetPos.x
        distY = pos.y - targetPos.y

        if (Math.abs(distX) < 30 && Math.abs(distY) < 30) {
            if (distX === 0) {
                pos.x = pos.x + 30
            }
            else if (Math.abs(distX) < 30) {
                pos.x = pos.x + Math.sign(distX)*30
            }
            
            if (distY === 0) {
                pos.y = pos.y + 30
            }
            else if (Math.abs(distY) < 30) {
                pos.y = pos.y + Math.sign(distY)*30
            }
        }
        
        randomChoice = Math.floor(Math.random() * iconsNoTarget.length)

        obstacle = new ex.Actor({
            x: pos.x,
            y: pos.y,
            height: 50,
            width: 50,
        })

        obstacleSprite = new ex.Sprite({
            image: iconsNoTarget[randomChoice],
            destSize: {
                height: 50,
                width: 50,
            }
        })
        obstacle.graphics.use(obstacleSprite)

        obstacles.push(obstacle)
        game.add(obstacle)
    }

    target.on('pointerdown', function() {
        obstacles.forEach((obstacle) => {
            obstacle.kill()
        });
        Sounds.correct.play(0.25)
        target.actions.scaleBy(ex.vec(1.5,1.5), .75).callMethod(() => {
            round += 1
            label.text = 'Round ' + round
            
            target.kill()
            targetGraphic.kill()
            targetGraphicBackground.kill()

            newRound()
        })
    })

    
}

const label = new ex.Label({
    text: 'Round 1',
    pos: ex.vec(100, 50),
    font: new ex.Font({
        family: 'impact',
        size: 32,
    }),
})

game.add(label)

newRound()

// let time = 0

// const timer = new ex.Timer({
//     fcn: () => {
//         time += 1
//         label.text = time.toString()
//     },
//     repeats: true,
//     interval: 1000,
// })

// game.currentScene.add(timer)

// timer.start()

game.start(loader)