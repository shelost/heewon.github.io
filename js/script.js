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
            <div class = 'item hoverable'>
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
                    <div class = 'tags'>
            `
        for (let k = 0; k < item.tags.length; k++){
            let tag = item.tags[k]

            let icon = ''
            let scale = 1

            switch (tag.toLowerCase()) {
                case 'gallery':
                    icon = 'collections_bookmark'
                    break
                case 'origami':
                    icon = 'devices_fold'
                    break
                case 'illustrator':
                    icon = 'palette'
                    break
                case 'android':
                    icon = 'android'
                    break
                case 'game':
                    icon = 'sports_esports'
                    break
                case 'html':
                    icon = 'code'
                    break
                case 'js':
                    icon = 'javascript'
                    scale = 1.3
                    break
                case 'css':
                    icon = 'css'
                    scale = 1.3
                    break
                case 'research':
                    icon = 'science'
                    break
                default:
                    break
            }

            str +=
                `
                <div class = 'tag'>
                    <span class="material-symbols-outlined" style = 'transform: scale(${scale})'>${icon}</span>
                    <p>${tag}</p>
                </div>
                `
        }
        str +=
            `
                    </div>
                </div>
            </a>
            `
    }
    str += `</div> <div class = 'divider'> </div> </div>`
}

Id('main').innerHTML = str


Id('contact').onclick = () => {
    window.scrollTo(0, document.body.scrollHeight);
}


//Id('progress').style.width = (window.scrollY / window.scrollHeight) * 96 + "vw"



let loop2 = () => {

    Id('progress').style.width = (window.scrollY / document.documentElement.scrollHeight)*1.2*96+"vw"


    window.requestAnimationFrame(loop2)
}
window.requestAnimationFrame(loop2)
