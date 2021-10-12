const board = document.querySelector('#rate')
const colors = ['#82941f', '#1f9494', '#1f2794', '#632750']
const STAR_RATE = 5

for (let i = 0; i < STAR_RATE; i++) {
    const star = document.createElement('i')  //динамически создает элемент
    star.classList.add('ratestar')
    star.innerHTML = 'star_border'

    star.addEventListener('mouseover', () =>  
    setStar(star)) //вызывается при наведении мыши

    star.addEventListener('mouseleave', () =>  
    removeColor(star)) //вызывается когда убираем мышь 

    star.addEventListener('click', () =>  
    clickStar(star))
    star.addEventListener('click', () =>  
    onClickStar(star))


    rate.append(star)

}

function setStar(element) {
    element.innerHTML = 'star'
    
}

function removeStar(element) {
    element.innerHTML = 'star_border'
}

/*function clickStar(element) {
    element.innerHTML = 'star'
}*/

function onClickStar(element) {
    element.innerHTML = 'star_border'
}
