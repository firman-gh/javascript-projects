// // membuat properti method untuk routing request dengan menggunakan fungsi handler
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    {   // membuat path parameter
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            // fungsi path parameter
           const { name = "stranger" } = request.params;
           // fungsi query parameter
           const { lang } = request.query;
            // logika lang 
           if(lang === 'id') {
            return `Hai, ${name}!`;
           }

           return `Hello, ${name}!`;
        },
    },
    {   // response toolkit
        method: 'POST',
        path: '/user',
        handler: (request, h) => {
            return h.response('created').code(201);
        },
    },
    {   // membuat body/payload request
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;
            return `Welcome ${username}`;
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];

module.exports = routes;