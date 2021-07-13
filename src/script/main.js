fetch('https://jsonplaceholder.typicode.com/posts')
	.then(response => response.json())
	.then(json => {
		json.forEach(item => {
			let section = document.createElement('section');
			section.classList.add('random-text');
			section.innerHTML = `<code>${JSON.stringify(item, null, ' ')}</code>`;
			document.querySelector('body .container').append(section);
		});
	});
