(() => {
    'use-strict'

    const buttonSeeMore = document.querySelector('.see-more')
    const userEvents    = ['click', 'touchend']
    const loading       = document.querySelector('.loading')
    const contentContainer = document.querySelector('.heroes')

    function createListeners(element, events, callback) {
        events.forEach(e => {
            element.addEventListener(e, callback, { once: true })
        })
    }

    const url = 'data/heroes.json'

    const headerInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }

    function loadingStage(stage) {
        loading.style.display = stage
    }

    function renderHeroesList(info) {
        const divHeroes = document.createElement('div')
        divHeroes.classList.add('heroes__information')

        divHeroes.innerHTML = `       
                            <img src="${info.img}" alt="Spider Man" class="information__image">
                            <div class="information__details">
                                <h2 class="details__title">${info.name}</h2>
                                <p class="details__para">${info.description}</p>
                                <button type="button" class="details__button ">More</button>
                            </div>   
        
        `

        contentContainer.appendChild( divHeroes )
    }

    const selectAllInformation = async (e) => {
        e.preventDefault()
        loadingStage('block')     
        await fetch(url, headerInfo)
        .then(response => {
            if(response.status === 200) {
                return response.json()
            }
        })
        .then(json => {
            const data = json
            data.forEach(data => {
                renderHeroesList(data)
            })
        })

        loadingStage('none')
    }    
    
    createListeners(buttonSeeMore, userEvents, selectAllInformation)
})()