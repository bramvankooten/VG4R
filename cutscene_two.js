var buildCutsceneTwo = function(passengine) {
    const CutSceneTwo = new ex.Scene()

    const cutscene = new ex.Actor({
        x: screenWidth/2,
        y: screenHeight/4,
        height:200,
        width:200,
    })


    var cutsceneSprite = new ex.Sprite({
        image: AnimalImages[1],
        destSize: {
            height: 150,
            width: 150,
        }
    })
    cutsceneSprite.scale = ex.vec(1.5,1.5)

    cutscene.graphics.use(cutsceneSprite)
    cutscene.actions.repeatForever((repeatCtx) => {
        repeatCtx.moveBy(0,10,10),
        repeatCtx.moveBy(0,-10,10)
    })

    CutSceneTwo.add(cutscene)

    let cutsceneCount = 0

    let cutsceneText = []
    
    let text = new ex.Text({
        text: cutsceneText[0], 
        font: new ex.Font({
            family: 'impact',
            size: 2,
            unit: ex.FontUnit.Rem,
        }),
    })

    textBox = new ex.Actor({
        pos: ex.vec(screenWidth/2, screenHeight/1.5),
        width: screenWidth,
        height: screenHeight
    });

    textBox.graphics.use(text)

    textBox.on('pointerdown', function() {
        cutsceneCount += 1
        if (cutsceneCount < cutsceneText.length) {
            text.text = cutsceneText[cutsceneCount]
        } else {
            passengine.goToScene('objectGame')
        }
        
    })

    CutSceneTwo.add(textBox)
    return CutSceneTwo
}