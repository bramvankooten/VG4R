var buildObjectGame = function(passEngine) {
    const ObjectGame = new ex.Scene()
    const screen_y_padding = Math.floor(screenHeight / 10)
    const objectSize = Math.floor(screenHeight / 20)
    const screenPadding = 25

    function randomPosition() {
        let x = Math.floor(Math.random() * (engine.drawWidth - 2*screenPadding) ) + screenPadding,
            y = Math.floor(Math.random() * (engine.drawHeight - 3*screen_y_padding) ) + 1.5*screen_y_padding;
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

    let numCollected = 0
    let maxCollect = 3

    function newRound() {
        icons = chooseIcons()

        let targetPos = randomPosition()
        let targetIndex = Math.floor(Math.random() * icons.length)

        const target = new ex.Actor({
            x: targetPos.x,
            y: targetPos.y,
            height:objectSize,
            width:objectSize,
        })

        sprite = new ex.Sprite({
            image: icons[targetIndex],
            destSize: {
                height: objectSize,
                width: objectSize,
            }
        })

        target.graphics.use(sprite)

        let iconsNoTarget = icons.slice()
        iconsNoTarget.splice(targetIndex,1)
        
        ObjectGame.add(target)

        const targetLabel = new ex.Label({
            text: 'Target:',
            pos: ex.vec(5, screenHeight - 25),
            font: new ex.Font({
                family: 'impact',
                size: objectSize,
            }),
        })
        
        const targetGraphic = new ex.Actor({
            x: targetLabel.graphics._localBounds.right + 15 + objectSize / 2,
            y: screenHeight - (15 + objectSize / 2),
            height:objectSize,
            width:objectSize,
        })
        const targetGraphicBackground = new ex.Actor({
            x: targetLabel.graphics._localBounds.right + 15 + objectSize / 2,
            y: screenHeight - (15 + objectSize / 2),
            height:objectSize + 10,
            width:objectSize + 10,
            color: ex.Color.White
        })
        
        targetGraphic.graphics.use(sprite)

        ObjectGame.add(targetLabel)
        ObjectGame.add(targetGraphicBackground)
        ObjectGame.add(targetGraphic)
        

        obstacles = []

        for (let i = 0; i < 10+numCollected*5; i++) {
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
                height: objectSize,
                width: objectSize,
            })

            obstacleSprite = new ex.Sprite({
                image: iconsNoTarget[randomChoice],
                destSize: {
                    height: objectSize,
                    width: objectSize,
                }
            })
            obstacle.graphics.use(obstacleSprite)

            obstacles.push(obstacle)
            ObjectGame.add(obstacle)
        }

        target.on('pointerdown', function() {
            obstacles.forEach((obstacle) => {
                obstacle.kill()
            });
            Sounds.correct.play(0.25)
            numCollected += 1
            label.text = 'Find the objects: ' + (numCollected).toString() + '/' + maxCollect
            target.actions.scaleBy(ex.vec(1.5,1.5), .75).callMethod(() => {                
                target.kill()
                targetGraphic.kill()
                targetGraphicBackground.kill()
                if (numCollected === maxCollect) {
                    numCollected = 0
                    passEngine.goToScene('title')
                    label.text = 'Find the objects: ' + (numCollected).toString() + '/' + maxCollect
                    newRound()
                } else {
                    newRound()
                }
                
            })
        })

        
    }

    const label = new ex.Label({
        text: 'Find the objects: ' + (numCollected).toString() + '/' + maxCollect,
        pos: ex.vec(10,objectSize),
        font: new ex.Font({
            family: 'impact',
            size: objectSize * 0.75,
        }),
    })

    ObjectGame.add(label)

    newRound()
    return ObjectGame
}