const searchForm = document.querySelector('.search')
const loading = document.querySelector('.loading')
const results = document.querySelector('.results')
const inputValue = document.querySelector('#search')
const mainText = document.querySelector('.main-text')

const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=;'
const config = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
}


const searchParams = (e) => {
    e.preventDefault()
    loading.classList.add('loading--active')
    const queryUrl = url + inputValue.value   

    if(inputValue.value.trim() !== '') {
        fetch(queryUrl, config)
        .then(response => response.json())
        .then(json => {
            console.log(json.status)
            selectData(json.query)
        } ) 
    }
}

const selectData = (data) => {
    results.innerHTML = ''
    document.body.style.height = '100%'
    mainText.textContent = 'Results For ' + inputValue.value
    data.search.forEach(data => {
        console.log(data)
        const div = document.createElement('div')
        div.classList.add('results__information')
        div.innerHTML = `
                        <h2 class="information__title">${data.title}</h2>
                        <p class="information__para">${data.snippet}</p>
                        <small class="information__size">Wordcount: ${data.wordcount}</small>    
                        <a href="https://en.wikipedia.org/wiki/?curid=${data.pageid}" target="_blank"><button type="button" class="information__button">Read</button><a/> 
        `
        results.appendChild( div )

    })

    loading.classList.remove('loading--active')
}

searchForm.addEventListener('submit', searchParams)