// let dist1 = 50;
// let dist2 = 36;
// let dist3 = 25;
// let dist4 = 20;
// let dist5 = 15;
// let dist6 = 10;
// let dist7 = 5;
// let dist8 = 2;

let transitionVal = .1;


/* Проверяет есть ли данный родитель у элемента */
function checkElementHasParent(element, parent) {
	while (element) {
		if (element === parent)
			return true;
		element = element.parentNode;
	}
	return false;
}


/* Обрабатывает mousedown (нажатие) по документу */
document.addEventListener('click', (e) => {
	// Сворачивает меню при клике вне его
	let burgerBtn = document.getElementsByClassName('burger-btn')[0];
	let menuWrapper = document.getElementsByClassName('menu-wrapper')[0];
	if (!checkElementHasParent(e.target, burgerBtn) 
		&& !checkElementHasParent(e.target, menuWrapper))
		menuWrapper.classList.remove('menu-active');

	// Убирает выпадающие списки в главном меню при клике клике вне их
	['select-lang-wrapper', 'select-currency-wrapper'].forEach((item, index, array) => {
		let selectWrapper = document.getElementsByClassName(item)[0];
		if (!checkElementHasParent(e.target, selectWrapper))
			selectWrapper.getElementsByClassName('select-options-wrapper')[0].classList.add('display-none');
	});	
});


/* Обрабатывает клик по кнопке бургер-меню */
document.getElementsByClassName('burger-btn')[0].addEventListener('click', (e) => {
	document.getElementsByClassName('menu-wrapper')[0].classList.toggle('menu-active');
});


/* Обрабатывает ввод текста в поле поиска */
function searchFocusInput(e) {
	// Датасет запросов
	let searchTerms = [
		'Морской флот',
		'Морские котики',
		'Морской узел',
	];

	// Очищает блок автозаполнения
	let autocompleteWrapper = document.getElementsByClassName('search-autocomplete-wrapper')[0];
	autocompleteWrapper.replaceChildren();

	// Создает пустой список предлагаемых запросов
	let autocomplete = document.createElement('ul');
	autocomplete.className = 'search-autocomplete';

	// Добавляет подходящие запросы из датасета запросов
	let userTerm = e.currentTarget.value.toLowerCase();
	let searchTerm = '';
	searchTerms.forEach((item, i, arr) => {
		searchTerm = item.toLowerCase();
		if (searchTerm.startsWith(userTerm)) {
			autocomplete.insertAdjacentHTML('beforeend', 
				'<li class="search-autocomplete-item"><span>' + userTerm + '</span>' + searchTerm.slice(userTerm.length) + '</li>');
		}
	});

	// Отображает блок автозаполнения, если есть предлагаемые запросы
	if (autocomplete.children.length > 0)
		autocompleteWrapper.append(autocomplete);



	// let searchField = document.getElementsByClassName('search-field')[0];
	// document.getElementsByClassName('search-autocomplete-item').forEach((item, index, array) => {
	// 	item.addEventListener('click', (e) => {
	// 		searchField.value = '++++';
	// 	});
	// });



	// Если поле поиска пустое - отключает кнопку поиска, иначе - включает
	let searchBtn = document.getElementsByClassName('search-btn')[0];
	searchBtn.disabled = (e.currentTarget.value.length === 0);
}
['focus', 'input'].forEach((item, index, array) => {
	document.getElementsByClassName('search-field')[0].addEventListener(item, (e) => {
		searchFocusInput(e);
	});
});



// document.getElementsByClassName('search-field')[0].addEventListener('keydown', (e) => {
// 	switch (e.key) {
// 		case 'ArrowUp':
// 			console.log('+++');
// 			break;
// 		case 'ArrowDown':
// 			console.log('---');

// 			let items = document.getElementsByClassName('search-autocomplete-item');
// 			items[0].classList.add('search-autocomplete-item-hover');

// 			break;
// 	}
// });




/* Отображает выпадающие списки главного меню по клику */
['select-lang-wrapper', 'select-currency-wrapper'].forEach((item, index, array) => {
	document.getElementsByClassName(item)[0].addEventListener('click', (e) => {
		e.currentTarget.getElementsByClassName('select-options-wrapper')[0].classList.toggle('display-none');
	});
});
