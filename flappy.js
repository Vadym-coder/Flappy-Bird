let cvs = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

cvs.width = 256
cvs.height = 512

let bird = new Image()
bird.src = "img/bird.png"

let back = new Image()
back.src = "img/back.png"

let pipe1 = new Image()
pipe1.src = "img/pipeBottom.png"

let pipe2 = new Image()
pipe2.src = "img/pipeUp.png"

let road = new Image()
road.src = "img/road.png"

let fly_audio = new Audio()
fly_audio.src = "audio/fly.mp3"

let score_audio = new Audio()
score_audio.src = "audio/score.mp3"

cvs.width = 256
cvs.height = 512

let score_text = document.getElementById("score")
let hs_text = document.getElementById("hs")

let score = 0
let hs = 0

let xPos = 10
let yPos = 150

let velY = 0
let gravity = 0.2

let pipe = []
pipe[0] = {
    x: cvs.width,
    y: 0
}

let gap = 110
let pause = false

function draw() {
    if (pause) return 0
    ctx.drawImage(back, 0, 0)
    ctx.drawImage(bird, xPos, yPos)
    if (yPos >= cvs.height - road.height) {
        reload()
    }

    velY += gravity
    yPos += velY

    for (let i = 0; i < pipe.length; i++ ) {
        if (pipe[i].x < -pipe2.width) {
            pipe.shift()
        } else {
            ctx.drawImage(pipe1, pipe[i].x, pipe[i].y + pipe2.height + gap)
            ctx.drawImage(pipe2, pipe[i].x, pipe[i].y)
    
            pipe[i].x -= 2
    
            if (pipe[i].x == 80) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipe2.height) - pipe2.height
                })
            }
        }
        
            if (xPos + bird.width >= pipe[i].x &&
                xPos <= pipe[i].x + pipe2.width &&
                (yPos <= pipe[i].y + pipe2.height ||
                yPos + bird.height >= pipe[i].y + pipe2.height + gap)) {
                reload()    
            }

            if (pipe[i].x == 0 ) {
                score++
                score_audio.play()
            }
    }

    ctx.drawImage(road, 0, cvs.height - road.height)
    score_text.innerHTML = "Score: " + score
    hs_text.innerHTML = "High Score: " + hs

}

document.addEventListener("keydown", function(event) {
    if (event.code == 'Space') {
        moveUp()
    }
})

function game_pause() {
    pause = !pause
}

function moveUp() {
    velY = -4
    fly_audio.play()
}

function reload() {
    if (score > hs) {
        hs = score
    }
    xPos = 10
    yPos = 150
    velY = 0
    gravity = 0.2
    score = 0
    pipe = []
    pipe[0] = {
    x: cvs.width,
    y: 0
    }
}

setInterval(draw, 20)
