(function () {
	// Показ модального окна при нажатии на кнопку
	document.querySelector('#show-modal').addEventListener('click', () => {
		setBodyOverflow('hidden');
		createModal();
	})

	// Устанавливает overflow для body
	// hidden - чтобы не было прокрутки
	function setBodyOverflow (value) {
		const body = document.querySelector('body');

		if (value === 'hidden') {
			body.style.overflow = value;
		} else {
			body.style.removeProperty('overflow');
			body.removeAttribute('style');
		}
	}

	// Создание модального окна
	function createModal (data = {}) {
		// <div class="custom-modal">
		// 	<div class="custom-modal__inner">
		// 		<img class="custom-modal__close" src="" alt="">
		// 		<div class="custom-modal__content">
		// 			<h2 class="custom-modal__header"></h2>
		// 			<div class="custom-modal__body"></div>
		// 			<div class="custom-modal__footer"></div>
		// 		</div>
		// 	</div>
		// </div>
		const modal = document.createElement('div');
			modal.classList.add('custom-modal');
			const modalInner = document.createElement('div');
				modalInner.classList.add('custom-modal__inner');
				const modalClose = document.createElement('img');
					modalClose.classList.add('custom-modal__close');
					modalClose.setAttribute('src', 'dist/images/custom-modal/close.svg');
					modalClose.setAttribute('alt', 'close');
				modalInner.append(modalClose);
				const modalContent = document.createElement('div');
					modalContent.classList.add('custom-modal__content');
					const modalHeader = document.createElement('h2');
						modalHeader.classList.add('custom-modal__header');
						modalHeader.innerHTML = 'Это заголовок модального окна';
					modalContent.append(modalHeader);
					const modalBody = document.createElement('div');
						modalBody.classList.add('custom-modal__body');
						modalBody.innerHTML = 'Это тело модального окна';
					modalContent.append(modalBody);
					const modalfooter = document.createElement('div');
						modalfooter.classList.add('custom-modal__footer');
						modalfooter.innerHTML = 'Это подвал модального окна';
					modalContent.append(modalfooter);
				modalInner.append(modalContent);
			modal.append(modalInner);
		document.querySelector('body').append(modal);

		modalClose.addEventListener('click', closeModal)
		modal.addEventListener('click', closeModal);

		function closeModal (event) {
			if (event.target.classList.contains('custom-modal') || event.target.classList.contains('custom-modal__close')) {
				modal.classList.add('custom-modal--close');
				setBodyOverflow('default');
				setTimeout(() => {
					modal.remove();
				}, 300);
			}
		}
	}
})();

