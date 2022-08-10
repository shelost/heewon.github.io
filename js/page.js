let str =
    `
    <h1> ${PAGE.title} </h1>
    <p> ${PAGE.blurb} </p>
    <div class = 'tags'>
    `

for (let i = 0; i < PAGE.tags.length; i++) {
    str += `<h3 class = 'tag'> ${PAGE.tags[i]} </h3>`
}
str += `</div>`
Id('title').innerHTML = str

str = ``
for (let i = 0; i < PAGE.elems.length; i++){
    let elem = PAGE.elems[i]

    str +=
    `
    <div class = 'elem'>
        <img src = '../../assets/img/${elem.img}.png' alt = 'img'>
        <div class = 'expo'>
            <h1> ${elem.name} </h1>
            <p> ${elem.blurb} </p>
        </div>
    </div>
    `
}
Id('main').innerHTML = str

Id('name').innerHTML = `${PAGE.title}`

