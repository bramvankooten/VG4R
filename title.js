const TitleScreen = new ex.Scene()

let title = new ex.Actor({
    x: screenWidth/2,
    y: screenHeight/2,
    height:200,
    width:200,
})

var titleSprite = new ex.Sprite({
    image: AnimalImages[1],
    destSize: {
        height: 150,
        width: 150,
    }
})
titleSprite.scale = ex.vec(1.5,1.5)

title.graphics.use(titleSprite)
title.actions.repeatForever((repeatCtx) => {
    repeatCtx.moveBy(0,10,10),
    repeatCtx.moveBy(0,-10,10)
})
TitleScreen.add(title)

let titleText = new ex.Text({
    text: "Click or Tap to Start!!!", 
    font: new ex.Font({
        family: 'impact',
        size: 3,
        unit: ex.FontUnit.Rem,
    }),
})

instructions = new ex.Actor({
    pos: ex.vec(screenWidth/2, screenHeight/1.5),
});
instructions.graphics.use(titleText)

TitleScreen.add(instructions)