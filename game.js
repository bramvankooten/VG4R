const game = new ex.Engine({
    width: 600,
    height: 800,
})

const screenPadding = 25

function randomPosition() {
    let x = Math.floor(Math.random() * (game.drawWidth - 2*screenPadding) ) + screenPadding,
        y = Math.floor(Math.random() * (game.drawHeight - 100) ) + 100;
    return {x, y}
}

let round = 1

function newRound() {
    let targetPos = randomPosition()

    const target = new ex.Actor({
        x: targetPos.x,
        y: targetPos.y,
        height:50,
        width:50,
        color: ex.Color.Red,
    })

    
    game.add(target)

    obstacles = []

    for (let i = 0; i < round*5; i++) {
        pos = randomPosition()
        colors = [ex.Color.Blue, ex.Color.Orange, ex.Color.Yellow, ex.Color.Green]
        randomChoice = Math.floor(Math.random() * colors.length)

        obstacle = new ex.Actor({
            x: pos.x,
            y: pos.y,
            height: 50,
            width: 50,
            color: colors[randomChoice]
        })
        obstacles.push(obstacle)
        game.add(obstacle)
    }

    target.on('pointerdown', function() {
        round += 1
        label.text = 'Round ' + round
        obstacles.forEach((obstacle) => {
            obstacle.kill()
        });
        target.kill()

        newRound()
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

game.start()