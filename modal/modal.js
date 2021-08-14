class Modal {
	constructor ( config = null ) {
		this.targets = document.querySelectorAll ( '[data-modal-target]' );
		this.modals = null;
		this.scrollOn = config.scroll || false;
		this.cbOpen = config.cbOpen || false;
		this.cbClose = config.cbClose || false;

		if ( this.targets.length > 0 ) this.init ();
	}

	// инициализация
	init () {
		this.initTargets ();
		this.initModals ();
	}

	// инициализация по клику на триггер модального окна
	initTargets () {
		const targets = [ ...this.targets ];

		targets.forEach ( target => target.addEventListener ( 'click', () => {
			const name = target.dataset.modalTarget;

			// если значение атрибута data-modal-target не пустое, то вызвать функцию open
			if ( name !== '' ) {
				this.open ( name );

				// если установлено значение true то для боди отменить скролл
				if ( this.scrollOn ) this.bodyScrollOff ();

				// вызов функции колбэк из конфига если есть имя и есть функция
				this.cb ( name, true );
			}
		} ) );
	}

	initModals () {
		this.modals = this.getModals ();
	}

	getModals () {
		const modals = document.querySelectorAll ( '[data-modal]' );
		return [ ...modals ].reduce ( ( prev, modal ) => {
			// получаем имя модального окна
			const name = modal.dataset.modal;

			// добавляем в объект модальное окно где ключ это имя
			prev[name] = modal;

			// инициализация закрытия окна
			this.initClose ( modal, close );

			return prev;
		}, {} );
	}

	// инициализация закрытия по клику на data-modal-close и при нажатии на ESC
	initClose ( modal ) {
		const name = modal.dataset.modal;

		// событие при клике на ESC закрывает модальное окно
		document.addEventListener ( 'keydown', ( e ) => {
			if ( e.code === "Escape" && modal.classList.contains ( 'active' ) ) {
				modal.classList.remove ( 'active' );

				// возвращает скролл для body
				if ( this.scrollOn ) this.bodyScrollOn ();
			}
		} );

		// событие при клике на кнопку закрыть и на фон
		// закрывает модальное окно
		const closes = modal.querySelectorAll ( '[data-modal-close]' );

		closes.forEach ( close => close.addEventListener ( 'click', () => {
			modal.classList.remove ( 'active' );

			// возвращает скролл для body
			if ( this.scrollOn ) this.bodyScrollOn ();

			this.cb ( name, false );
		} ) );
	}

	// открыть модальное окно
	open ( name ) {
		// получаем модальное окно
		const modal = this.modals[`${ name }`];

		// если такое модальное окно есть то добавить класс active
		if ( modal && !modal.classList.contains ( 'active' ) ) {
			modal.classList.add ( 'active' );
		}
	}

	// отменяет скролл для body
	bodyScrollOff () {
		const body = document.querySelector ( 'body' );
		body.style.overflow = 'hidden';
	}

	// возвращает скролл для body
	bodyScrollOn () {
		const body = document.querySelector ( 'body' );
		body.style.overflow = 'auto';
	}

	// вызов колбк функции с проверкой события на открытие или закрытие модального окна
	cb ( name, open = true ) {
		if ( open ) {
			if ( this.cbOpen && this.cbOpen[`${ name }`] ) {
				this.cbOpen[`${ name }`] ();
			}
		} else {
			if ( this.cbClose && this.cbClose[`${ name }`] ) {
				this.cbClose[`${ name }`] ();
			}
		}
	}
}

function cb1open () {
	console.log ( 'callback function MODAL 1 OPEN' );
}

function cb1close () {
	console.log ( 'callback function MODAL 1 CLOSE' );
}

function cb2open () {
	console.log ( 'callback function MODAL 2 OPEN' );
}

function cb2close () {
	console.log ( 'callback function MODAL 2 CLOSE' );
}

const config = {
	scroll: true, // включить / отключить скролл для боди если открыто модальное окно (true/false)
	cbOpen: { // колбэкфункции при открытии
		'modal1': cb1open,
		// 'modal2': cb2open
	},
	cbClose: { // колбэкфункции при закрытии
		// 'modal1': cb1close,
		'modal2': cb2close
	},
}
new Modal ( config );