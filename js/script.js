let XP = 1, YP = 1
let MX = 0, MY = 0


//________________________________ Add HTML ________________________________//

let str = ''

for (let i = 0; i < DATA.length; i++){
    let sec = DATA[i]

    str +=
        `
        <div class = 'sec'>
            <div class = 'header'>
                <h1> ${sec.title} </h1>
                <h2> ${sec.blurb} </h2>
            </div>
            <div class = 'items'>
        `

    for (let j = 0; j < sec.items.length; j++){
        let item = sec.items[j]
        str +=
        `
          <a href = '${item.href}'>
            <div class = 'item'>
                <div class = 'img hoverable' style = 'background-image: url(assets/${item.img}.png)'></div>
                <div class = 'expo'>
                    <div class = 'name'>
                        <h1>
                            ${item.name}
                        </h1>
                   `
        if (item.active) str += `<span class="material-icons"> cloud_done </span>`
        str +=
            `
                        </div>
                        <p> ${item.blurb} </p>
                    </div>
                </div>
            </a>
            `
    }
    str += `</div> </div>`
}

Id('main').innerHTML = str


//________________________________ Interaction ________________________________//

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

Id('contact').onclick = () => {
    window.scrollTo(0, document.body.scrollHeight);
}

//________________________________ Canvas ________________________________//


const backdrop = Id('backdrop')
const canvas = Id('canvas')
const btx = backdrop.getContext('2d')
const ctx = canvas.getContext('2d')

let height = window.innerHeight
let width = window.innerWidth
let ratio = window.innerWidth / window.innerHeight


let r1 = 0
let r2 = 0
let step = 0.5

//________________________________ Loop ________________________________//

let loop = () => {

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
            hovering = true
        }
    }
    if (hovering) {
        r2 = 8
        r1 += step
        if (r1 > 25 || r1 < 15) {
            step = step * -1
        }
    } else {
        r1 = 15
        r2 = 10
    }

    if (in_window) {
        ctx.globalAlpha = 0.8
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(MX, MY, r1, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1

        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(MX, MY, r2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }

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

    Id('rock-1').style.left = -800 + 40 * xw * XP + 'px'

    Id('rock-2').style.left = -900 + 30 * xw*XP + 'px'

    Id('rock-3').style.left = -500 + 45 * xw * XP + 'px'

    Id('adam').style.left = -50 + 42 * xw * XP + 'px'

    Id('god').style.bottom = 300 + 40*yw + 'px'
    Id('god').style.right = -600 + 45 * xw * (2-XP) + 'px'

    Id('cloud-1').style.bottom = 200 + 40*yw + 'px'
    Id('cloud-1').style.right = -500 + 40 * xw * (2-XP) + 'px'

    Id('cloud-2').style.bottom = 300 + 20*yw + 'px'
    Id('cloud-2').style.left = width - 30 * xw * (2-XP) + 'px'

    Id('cloud-3').style.bottom = 500 + 20*yw + 'px'
    Id('cloud-3').style.left = 200 + 30 * xw * XP + 'px'

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