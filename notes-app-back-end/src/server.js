// impor dependencies hapi
const Hapi = require('@hapi/hapi');
// impor file routes.js
const routes = require('./routes');
// menjalankan server di dalam fungsi async
const init = async () => {
  // membuat parameter ServerOptions
  const server = Hapi.Server({
    port: 5000,
    host: 'localhost',
    // aktifkan CORS
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  // memanggil isi file routes.js
  server.route(routes);
  // memanggil server menggunakan await
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();