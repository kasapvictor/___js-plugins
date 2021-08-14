window.onload = () => {
	analogInit ();
	digitInit ();
}

// время
const now = new Date ();
const h = now.getHours ();
const m = now.getMinutes ();
const s = now.getSeconds ();

const options = {
	month: 'long',
	day: 'numeric',
	weekday: 'long',
	timezone: 'UTC'
};

const fullDate = now.toLocaleString ( "ru", options );

function analogInit () {
	// элементы
	const wrap = document.querySelector ( '.analog' );
	const analogHour = wrap.querySelector ( '.analog__hours-arrow' );
	const analogMinutes = wrap.querySelector ( '.analog__minutes-arrow' );
	const analogSeconds = wrap.querySelector ( '.analog__seconds-arrow' );

	// загрузка элементов часов
	lazyLoad ( );

	// установка значений угла наклона стрелок
	analogHour.style.transform = `rotateZ(${ (h * 30) + (m / 2) }deg)`;
	analogMinutes.style.transform = `rotateZ(${ m * 6 }deg)`;

	setInterval ( () => {
		analogSeconds.style.transform = `rotateZ(${ getS() * 6 }deg)`;
	}, 1000);
}

function digitInit () {
	const wrap = document.querySelector ( '.digit' );
	const dH = wrap.querySelector ( '.digit__hours' );
	const dM = wrap.querySelector ( '.digit__minutes' );
	const dS = wrap.querySelector ( '.digit__seconds' );
	const full = wrap.querySelector ( '.digit__full-date' );

	console.log ( fullDate );
	full.innerHTML = fullDate;

	setTimeout( () => {
		dH.innerHTML = `${ h }`;
		dM.innerHTML = m < 10 ? `0${ m }` : `${ m }`;
	}, 1000);

	setInterval ( () => {
		const s = getS ();
		const m = getM ();
		const h = getH ();

		dS.innerHTML = s < 10 ? `0${ s }` : `${ s }`;

		if ( s === 0 ) {
			dM.innerHTML = m < 10 ? `0${ m }` : `${ m }`;

			if ( m === 0 ) {
				dH.innerHTML = h < 10 ? `0${ h }` : `${ h }`;
			}
		}
	}, 1000 );
}

// функция меняет свойство прозрачности для элементов с классом lazy
function lazyLoad ( ) {
	const items = document.querySelectorAll ( '.lazy' );

	items.forEach ( item => item.style.opacity = '1' );
}

// возвращает секунды
function getS () {
	return new Date ().getSeconds ();
}

// возвращает минуты
function getM () {
	return new Date ().getMinutes ();
}

// возвращает Часы
function getH () {
	return new Date ().getHours ();
}
