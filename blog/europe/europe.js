

const T = Id('terracotta')
const V = Id('voltaire')
const H = Id('header')
const M = Id('mast')
const Q = Id('qing')
const N = Id('menu')
const Sc = Id('scroll')

let Ts = 0
let Vs = -120

T.style.left = Ts + 'px'
V.style.right = Vs + 'px'

let Tr = T.getBoundingClientRect()
let Vr = V.getBoundingClientRect()

Resize()

let coords = []

for (i = 0; i < Class('anchor').length; i++){
    let title = Class('anchor')[i]
    let menu = Class('menu_item')[i]

    coords.push(title.getBoundingClientRect().top + window.scrollY)


    menu.onclick = () => {

        let id = menu.id.substring(1)

        console.log(title, title.getBoundingClientRect())

        console.log(title)

        window.scrollTo({
            left: 0,
            top: title.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
        })

    }
}


function Resize() {
    let ratio = window.scrollY / window.screen.height

    Sc.style.opacity = 1 - ratio * 4


    if (window.screen.width > 800) {
        if (ratio < 1) {
            T.style.left = Ts - ratio * Tr.width + 'px'
            V.style.right = Vs - ratio * Vr.width + 'px'

            T.style.bottom = -40 - ratio * 80 + 'px'
            V.style.bottom = -40 - ratio * 120 + 'px'

            T.style.opacity = 1 - ratio
            V.style.opacity = 1 - ratio

            T.style.transform = `rotate(${-ratio*15}deg)`
            V.style.transform = `rotate(${ratio*15}deg)`

            M.style.opacity = 1-ratio*2

            Q.style.transform = `scale(${1 - ratio/4})`
            Q.style.opacity = 1 - ratio * 2

            N.style.opacity = ratio * 2 - 0.5


        }
    } else {

        H.style.opacity = 1 - ratio * 2
        T.style.opacity = 1 - ratio * 6
        V.style.opacity = 1 - ratio * 3

    }

}

window.addEventListener('scroll', Resize)
window.addEventListener('resize', Resize)


window.onscroll = () => {

    for (let i = 0; i < coords.length; i++){
        let coord = coords[i]
        if (i < coords.length - 1) {
            let next = coords[i + 1]
            console.log(coord, next)
            if (coord < window.scrollY && window.scrollY < next) {
                for (let i = 0; i < Class('menu_item').length; i++){
                    let item = Class('menu_item')[i]
                    item.classList.remove('active')
                }
                Class('menu_item')[i].classList.add('active')
            }
        } else {
            if (coord < window.scrollY) {
                for (let i = 0; i < Class('menu_item').length; i++){
                    let item = Class('menu_item')[i]
                    item.classList.remove('active')
                }
                Class('menu_item')[i].classList.add('active')
            }
        }
    }
}