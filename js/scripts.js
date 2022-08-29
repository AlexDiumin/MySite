/* Проверяет есть ли данный родитель у элемента */
function checkElementHasParent(element, parent) {
	while (element) {
		if (element === parent)
			return true;
		element = element.parentNode;
	}
	return false;
}



/* Снимает hover с не-hover элементов */
function unhoverItems(hoverItem, items, hoverClassName) {
	[].forEach.call(items, (item) => {
		if (item !== hoverItem)
			item.classList.remove(hoverClassName);
	});
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
	['select-lang-wrapper', 'select-currency-wrapper'].forEach((item) => {
		let selectWrapper = document.getElementsByClassName(item)[0];
		if (!checkElementHasParent(e.target, selectWrapper)) {
			selectWrapper.getElementsByClassName('select-options-wrapper')[0].classList.add('display-none');
			selectWrapper.getElementsByClassName('menu-form-select')[0].blur();  // Снятие фокуса реального select
		}
	});
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
	searchTerms.forEach((item) => {
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
	let autocompleteItems = document.getElementsByClassName('search-autocomplete-item');
	[].forEach.call(autocompleteItems, (item) => {
		// Добавляет автозаполнение в поле поиска по клику
		item.addEventListener('mousedown', (e) => {
			searchField.value = item.innerText;
			searchBtn.disabled = (searchField.value.length === 0);  // Если поле поиска пустое - отключает кнопку поиска, иначе - включает
			searchBtn.click();
		});
		// Имитирует :hover с помощью класса search-autocomplete-item-hover
		item.addEventListener('mouseenter', (e) => {
			unhoverItems(item, autocompleteItems, 'search-autocomplete-item-hover');
			item.classList.add('search-autocomplete-item-hover');
		});
		item.addEventListener('mouseleave', (e) => {
			item.classList.remove('search-autocomplete-item-hover');
		});
	});
	searchBtn.disabled = (searchField.value.length === 0);  // Если поле поиска пустое - отключает кнопку поиска, иначе - включает
}

['focus', 'input'].forEach((item) => {
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
	let autocompleteHoverItem = document.getElementsByClassName('search-autocomplete-item-hover')[0];
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
							autocompleteHoverItem = autocompleteHoverItem.previousElementSibling
						break;
					case 'ArrowDown':
						if (autocompleteHoverItem === undefined || autocompleteHoverItem === autocompleteItems[autocompleteItems.length-1])
							autocompleteHoverItem = autocompleteItems[0]
						else
							autocompleteHoverItem = autocompleteHoverItem.nextElementSibling
						break;
				}
				unhoverItems(autocompleteHoverItem, autocompleteItems, 'search-autocomplete-item-hover');
				autocompleteHoverItem.classList.add('search-autocomplete-item-hover');

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



/* Обрабатывает клик по кнопке бургер-меню */
document.getElementsByClassName('burger-btn')[0].addEventListener('click', (e) => {
	document.getElementsByClassName('menu-wrapper')[0].classList.toggle('menu-active');
});

/* Отображает и скрывает выпадающие списки главного меню по клику */
['select-lang-wrapper', 'select-currency-wrapper'].forEach((item) => {
	let selectWrapper = document.getElementsByClassName(item)[0];
	selectWrapper.addEventListener('click', (e) => {
		selectWrapper.getElementsByClassName('select-options-wrapper')[0].classList.toggle('display-none');	
		let formSelect = selectWrapper.getElementsByClassName('menu-form-select')[0];
		if (document.activeElement === formSelect)
			formSelect.blur();
		else
			formSelect.focus();
	});
});

[].forEach.call(document.getElementsByClassName('custom-select-option'), (item, index, array) => {
	// Имитирует :hover с помощью класса custom-select-option-hover
	item.addEventListener('mouseenter', (e) => {
		unhoverItems(item, array, 'custom-select-option-hover');
		item.classList.add('custom-select-option-hover');
	});
	item.addEventListener('mouseleave', (e) => {
		item.classList.remove('custom-select-option-hover');
	});

	// Обрабатываем клик по опции select в меню
	item.addEventListener('click', (e) => {
		// Получаем контейнер/обертку
		let selectWrapper = document.getElementsByClassName('select-lang-wrapper')[0]
		if (!checkElementHasParent(item, selectWrapper))
			selectWrapper = document.getElementsByClassName('select-currency-wrapper')[0];

		let customSelectValue = selectWrapper.getElementsByClassName('custom-select-value')[0];
		let form = selectWrapper.getElementsByTagName('form')[0];
		let formSelect = form.getElementsByClassName('menu-form-select')[0];
		
		if (formSelect.value !== item.innerText) {  // Если новое значение не равно старому
			customSelectValue.innerText = formSelect.value = item.innerText;  // Изменяем значение кастомного и реального select
			form.submit();
		}
		else {
			// Скрываем выпадающий список в меню
			setTimeout(() => {
				selectWrapper.getElementsByClassName('select-options-wrapper')[0].classList.add('display-none');
				selectWrapper.getElementsByClassName('menu-form-select')[0].blur();  // Снятие фокуса реального select			
			}, 0);
		}
	});
});

[].forEach.call(document.getElementsByClassName('menu-form-select'), (item, index) => {
	let customSelectOptions = document.getElementsByClassName('custom-select-options')[index].getElementsByClassName('custom-select-option');
	
	// Убираем hover с опций при потере фокуса select
	item.addEventListener('blur', (e) => {
		unhoverItems(null, customSelectOptions, 'custom-select-option-hover');
	});
	
	// Отменяем дефолтный слушатель нажатий клавиш вверх/вниз при фокусе на select 
	item.addEventListener('keydown', (e) => {
		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowDown':
				e.preventDefault();
				break;
		}
	});

	// Задаем собственный слушатель нажатий клавиш при фокусе на select
	item.addEventListener('keyup', (e) => {
		let customSelectOptionHover = document.getElementsByClassName('custom-select-option-hover')[0];
		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowDown':
				let customSelectValue = document.getElementsByClassName('custom-select-value')[index];
				switch (e.key) {
					case 'ArrowUp':
						if (customSelectOptionHover === undefined || customSelectOptionHover === customSelectOptions[0])
							customSelectOptionHover = customSelectOptions[customSelectOptions.length-1];
						else
							customSelectOptionHover = customSelectOptionHover.previousElementSibling;
						break;
					case 'ArrowDown':
						if (customSelectOptionHover === undefined || customSelectOptionHover === customSelectOptions[customSelectOptions.length-1])
							customSelectOptionHover = customSelectOptions[0];
						else
							customSelectOptionHover = customSelectOptionHover.nextElementSibling;
						break;
				}
				unhoverItems(customSelectOptionHover, customSelectOptions, 'custom-select-option-hover');
				customSelectOptionHover.classList.add('custom-select-option-hover');
				
				customSelectValue.innerText = customSelectOptionHover.innerText;  // Изменяем значение кастомного select				

				break;
			case 'Enter':
				if (customSelectOptionHover !== undefined && customSelectOptionHover.innerText !== item.value) {
					item.value = customSelectOptionHover.innerText;  // Изменяем значение реального select
					item.parentNode.submit();
				}
				else {
					// Получаем контейнер/обертку
					let selectWrapper = document.getElementsByClassName('select-lang-wrapper')[0]
					if (!checkElementHasParent(item, selectWrapper))
						selectWrapper = document.getElementsByClassName('select-currency-wrapper')[0];
					
					// Скрываем выпадающий список в меню
					setTimeout(() => {
						selectWrapper.getElementsByClassName('select-options-wrapper')[0].classList.add('display-none');
						selectWrapper.getElementsByClassName('menu-form-select')[0].blur();  // Снятие фокуса реального select			
					}, 0);	
				}
				break;
		}
	});
});
