// let dist1 = 50;
// let dist2 = 36;
// let dist3 = 25;
// let dist4 = 20;
// let dist5 = 15;
// let dist6 = 10;
// let dist7 = 5;
// let dist8 = 2;

// let transitionVal = .1;


/* Проверяет есть ли данный родитель у элемента */
function checkElementHasParent(element, parent) {
	while (element) {
		if (element === parent)
			return true;
		element = element.parentNode;
	}
	return false;
}


/* Обрабатывает клик по документу */
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

	let searchField = document.getElementsByClassName('search-field')[0];
	let searchBtn = document.getElementsByClassName('search-btn')[0];
	[].forEach.call(document.getElementsByClassName('search-autocomplete-item'), (item) => {
		// Добавляет автозаполнение в поле поиска по клику
		item.addEventListener('mousedown', (e) => {
			searchField.value = item.innerText;
			searchBtn.disabled = (searchField.value.length === 0);  // Если поле поиска пустое - отключает кнопку поиска, иначе - включает
			searchBtn.click();
		});
		// Имитирует :hover с помощью класса autocomplete-item-bgc-hover
		item.addEventListener('mouseenter', (e) => {
			unhoverAutocompleteItems(item);
			item.classList.add('autocomplete-item-bgc-hover');
		});
		item.addEventListener('mouseleave', (e) => {
			item.classList.remove('autocomplete-item-bgc-hover');
		});
	});

	searchBtn.disabled = (e.currentTarget.value.length === 0);  // Если поле поиска пустое - отключает кнопку поиска, иначе - включает
}

/* Снимает hover с не-hover элементов */
function unhoverAutocompleteItems(hoverItem) {
	[].forEach.call(document.getElementsByClassName('search-autocomplete-item'), (item) => {
		if (item !== hoverItem)
			item.classList.remove('autocomplete-item-bgc-hover');
	});
}

['focus', 'input'].forEach((item, index, array) => {
	document.getElementsByClassName('search-field')[0].addEventListener(item, (e) => {
		searchFocusInput(e);
	});
});

/* Отменяем дефолтный слушатель нажатий клавиш вверх/вниз при фокусе на поле поиска */
document.getElementsByClassName('search-field')[0].addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowUp':
		case 'ArrowDown':
			e.preventDefault();
			break;
	}
});

/* Задаем собственный слушатель нажатий клавиш при фокусе на поле поиска */
document.getElementsByClassName('search-field')[0].addEventListener('keyup', (e) => {
	let searchField = document.getElementsByClassName('search-field')[0];
	let searchBtn = document.getElementsByClassName('search-btn')[0];
	let autocompleteItems = document.getElementsByClassName('search-autocomplete-item');
	let autocompleteHoverItem = document.getElementsByClassName('autocomplete-item-bgc-hover')[0];
	switch (e.key) {
		case 'ArrowUp':
		case 'ArrowDown':
			if (autocompleteItems.length > 0) {
				// Изменяем hover
				switch (e.key) {
					case 'ArrowUp':
						if (autocompleteHoverItem === undefined || autocompleteHoverItem === autocompleteItems[0])
							autocompleteHoverItem = autocompleteItems[autocompleteItems.length-1]
						else
							autocompleteHoverItem = autocompleteHoverItem.previousSibling
						break;
					case 'ArrowDown':
						if (autocompleteHoverItem === undefined || autocompleteHoverItem === autocompleteItems[autocompleteItems.length-1])
							autocompleteHoverItem = autocompleteItems[0]
						else
							autocompleteHoverItem = autocompleteHoverItem.nextSibling
						break;
				}
				unhoverAutocompleteItems(autocompleteHoverItem);
				autocompleteHoverItem.classList.add('autocomplete-item-bgc-hover');

				searchField.value = autocompleteHoverItem.innerText;  // Заменяем поисковый запрос на выбранное автозаполнение
				searchBtn.disabled = (searchField.value.length === 0);  // Если поле поиска пустое - отключает кнопку поиска, иначе - включает

				searchField.selectionStart = searchField.selectionEnd = searchField.value.length;  // Переносим курсор в конец поискового запроса
			}
			break;
		case 'Enter':
			if (searchField.value.length > 0)
				searchBtn.click();
			break;
	}
});


/* Отображает выпадающие списки главного меню по клику */
['select-lang-wrapper', 'select-currency-wrapper'].forEach((item, index, array) => {
	document.getElementsByClassName(item)[0].addEventListener('click', (e) => {
		e.currentTarget.getElementsByClassName('select-options-wrapper')[0].classList.toggle('display-none');
	});
});
