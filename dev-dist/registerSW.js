if ('serviceWorker' in navigator)
	navigator.serviceWorker.register('/BBVA-Technical-Test/dev-sw.js?dev-sw', {
		scope: '/BBVA-Technical-Test/',
		type: 'module',
	});