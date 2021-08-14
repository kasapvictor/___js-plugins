class Spoiler {

	constructor ( selector = null, config = false ) {
		this.wrapper = document.querySelector ( `${ selector }` ) || false;

		if ( this.wrapper ) {
			this.spoilers = this.wrapper.querySelectorAll ( `[data-spoiler]` );
			this.isSingle = config.isSingle || false; // при открытии одного спойлера закрывать другие
			this.cbOpen = config.cbOpen || false; // функция колбэк при открытии
			this.cbClose = config.cbClose || false; // функция колбэк при закрытии

			// инициализация спойлеров
			if ( this.spoilers.length > 0 ) this.init ();
		}
	}

	init () {
		this.spoilers.forEach ( spoiler => {
			const trigger = this.getTrigger ( spoiler );
			const content = this.getContent ( spoiler );

			// если есть триггер то установить слушателя событий и вызывать метод open при клике
			if ( trigger ) {
				trigger.addEventListener ( 'click', () => {
					if ( spoiler.classList.contains ( 'active' ) ) {
						this.close ( spoiler, content );

						// при закрытии вызвать эту колбэк функцию
						if ( this.cbClose ) this.cbClose ();
					} else {
						this.open ( spoiler, content );

						// если есть колбек функция при открытии то вызвать эту функцию
						if ( this.cbOpen ) this.cbOpen ();
					}
				} );
			}

			// если атрибут data-spoiler равен open то по умолчанию спойлер будет открыт
			// не будет работать если включена опция config.isSingle (открывать только по одному спойлеру) === true
			if ( spoiler.dataset.spoiler === 'open' ) {
				this.open ( spoiler, content );
			}
		} );
	}

	// возвращает элемент триггера
	getTrigger ( spoiler ) {
		const trigger = spoiler.querySelector ( '[data-spoiler-trigger]' );
		if ( trigger ) {
			return trigger;
		} else {
			return false;
		}
	}

	// возвращает блок контента
	getContent ( spoiler ) {
		const content = spoiler.querySelector ( '[data-spoiler-content]' );
		if ( content ) {
			return content;
		} else {
			return false;
		}
	}

	// открытие контента на всю высоту контента и добавляет класс active элементу spoiler
	open ( spoiler, content ) {
		if ( spoiler && content ) {

			// если значение true то закрыть все спойлеры потом открыть тот на который кликнули
			if ( this.isSingle ) {
				this.closeAll ();
			}

			const contentHeight = content.scrollHeight;

			this.setHeightSpoilerContent ( content, contentHeight );

			spoiler.classList.add ( 'active' );
		}
	}

	// закрывает контент спойлера и удаляет класс active у элемента spoiler
	close ( spoiler, content ) {
		if ( spoiler && content ) {
			content.style.height = `0px`;
			spoiler.classList.remove ( 'active' );
		}
	}

	// закрыть все спойлеры
	closeAll () {
		this.spoilers.forEach ( spoiler => {
			const content = this.getContent ( spoiler );

			this.close ( spoiler, content );
		} );
	}

	// установка высоты контента
	setHeightSpoilerContent ( content, height ) {
		content.style.height = `${ height }px`;
	}
}

function cbOpen () {
	console.log ( 'call back --- open' );
}

function cbClose () {
	console.log ( 'call back --- close' );
}


// SPOILER 1
const config1 = {
	isSingle: true, // если включена эта опция то по умолчанию может быть открыт только один спойлер
	cbOpen: cbOpen, // вызывается функция при каждом открытии
	cbClose: cbClose, // вызывается функция при каждом закрытии
};
const spoiler1 = new Spoiler ( '.myspoilers1', config1 );

// SPOILER 2
const config2 = {
	//isSingle: true, // если включена эта опция то по умолчанию может быть открыт только один спойлер
	cbOpen: cbOpen, // вызывается функция при каждом открытии
	cbClose: cbClose, // вызывается функция при каждом закрытии
};
const spoiler2 = new Spoiler ( '.myspoilers2', config2 );




