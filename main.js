class Slider {
	constructor(elemSelector, opts) {
		this.currentSlide = 0 //aktualny slide
		this.sliderSelector = elemSelector //selektor elementu ktory zmieniamy na slider
		this.elem = null //pobieramy element ktory zamieniamy na slider
		this.slider = null //wygenerowanie slidera
		this.slides = null //pobieranie slajdow
		this.prev = null //przycisk prev
		this.next = null //przycisk next
		this.dots = [] //przycisk kropek
		this.time = null

		const defaultOpts = {
			pauseTime: 0,
		}
		this.options = { ...defaultOpts, opts }

		this.generateSlider()
		this.changeSlide(this.currentSlide)
	}

	generateSlider() {
		//pobieramy element ktory zamieniamy na slider
		this.slider = document.querySelector(this.sliderSelector)
		this.slider.classList.add('slider')

		//tworzymy kontenert dla slajdow
		const slidesCnt = document.createElement('div')
		slidesCnt.classList.add('slider-slides-cnt')

		//pobieramy element slajdów
		this.slides = this.slider.children

		//zywa kolekcja -> przy przeniesieniu kazdego slajdu jej długość maleje
		while (this.slides.length) {
			this.slides[0].classList.add('slider-slide')
			//  jezeli dodajemy element do innego elementu to tak jakbysmy usuwali go z tej kolekcji, bo jeden element nie moze byc rownoczenie w dowch miejscach na raz
			slidesCnt.append(this.slides[0])
		}

		//na nowo pobieramy slajdy, bo kolekcja powyzsza jest juz pusta
		this.slides = slidesCnt.querySelectorAll('.slider-slide')

		//wygenerowany konterner ze slajdami wstawiamy do kontenera
		this.slider.append(slidesCnt)

		this.createPrevNext()
		this.createPagination()
	}

	createPrevNext() {
		//generujemy przycisk "poprzedni slajd"
		this.prev = document.createElement('button')
		this.prev.type = 'button'
		this.prev.innerText = 'Poprzedni slajd'
		this.prev.classList.add('slider-button')
		this.prev.classList.add('slider-button-prev')
		this.prev.addEventListener('click', this.slidePrev.bind(this))

		//generujemy przycisk "nastepny slajd"
		this.next = document.createElement('button')
		this.next.type = 'button'
		this.next.innerText = 'Następny slajd'
		this.next.classList.add('slider-button')
		this.next.classList.add('slider-button-next')
		this.next.addEventListener('click', this.slideNext.bind(this))

		//wrzucamy je do wspolnego diva, ktory da nam wiecej mozliwosci stylowania
		const nav = document.createElement('div')
		nav.classList.add('slider-nav')
		nav.appendChild(this.prev)
		nav.appendChild(this.next)

		//diva z przyciskami wrzucamy do slajdu
		this.slider.appendChild(nav)

		this.prev.addEventListener('click', () => this.slidePrev())
	}

	createPagination() {
		const ulDots = document.createElement('ul')
		ulDots.classList.add('slider-pagination')

		//tworzymy petle w ilosci liczby slajdow
		for (let i = 0; i < this.slides.length; i++) {
			//kazdorozaow tworzymy li wraz z buttonem, kazdy button po kliknieciu zamieni slajd za pomoca metody changeSlide()

			const li = document.createElement('li')
			li.classList.add('slider-pagination-element')

			const btn = document.createElement('button')
			btn.classList.add('slider-pagination-button')
			btn.type = 'button'
			btn.innerText = i + 1
			btn.setAttribute('aria-label', `Ustaw slajd ${i + 1}`)

			btn.addEventListener('click', () => this.changeSlide(i))

			li.appendChild(btn)

			ulDots.appendChild(li)

			//wygenerowany przycisk wrzucamy do wspolnej tablicy, dzieki temu pozniej bedzie nnam łątwiej sie odwołać do kropek
			this.dots.push(li)
		}
		this.slider.appendChild(ulDots)
	}

	changeSlide(index) {
		//robimy petle po slajdach usuwajac klase active
		this.slides.forEach(slide => {
			slide.classList.remove('slider-slide-active')
			slide.setAttribute('aria-hidden', true)
		})
		//dodajemy ja tylko wybranemu
		this.slides[index].classList.add('slider-slide-active')
		this.slides[index].setAttribute('aria-hidden', false)

		//podobnie dla kropek
		this.dots.forEach(dot => {
			dot.classList.remove('slider-pagination-element-active')
		})
		this.dots[index].classList.add('slider-pagination-element-active')

		//aktualny slajd przestawiamy na wybrany
		this.currentSlide = index

		//automatyczne przełączanie co 5 sekund
		clearTimeout(this.time)
		this.time = setTimeout(() => this.slideNext(), 5000)
	}

	slidePrev() {
		this.currentSlide--
		if (this.currentSlide < 0) {
			this.currentSlide = this.slides.length - 1
		}
		this.changeSlide(this.currentSlide)
	}

	slideNext() {
		this.currentSlide++
		if (this.currentSlide > this.slides.length - 1) {
			this.currentSlide = 0
		}
		this.changeSlide(this.currentSlide)
	}
}
const slide = new Slider('#slider1')

const opts = {
	width: 100,
}

const defaultOpts = {
	width: 10,
	height: 200,
}

const options = { ...defaultOpts, ...opts }
console.log(options)
