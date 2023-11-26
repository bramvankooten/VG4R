const TitleScreen = new ex.Scene()

let title = new ex.Actor({
    x: screenWidth/2,
    y: screenHeight/2.5,
    height:200,
    width:200,
})

var titleSprite = new ex.Sprite({
    image: Characters[1],
    // destSize: {
    //     height: 150,
    //     width: 150,
    // }
})
// titleSprite.scale = ex.vec(1.5,1.5)

title.graphics.use(titleSprite)
title.actions.repeatForever((repeatCtx) => {
    repeatCtx.moveBy(0,10,10),
    repeatCtx.moveBy(0,-10,10)
})
TitleScreen.add(title)

let titleText = new ex.Text({
    text: "Thanks for playing\nour game!\nYou may now return\nto the survey.", 
    font: new ex.Font({
        family: 'Roboto',
        size: screenHeight/25,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
    }),
})

instructions = new ex.Actor({
    pos: ex.vec(13*screenWidth/16, screenHeight/1.1),
});
instructions.graphics.use(titleText)

TitleScreen.add(instructions)

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
    image: Gradients[4],
    destSize: {
        height: screenHeight,
        width: screenWidth,
    }
})

actor.graphics.use(background)

TitleScreen.add(actor);