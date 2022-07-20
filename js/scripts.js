/* Проверяет есть ли данный родитель у элемента */
function checkElementHasParent(element, parent) {
	while (element) {
	    if (element === parent)
	    	return true;
	    else
		    element = element.parentNode;
	}
	return false;
}


/* Обрабатывает mousedown (нажатие) по документу */
document.addEventListener('mousedown', (e) => {
	// Сворачивает меню при клике вне его
	let burgerBtn = document.getElementsByClassName('burger-btn')[0];
	let menuWrapper = document.getElementsByClassName('menu-wrapper')[0];
	if (e.target !== burgerBtn && !checkElementHasParent(e.target, menuWrapper))
		menuWrapper.classList.remove('menu-active');
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

	// Если поле поиска пустое - отключает кнопку поиска, иначе - включает
	let searchBtn = document.getElementsByClassName('search-btn')[0];
	searchBtn.disabled = (e.currentTarget.value.length === 0);
}
document.getElementsByClassName('search-field')[0].addEventListener('focus', (e) => {
	searchFocusInput(e);
});
document.getElementsByClassName('search-field')[0].addEventListener('input', (e) => {
	searchFocusInput(e);
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




function menuSelectWrapperClick(element) {
	element.getElementsByClassName('select-options-wrapper')[0].classList.toggle('select-options-hidden');
}

document.getElementsByClassName('select-lang-wrapper')[0].addEventListener('click', (e) => {
	menuSelectWrapperClick(e.currentTarget);
});

document.getElementsByClassName('select-currency-wrapper')[0].addEventListener('click', (e) => {
	menuSelectWrapperClick(e.currentTarget);
});
