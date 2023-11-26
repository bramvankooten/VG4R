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
    let maxCollect = 10

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
                family: 'Roboto',
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
            switch(numCollected % 3) {
                case 0:
                    correctUI.graphics.show('one');
                    break;
                case 1:
                    correctUI.graphics.show('two');
                    break;
                case 2:
                    correctUI.graphics.show('three')
                    break;
            }
            target.actions.scaleBy(ex.vec(1.5,1.5), .75).callMethod(() => {                
                target.kill()
                targetGraphic.kill()
                targetGraphicBackground.kill()
                correctUI.graphics.hide()
                if (numCollected === maxCollect) {
                    numCollected = 0
                    passEngine.goToScene('cutscene_two')
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
            family: 'Roboto',
            size: objectSize * 0.75,
        }),
    })

    ObjectGame.add(label)

    const actor = new ex.Actor({
        x: 0,
        y: 0,
        width: screenWidth,
        height: screenHeight,
        // color: ex.Color.Blue
     });
    actor.z = -99;
    actor.graphics.anchor = ex.Vector.Zero;
    var background = new ex.Sprite({
        image: Gradients[3],
        destSize: {
            height: screenHeight,
            width: screenWidth,
        }
    })
    
    actor.graphics.use(background)

    ObjectGame.add(actor)

    uiSprite_one = new ex.Sprite({
        image: UI[0]
    })
    uiSprite_two = new ex.Sprite({
        image: UI[1]
    })
    uiSprite_three = new ex.Sprite({
        image: UI[2]
    })

    scaleFactor = screenWidth/1169 - 0.1
    console.log(scaleFactor)
    uiSprite_one.scale = ex.vec(scaleFactor, scaleFactor)
    uiSprite_two.scale = ex.vec(scaleFactor, scaleFactor)
    uiSprite_three.scale = ex.vec(scaleFactor, scaleFactor)

    const correctUI = new ex.Actor({
        x: screenWidth/2,
        y: screenHeight/10,
        height:200,
        width:200,
    })
    correctUI.z = 99

    correctUI.graphics.add('one', uiSprite_one)
    correctUI.graphics.add('two', uiSprite_two)
    correctUI.graphics.add('three', uiSprite_three)

    ObjectGame.add(correctUI)


    newRound()
    return ObjectGame
}