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


/* Обрабатывает mousedown (нажатие, клик) по документу */
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
document.getElementsByClassName('search-field')[0].addEventListener('input', (e) => {

	// Датасет запросов
	let searchTerms = [
		'Морской флот',
		'Морские котики',
		'Морской узел',
	];
	
	// Удаляет преддущие предлагаемые запросы
	let autocomplete = document.getElementsByClassName('search-autocomplete')[0];
	autocomplete.replaceChildren();

	// Добавляем подходящие запросы из датасета запросов
	let userTerm = e.target.value.toLowerCase();
	let searchTerm = '';
	searchTerms.forEach((item, i, arr) => {
		searchTerm = item.toLowerCase();
		if (searchTerm.startsWith(userTerm)) {
			autocomplete.insertAdjacentHTML('beforeend', 
				'<li class="search-autocomplete-item"><span>' + userTerm + '</span>' + searchTerm.slice(userTerm.length) + '</li>');
		}
	});

	// Прячет блок подсказок если нет предлагаемых запросов, иначе - не прячет
	let autocompleteWrapper = document.getElementsByClassName('search-autocomplete-wrapper')[0];
	if (autocomplete.children.length == 0)
		autocompleteWrapper.classList.add('search-autocomplete-hidden');
	else
		autocompleteWrapper.classList.remove('search-autocomplete-hidden');
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

