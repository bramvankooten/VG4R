const screen_y_padding = screenHeight / 10
const objectSize = screenHeight / 20

const engine = new ex.Engine({
    // displayMode: ex.DisplayMode.FillScreen,
    viewport: {
        width: screenWidth,
        height: screenHeight,
    },
    resolution: {
        width: screenWidth,
        height: screenHeight
    },
    suppressHiDPIScaling: true,
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
for (let i = 0; i < Gradients.length; i++) {
	loader.addResource(Gradients[i]);
}
for (let i = 0; i < Characters.length; i++) {
	loader.addResource(Characters[i]);
}
for (let i = 0; i < UI.length; i++) {
	loader.addResource(UI[i]);
}
for (var sound in Sounds) {
    loader.addResource(Sounds[sound])
}

engine.add('cutscene_one', buildCutsceneOne(engine))
engine.add('cutscene_two', buildCutSceneTwo(engine))
engine.add('objectGame', buildObjectGame(engine))
engine.add('title', TitleScreen)


engine.start(loader).then(() => {
    engine.goToScene('cutscene_one')
    // engine.input.pointers.on('down', function() {
    //     engine.input.pointers.primary.off("down");
    //     engine.goToScene('objectGame')
    // })
})