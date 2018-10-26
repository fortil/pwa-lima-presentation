importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
	console.log(`Workbox está cargado!! 🎉`);
	workbox.skipWaiting();
	workbox.clientsClaim();

	workbox.precaching.precacheAndRoute([]);
	self.addEventListener('message', (event) => {
    const fibo = fibonacci(event.data.num);
    console.log('SW Received Message: ', event.data, ' | num to fibo: ', event.data.num, ' | response', fibo);
		clients.matchAll().then((clients) => {
      clients[0].postMessage(fibo);
		});
	});
	// workbox.routing.registerRoute(
	//   /(.*)articles(.*)\.(?:png|gif|jpg)/,
	//   workbox.strategies.cacheFirst({
	//     cacheName: 'images-cache',
	//     plugins: [
	//       new workbox.expiration.Plugin({
	//         maxEntries: 50,
	//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
	//       })
	//     ]
	//   })
	// );

	// const articleHandler = workbox.strategies.networkFirst({
	//   cacheName: 'articles-cache',
	//   plugins: [
	//     new workbox.expiration.Plugin({
	//       maxEntries: 50,
	//     })
	//   ]
	// });

	// workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
	//   return articleHandler.handle(args).then(response => {
	//     if (!response) {
	//       return caches.match('pages/offline.html');
	//     } else if (response.status === 404) {
	//       return caches.match('pages/404.html');
	//     }
	//     return response;
	//   });
	// });

	// const postHandler = workbox.strategies.cacheFirst({
	//   cacheName: 'posts-cache',
	//   plugins: [
	//     new workbox.expiration.Plugin({
	//       maxEntries: 50,
	//     })
	//   ]
	// });

	// workbox.routing.registerRoute(/(.*)pages\/post(.*)\.html/, args => {
	//   return postHandler.handle(args).then(response => {
	//     if (response.status === 404) {
	//       return caches.match('pages/404.html');
	//     }
	//     return response;
	//   })
	//     .catch(function () {
	//       return caches.match('pages/offline.html');
	//     });
	// });
} else {
	console.log(`Boo! Workbox no se pudo cargar 😬`);
}

function fibonacci(num = 1e3) {
	if (num <= 1) return 1;
	return fibonacci(num - 1) + fibonacci(num - 2);
}
