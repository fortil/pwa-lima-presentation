window.onload = async () => {
	const regionSelect = document.getElementById('regions-select');
	const regiones = [
		{ value: 'europe', label: 'Europa' },
		{ value: 'africa', label: 'Africa' },
		{ value: 'americas', label: 'America' },
		{ value: 'asia', label: 'Asia' },
		{ value: 'oceania', label: 'Oceanía' }
	];
	for (let i = 0; i < regiones.length; i++) {
		const region = regiones[i];
		const option = document.createElement('option');
		option.value = region.value;
		option.text = region.label;
		regionSelect.appendChild(option);
	}

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js');
	}
};

function getCountry(by, obj) {
	const countrieShow = document.getElementById('countries-show');
	countrieShow.innerHTML = '';
	fetch(`https://restcountries.eu/rest/v2/${by}/${obj.value}`)
		.then((res) => res.json())
		.then(fillCountries(countrieShow));
}

function fillCountries(countrieShow) {
	return (data) => {
		const str = (
			country
		) => `<div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone"><div class="section__circle-container__circle section__circle--big" style="background-image: url(https://www.countryflags.io/${country.alpha2Code.toLowerCase()}/flat/64.png)"></div>
    <b>${country.name}</b><p>${country.capital}</p>
    </div>`;
		let countries = '';
		for (let i = 0; i < data.length; i++) {
			countries += str(data[i]);
		}
		countrieShow.innerHTML = countries;
	};
}

function fibonacci(num = 1e3) {
	if (num <= 1) return 1;
	return fibonacci(num - 1) + fibonacci(num - 2);
}

function send_message_to_sw() {
	navigator.serviceWorker.controller.postMessage({ num: 1e2 });
	navigator.serviceWorker.addEventListener('message', (event) => {
		console.log('Client 1 Received Message: ' + event.data);
	});
}
