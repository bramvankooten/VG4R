var buildCutsceneOne = function(passengine) {
    const CutSceneOne = new ex.Scene()

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

    CutSceneOne.add(cutscene)

    let cutsceneCount = 0

    let cutsceneText = [["Welcome to my little \ncorner of the world!", "suprised"], 
            ["I hope you like it here.","happy"],
            ["This space is usually filled\nwith the laughter of\nmy best animal friends...",'happy'],
            ["but wait, where are they?\nCan you lend me a hand?",'sad'],
            ["I am sure I left my\nfriends somewhere here.",'sad'],
            ["But it seems like it\nmight be hard to find\nwithin this mess.",'suprised'],
            ["Show me where it is \nby tapping on it!",'present'],
            ["Who/what I am \nlooking for is always \nshown in the \nbottom left corner.",'happy'],
        ]
        
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
        height: screenHeight * 2
    });

    textBox.graphics.use(text)
    cutscene.graphics.show(cutsceneText[0][1])


    exampleSprite = new ex.Sprite({
        image: AnimalImages[0],
        destSize: {
            height: objectSize,
            width: objectSize,
        }
    })

    const exampleTargetLabel = new ex.Label({
        text: 'Target:',
        pos: ex.vec(5, screenHeight - 25),
        font: new ex.Font({
            family: 'Roboto',
            size: objectSize,
        }),
    })
    
    const exampleTargetGraphic = new ex.Actor({
        x: exampleTargetLabel.graphics._localBounds.right + 15 + objectSize / 2,
        y: screenHeight - (15 + objectSize / 2),
        height:objectSize,
        width:objectSize,
    })
    const exampleTargetGraphicBackground = new ex.Actor({
        x: exampleTargetLabel.graphics._localBounds.right + 15 + objectSize / 2,
        y: screenHeight - (15 + objectSize / 2),
        height:objectSize + 10,
        width:objectSize + 10,
        color: ex.Color.White
    })
    
    exampleTargetGraphic.graphics.use(exampleSprite)

    textBox.on('pointerdown', function() {
        cutsceneCount += 1
        if (cutsceneCount < cutsceneText.length) {
            text.text = cutsceneText[cutsceneCount][0]
            cutscene.graphics.hide()
            cutscene.graphics.show(cutsceneText[cutsceneCount][1])
            if (cutsceneCount === cutsceneText.length - 1) {
                CutSceneOne.add(exampleTargetLabel)
                CutSceneOne.add(exampleTargetGraphicBackground)
                CutSceneOne.add(exampleTargetGraphic)
            }
        } else {
            passengine.input.pointers.on('down', function() {
                passengine.input.pointers.off('down')
                passengine.goToScene('objectGame')
            })
        }
        
    })

    CutSceneOne.add(textBox)

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

    CutSceneOne.add(actor)

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

    CutSceneOne.add(instructionLabel)
    
    return CutSceneOne
}