class Tabs {
	constructor ( selector, config = null ) {
		this.wrapper = document.querySelector ( `${ selector }` ) || false;

		if ( this.wrapper ) {
			this.defaultIndex = config.defaultIndex || 1;
			this.cb = config.cb || false;
			this.menu = this.wrapper.querySelector ( '[data-tabs-menus]' );
			this.content = this.wrapper.querySelector ( '[data-tabs-contents]' );

			if ( this.menu && this.content ) this.init ( );
		}
	}

	// инициализация меню
	init ( ) {
		const menu = this.menu;
		const items = menu.querySelectorAll ( '[data-tab-item]' );

		items.forEach ( item => {
			// устанавливаем класс active для значений по умолчанию
			if ( +item.dataset.tabItem === this.defaultIndex ) {
				item.classList.add ( 'active' );
				this.switchActiveContent ( +item.dataset.tabItem );
			}

			// слушаем нажатие на меню
			item.addEventListener ( 'click', () => {
				// удаляем у всех элементов .active[data-tab-item] класс .active
				this.removeActive ();

				// добавляем нажатому пункту меню класс .active
				item.classList.add ( 'active' );

				// меняем класс контента
				this.switchActiveContent ( +item.dataset.tabItem );

				// если передана функция колбэка
				if (this.cb) this.cb();
			} );
		} );

	}

	// переключает класс для активного контента
	switchActiveContent ( index ) {
		const el = this.content.querySelector ( `[data-tab-item="${ index }"]` );

		// если есть такой элемент то добавить класс active или вернет false
		if ( el ) {
			el.classList.add ( 'active' );
		} else {
			return false
		}
	}

	// удаляет класс active у меню и контента
	removeActive () {
		const items = this.wrapper.querySelectorAll ( '.active[data-tab-item]' );

		if ( items.length > 0 ) {
			items.forEach ( item => item.classList.remove ( 'active' ) );
		}
	}
}

function cb1 () {
	console.log ( 'function callback 1' )
}

function cb2 () {
	console.log ( 'function callback 2' )
}

const config1 = {
	defaultIndex: 2,
	cb: cb1
};
const tabs1 = new Tabs ( '.mytabs1', config1 );

const config2 = {
	defaultIndex: 4,
	cb: cb2
};
const tabs2 = new Tabs ( '.mytabs2', config2 );