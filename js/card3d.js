class Card {

    constructor(data) {   
        this.element = document.createElement('div'); 
        this.element.classList.add('card-wrap');

        this.element.addEventListener('mousemove', CardEvent.onMouseMove(this.element));
        this.element.addEventListener('mouseleave', CardEvent.onMouseLeave(this.element));

        this.element.innerHTML = `
            <div class="card">
                <div class="card-background" style="background-image: url('${data.background}')"></div>
                <div class="card-info">
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
                </div>
            </div>
        `;
    }

    getElement() {
        return this.element;
    }
}

class CardEvent {
    
    static onMouseMove(cardWrapElement) {
        return function({ x, y }) {
            const { top, left, width, height } = cardWrapElement.getBoundingClientRect();

            const mousePX = (x - left - width / 2) / width;
            const mousePY = (y - top - height / 2) / height;

            cardWrapElement.querySelector('.card').style.transform = `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`; 
            cardWrapElement.querySelector('.card-background').style.transform = `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`;
        }  
    }

    static onMouseLeave(cardWrapElement) {
        return function() {
            setTimeout(() => { 
                cardWrapElement.querySelector('.card').style.transform = `rotateY(0deg) rotateX(0deg)`;
                cardWrapElement.querySelector('.card-background').style.transform = `translateX(0px) translateY(0px)`;
            }, 1000 )
        } 
    }
}