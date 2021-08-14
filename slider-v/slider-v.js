/**
 * Вертикальный слайдер
 */
class SliderV {
	constructor ( config ) {
		this.slider = config.slider ?? false;
		this.auto = config.autoplay ?? false;
		this.interval = config.interval ?? 5000;
		this.stopOnHover = config.stopOnHover ?? true;
		this.direction = config.direction ?? 'prev';
		this.wrapLeft = null;
		this.itemsLeft = null;
		this.leftStep = 0;
		this.wrapRight = null;
		this.itemsRight = null;
		this.rightStep = 0;


		// если есть элемент
		if ( this.slider ) this.init ();
	}

	// инициализация слайдера
	init () {
		this.wrapLeft = this.slider.querySelector ( '.slider-v__left' );
		this.wrapRight = this.slider.querySelector ( '.slider-v__right' );
		const prev = this.slider.querySelector ( '.slider-v__prev' );
		const next = this.slider.querySelector ( '.slider-v__next' );

		// если есть кнопка назад, то запустить функцию
		if ( prev ) {
			this.prevHandler ( prev );
		}

		// если есть кнопка вперед, то запустить функцию
		if ( next ) {
			this.nextHandler ( next );
		}

		// запуск автопролистывание
		if ( this.auto ) {
			const el = this.direction === 'prev' ? prev : next;
			this.autoPlay ( el );
		}
	}

	// слушает событие клика на кнопку назад
	// запускает функцию смещения
	prevHandler ( prev ) {
		prev.addEventListener ( 'click', () => {
			this.moveLeftSlides ( 'up' );
			this.moveRightSlides ( 'up' );
		} );
	}

	// слушает событие клика на кнопку вперед
	// запускает функцию смещения
	nextHandler ( next ) {
		next.addEventListener ( 'click', () => {
			this.moveLeftSlides ( 'down' );
			this.moveRightSlides ( 'down' );
		} );
	}

	// смещение слайдов левой части
	moveLeftSlides ( direction ) {
		this.itemsLeft = this.wrapLeft.querySelectorAll ( '.slider-v__slide' );
		const items = this.itemsLeft;
		const maxStep = (items.length - 1) * 100;

		// проверка на кол-во элементов
		if ( items.length === 0 ) {
			return false
		}

		// левая часть слайдера прокручивает слайды вниз
		if ( direction === 'up' && (this.leftStep < maxStep) ) {
			this.leftStep = this.leftStep + 100;
			this.setTopSlides ( items, this.leftStep );
		} else if ( direction === 'up' && maxStep === this.leftStep ) {
			this.leftStep = 0;
			this.setTopSlides ( items, this.leftStep );
		}

		// левая часть слайдера прокручивает слайды вверх
		if ( direction === 'down' && this.leftStep > 0 ) {
			this.leftStep = this.leftStep - 100;
			this.setTopSlides ( items, this.leftStep );
		} else if ( direction === 'down' && this.leftStep === 0 ) {
			this.leftStep = 100 * (items.length - 1); // 100 * 3 = 300
			this.setTopSlides ( items, this.leftStep );
		}
	}

	// смещение слайдов правой части
	moveRightSlides ( direction ) {
		this.itemsRight = this.wrapRight.querySelectorAll ( '.slider-v__slide' );
		const items = this.itemsRight;
		const maxStep = (items.length - 1) * 100;

		if ( items.length === 0 ) {
			return false;
		}

		// левая часть слайдера прокручивает слайды вниз
		if ( direction === 'up' && (this.rightStep < maxStep) ) {
			this.rightStep = this.rightStep + 100;
			this.setTopSlides ( items, -this.rightStep );
		} else if ( direction === 'up' && maxStep === this.rightStep ) {
			this.rightStep = 0;
			this.setTopSlides ( items, this.rightStep );
		}

		// левая часть слайдера прокручивает слайды вверх
		if ( direction === 'down' && this.rightStep > 0 ) {
			this.rightStep = this.rightStep - 100;
			this.setTopSlides ( items, -this.rightStep );
		} else if ( direction === 'down' && this.rightStep === 0 ) {
			this.rightStep = 100 * (items.length - 1); // 100 * 3 = 300
			this.setTopSlides ( items, -this.rightStep );
		}
	}

	// задает позицию top для элементов
	setTopSlides ( items, step ) {
		items.forEach ( item => {
			item.style.top = `${ step }%`;
		} );
	}

	// автопролистывание
	autoPlay ( el ) {
		// новое событие клик
		const event = new Event ( 'click' );
		const timer = new Timer ( function () {
			el.dispatchEvent ( event );
		}, this.interval );

		timer.start ();

		// если установлен параметр this.stopOnHover=true
		// то включить действия при наведении мыши
		if ( this.stopOnHover ) {
			// возобновление события автопролистывания если мышка над слайдером
			this.slider.addEventListener ( 'mouseenter', () => {
				timer.stop ();
			}, false );

			// возобновление события автопролистывания если мышка не над слайдером
			this.slider.addEventListener ( 'mouseleave', () => {
				timer.start ();
			} );
		}
	}
}

/**
 * Задает старт и стоп и сброс таймера через setInterval
 */
class Timer {
	constructor ( fn, t ) {
		this.fn = fn;
		this.t = t;
		this.timerObj = setInterval ( this.fn, this.t );
	}

	stop () {
		if ( this.timerObj ) {
			clearInterval ( this.timerObj );
			this.timerObj = null;
		}
		return this;
	}

	start () {
		if ( !this.timerObj ) {
			this.stop ();
			this.timerObj = setInterval ( this.fn, this.t );
		}
		return this;
	}

	reset ( newT = this.t ) {
		this.t = newT;
		return this.stop ().start ();
	}
}


const config = {
	slider: document.querySelector ( '.slider-v' ),
	autoplay: false, // авто проигрывание
	interval: 3000, // пауза между пролистыванием
	stopOnHover: true, // остановка пролистывания если курсор находится над слайдером
	direction: 'prev', // направление перелистывания
}
new SliderV ( config );


