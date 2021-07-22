(function (){
	const switchTheme = document.querySelector('.switch-theme');
	const body = document.querySelector('body');

	changeLocalStorageTheme();

	switchTheme.addEventListener('click', toggleTheme)

	function changeLocalStorageTheme () {
		// Initial theme setting
		if (!localStorage.getItem('theme')) {
			localStorage.setItem('theme', 'light')
		}

		// Check, if dark theme
		if (localStorage.getItem('theme') === 'dark') {
			toggleTheme();
		}
	}

	function toggleTheme () {
		switchTheme.classList.toggle('dark-theme');
		body.classList.toggle('dark-theme');

		if (body.classList.contains('dark-theme')) {
			localStorage.setItem('theme', 'dark')
		} else {
			localStorage.setItem('theme', 'light')
		}
	}

})();
