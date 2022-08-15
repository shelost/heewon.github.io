//________________________________ Interaction ________________________________//

let XP = 1, YP = 1
let MX = 0, MY = 0

let in_window = true

window.addEventListener('mousemove', e => {
    in_window = true

    MX = e.clientX
    MY = e.clientY

    let xc = window.innerWidth / 2
    let yc = window.innerHeight / 2

    XP = 1 + (xc - MX) / (xc * 20)
    YP = 1 + (MY - yc) / (yc*20)
})

window.addEventListener('mouseleave', e => {
    in_window = false
    console.log('yo')
})


window.addEventListener('mouseenter', e => {
    in_window = true
})

document.addEventListener("mouseleave", e => {
    if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight))
    {
        in_window = false
    }
});

function hover(x, y, w, h) {
    if (MX > x && MX < x + w && MY > y && MY < y + h) {
        return true
    }
    return false
}

//________________________________ Canvas ________________________________//

const backdrop = Id('bg')
const canvas = Id('canvas')
const btx = backdrop.getContext('2d')
const ctx = canvas.getContext('2d')

let height = window.innerHeight
let width = window.innerWidth
let ratio = window.innerWidth / window.innerHeight

let r1 = 0
let r2 = 0
let step = 0.5

let angle = 0

let loc = []

//________________________________ Loop ________________________________//

let loop = () => {

    //document.body.style.cursor = 'none'

    // hover

    // backdrop

    backdrop.width = window.innerWidth
    backdrop.height = window.innerHeight

    // canvas

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let hovering = false

    for (let i = 0; i < Class('hoverable').length; i++) {
        let div = Class('hoverable')[i]
        let rect = div.getBoundingClientRect()
        if (hover(rect.x, rect.y, rect.width, rect.height)) {
            hovering = div
        }
    }

    if (hovering) {
        r2 = 12
        r1 += step
        if (r1 > 25 || r1 < 15) {
            step = step * -1
        }
    } else {
        r2 = 8
        r1 = 15
    }

    if (in_window) {
        ctx.globalAlpha = 1
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(MX, MY, r2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1

        /*
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(MX, MY, r2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        */
    }

    if (in_window) {

        for (let i = 0; i <3; i++){

            if (loc[i] == undefined) {
                loc[i] = [0,0,0,0]
            }

            let c = loc[i]

            let dx = MX - c[0]
            let dy = MY - c[2]

            let theta = Math.atan(dy / dx)
            let speed = 2 - 0.4*i

            let xs = speed * Math.abs(Math.cos(theta))
            let ys = speed * Math.abs(Math.sin(theta))

            if (dx > 1) {
                c[1] += xs
            } else if (dx < -1){
                c[1] -= xs
            } else {
                c[1] *= 0.2
            }

            if (dy > 1) {
                c[3] += ys
            } else if (dy < -1){
                c[3] -= ys
            } else {
                c[3] *= 0.2
            }

            c[0] += c[1]
            c[2] += c[3]

            c[1] *= 0.9
            c[3] *= 0.9

            let a = (angle + i) * ((-1) ** (i))
            let r = 30+20*i

            btx.globalAlpha = 0.3 - 0.1 * i
            btx.globalAlpha = 0.1
            btx.lineWidth = 3;
            btx.lineCap = 'round'
            //btx.fillStyle = 'black'

                btx.strokeStyle = 'black'
                btx.beginPath()
                btx.arc(c[0], c[2], r, 0, Math.PI*2)
                //btx.stroke()
                btx.fill()
                btx.closePath()
           // ctx.fill()

        }
        ctx.globalAlpha = 1;
    }

    //ctx.globalAlpha = 0.5;
    //ctx.fillStyle = 'red'
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    angle += 0.1;

    // pieces

    width = window.innerWidth
    height = window.innerHeight
    ratio = window.innerWidth / window.innerHeight
    let vw = window.innerWidth / 100
    let vh = window.innerHeight / 100
    let xw = (window.innerWidth - 1000) / 100
    let yw = (window.innerHeight - 600)/100
    let scale = Math.log10(window.innerWidth / 500)

    for (let i = 0; i < Class('piece').length; i++){
        let div = Class('piece')[i]
       // div.style.transform = `scale(${scale})`
    }

    /*
    Id('rock-1').style.left = -600 + 35 * xw * XP + 'px'

    Id('rock-2').style.left = -900 + 30 * xw*XP + 'px'

    Id('rock-3').style.left = -500 + 45 * xw * XP + 'px'

    Id('adam').style.left = -50 + 42 * xw * XP + 'px'

    Id('god').style.bottom = 250 + 40*yw + 'px'
    Id('god').style.right = -600 + 45 * xw * (2-XP) + 'px'

    Id('cloud-1').style.bottom = 150 + 40*yw + 'px'
    Id('cloud-1').style.right = -500 + 40 * xw * (2-XP) + 'px'

    Id('cloud-2').style.bottom = 250 + 20*yw + 'px'
    Id('cloud-2').style.left = width - 30 * xw * (2-XP) + 'px'

    Id('cloud-3').style.bottom = 450 + 20*yw + 'px'
    Id('cloud-3').style.left = 200 + 30 * xw * XP + 'px'
    */

/*
    if (ratio > 2.5) {
        Id('banner').style.backgroundImage = `url(assets/adam4.png)`
    } else if (window.innerWidth < 800) {
        Id('banner').style.backgroundImage = `url(assets/adam3.png)`
    } else{
        Id('banner').style.backgroundImage = `url(assets/adam2.png)`
    }
    */

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)