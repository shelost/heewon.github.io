const steps = [
    {
        img: '1',blurb: 'Get a piece of paper.'
    },
    {
        img: '2',blurb: 'Turn it over.'
    },
    {
        img: '4',blurb: 'Fold the paper into 16 squares...'
    },
    {
        img: '3',blurb: '...so that it looks like this.'
    },
    {
        img: '5',blurb: 'Fold the paper into 16 squares.'
    },
    {
        img: '6',blurb: 'Cushion fold, then unfold again.'
    },
    {
        img: '7',blurb: 'Fold inside again...'
    },
    {
        img: '9',blurb: '...for a square base fold.'
    },
    {
        img: '12',blurb: 'Make an arrow fold on each square.'
    },
    {
        img: '14',blurb: 'Fold the leftover "flaps" inwards...'
    },

    {
        img: '15',blurb: '...so that the other side looks like this.'
    },
    {
        img: '16',blurb: 'Grab those folds & fold inward.'
    },

    {
        img: '19',blurb: 'Grab a petal & fold it back down.'
    },
    {
        img: '21',blurb: 'Repeat for all four petals.'
    },

    {
        img: '24',blurb: 'Make an inward fold for each petal.'
    },
    {
        img: '28',blurb: 'It should now look like this from the top.'
    },
    {
        img: '29',blurb: 'Grab the very end of a petal & make a cute fold.'
    },
    {
        img: '35',blurb: 'And you\'re done!'
    },
]

let str = ''

for (let i = 0; i < steps.length; i++) {

    let step = steps[i]

    str +=
    `
    <div class = 'el'>
        <div class = 'img' style = 'background-image: url("img/${step.img}.jpg"); animation-delay:${i/20}s'></div>
        <div class = 'expo'>
            <h1> ${i+1} </h1>
            <p> ${step.blurb} </p>
        </div>
     </div>
    `
}

Id('main').innerHTML = str



