(function (){
	const progressBar = document.querySelector('.progress-bar .progress-bar__current');

	fillProgressLine();

	window.addEventListener('scroll', fillProgressLine);
	window.addEventListener('resize', fillProgressLine);

	function fillProgressLine () {
		const fullHeight = document.body.scrollHeight;
		const innerHeight = window.innerHeight;
		const pageYOffset = window.pageYOffset;
		progressBar.style.width = (pageYOffset * 100) / (fullHeight - innerHeight) + '%';
	}
})();
