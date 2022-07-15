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
                <div class = 'img' style = 'background-image: url(assets/${item.img}.png)'></div>
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

let XP = 1, YP = 1
let MX = 0, MY = 0

window.addEventListener('mousemove', e => {
    MX = e.clientX
    MY = e.clientY

    let xc = window.innerWidth / 2
    let yc = window.innerHeight / 2

    XP = 1 + (xc - MX) / (xc * 20)
    YP = 1 + (MY - yc) / (yc*20)
})

let loop = () => {

    let width = window.innerWidth
    let height = window.innerHeight
    let ratio = window.innerWidth / window.innerHeight
    let vw = window.innerWidth / 100
    let vh = window.innerHeight / 100
    let xw = (window.innerWidth - 1000) / 100
    let yw = (window.innerHeight - 600)/100
    let scale = Math.log10(window.innerWidth/500)


    /*
    if (ratio > 2.5) {
        Id('banner').style.backgroundImage = `url(assets/adam4.png)`
    } else if (window.innerWidth < 800) {
        Id('banner').style.backgroundImage = `url(assets/adam3.png)`
    } else{
        Id('banner').style.backgroundImage = `url(assets/adam2.png)`
    }
    */

    for (let i = 0; i < Class('piece').length; i++){
        let div = Class('piece')[i]
       // div.style.transform = `scale(${scale})`
    }

    Id('rock-1').style.left = -300 + 40 * xw * XP + 'px'

    Id('rock-2').style.left = -500 + 30 * xw*XP + 'px'

    Id('rock-3').style.left = -200 + 45 * xw * XP + 'px'

    Id('adam').style.left = 150 + 42 * xw * XP + 'px'

    Id('god').style.bottom = 300 + 40*yw*YP + 'px'
    Id('god').style.right = -600 + 45 * xw * (2-XP) + 'px'

    Id('cloud-1').style.bottom = 200 + 40*yw*YP + 'px'
    Id('cloud-1').style.right = -500 + 40 * xw * (2-XP) + 'px'

    Id('cloud-2').style.bottom = 200 + 20*yw*YP + 'px'
    Id('cloud-2').style.left = width - 30 * xw * (2-XP) + 'px'

    Id('cloud-3').style.bottom = 500 + 20*yw*YP + 'px'
    Id('cloud-3').style.left = 200 + 30* xw * XP + 'px'

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)