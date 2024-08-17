

const T = Id('terracotta')
const V = Id('voltaire')
const H = Id('header')
const M = Id('mast')
const Q = Id('qing')

let Ts = 0
let Vs = -120

T.style.left = Ts + 'px'
V.style.right = Vs + 'px'

let Tr = T.getBoundingClientRect()
let Vr = V.getBoundingClientRect()

Resize()

function Resize() {
    let ratio = window.scrollY / window.screen.height


    for (i = 0; i < Class('title').length; i++){
        let title = Class('title')[i]
    }


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
            Q.style.opacity = 1-ratio*2
        }
    }

}

window.addEventListener('scroll', Resize)
window.addEventListener('resize', Resize)