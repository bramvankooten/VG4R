var buildCutSceneTwo = function(passengine) {
    const CutSceneTwo = new ex.Scene()

    const cutscene = new ex.Actor({
        x: screenWidth/2,
        y: screenHeight/4,
        height:200,
        width:200,
    })


    var cutsceneSpriteHappy = new ex.Sprite({
        image: Characters[0],
    })

    var cutsceneSpritePresent = new ex.Sprite({
        image: Characters[1],
    })

    var cutsceneSpriteSad = new ex.Sprite({
        image: Characters[2],
    })

    var cutsceneSpriteSuprised = new ex.Sprite({
        image: Characters[3],
    })

    scaleFactor = (screenHeight/2.5)/557
    cutsceneSpriteHappy.scale = ex.vec(scaleFactor,scaleFactor)
    cutsceneSpritePresent.scale = ex.vec(scaleFactor,scaleFactor)
    cutsceneSpriteSad.scale = ex.vec(scaleFactor,scaleFactor)
    cutsceneSpriteSuprised.scale = ex.vec(scaleFactor,scaleFactor)    

    cutscene.graphics.add('happy', cutsceneSpriteHappy)
    cutscene.graphics.add('present', cutsceneSpritePresent)
    cutscene.graphics.add('sad', cutsceneSpriteSad)
    cutscene.graphics.add('suprised', cutsceneSpriteSuprised)
    cutscene.actions.repeatForever((repeatCtx) => {
        repeatCtx.moveBy(0,20,20),
        repeatCtx.moveBy(0,-20,20)
    })

    CutSceneTwo.add(cutscene)

    let cutsceneTwoCount = 0

    let cutsceneText = [["You've been an absolute \nlifesaver on this journey!", "happy"], 
            ["Helping me find my shelter\nback and rediscovering\ncherished treasures.", "present"], 
            ["Now, let's have a\ncup of tea and\na little chat time.","happy"],
            ["Do you feel a bit better?",'happy'],
        ]

        // You've been an absolute lifesaver on this journey—helping me find my shelter back and rediscovering cherished treasures. Now, let's have a cup of tea and a little chat time. Do you feel a bit better?

    let text = new ex.Text({
        text: cutsceneText[0][0], 
        font: new ex.Font({
            family: 'Roboto',
            size: screenHeight/25,
            unit: ex.FontUnit.Px,
        }),
    })

    textBox = new ex.Actor({
        pos: ex.vec(screenWidth/2, screenHeight/1.5),
        width: screenWidth,
        height: screenHeight
    });

    textBox.graphics.use(text)
    cutscene.graphics.show(cutsceneText[0][1])
    
    textBox.on('pointerdown', function() {
        cutsceneTwoCount += 1
        if (cutsceneTwoCount < cutsceneText.length) {
            text.text = cutsceneText[cutsceneTwoCount][0]
            cutscene.graphics.hide()
            cutscene.graphics.show(cutsceneText[cutsceneTwoCount][1])
        } else {
            passengine.input.pointers.on('down', function() {
                passengine.input.pointers.off('down')
                passengine.goToScene('title')
            })
        }
        
    })

    CutSceneTwo.add(textBox)

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

    CutSceneTwo.add(actor)

    const instructionLabel = new ex.Label({
        text: 'Tap to continue',
        pos: ex.vec(screenWidth - 25, screenHeight - 25),
        font: new ex.Font({
            family: 'Roboto',
            size: screenHeight/50,
            unit: ex.FontUnit.Px,
            textAlign: ex.TextAlign.Right
        }),
    })

    instructionLabel.actions.repeatForever((repeatCtx) => {
        repeatCtx.scaleTo(ex.vec(1.1,1.1),ex.vec(0.05,0.05))
        repeatCtx.scaleTo(ex.vec(1,1),ex.vec(0.05,0.05))
    })

    CutSceneTwo.add(instructionLabel)
    
    return CutSceneTwo
}