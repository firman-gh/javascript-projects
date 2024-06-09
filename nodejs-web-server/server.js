// membuat HTTP server
const http = require('http');
// membuat fungsi Request listener dengan parameter request dan response
const requestListener = (request, response) => {
    // membuat response header
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Powered-By', 'Node.js');
    // membuat properti method untuk routing request 
    const {method, url} = request;
    // logika routing request dan response pada client
    if(url === '/') {
        if(method === 'GET') {
            // membuat respon status menggunakan response.statusCode
            response.statusCode = 200;
            // membuat respon body menggunakan response.end
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        } else {
            // membuat respon status menggunakan response.statusCode
            response.statusCode = 400;
            // membuat respon body menggunakan response.end
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } else if(url === '/about') {
        if(method === 'GET') {
            // membuat respon status menggunakan response.statusCode
            response.statusCode = 200;
            // membuat respon body menggunakan response.end
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
          // membuat body request yang hanya dapat dijalankan menggunakan request curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Firman\"}"
        } else if(method === 'POST') {
                let body = [];
        
                request.on('data', (chunk) => {
                    body.push(chunk);
                });
        
                request.on('end', () => {
                    body = Buffer.concat(body).toString();
                    const { name } = JSON.parse(body);
                    // membuat respon status menggunakan response.statusCode
                    response.statusCode = 200;
                    // membuat respon body menggunakan response.end
                    response.end(JSON.stringify({
                        message: `Halo, ${name}! Ini adalah halaman about`,
                    }));
                });
        } else {
            // membuat respon status menggunakan response.statusCode
            response.statusCode = 400;
            // membuat respon body menggunakan response.end
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    } else {
        // membuat respon status menggunakan response.statusCode
        response.statusCode = 404;
        // membuat respon body menggunakan response.end
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan',
        }))
    }
};
// membuat Request listener
const server = http.createServer(requestListener);
// membuat method listen yang diberi nilai port, host, dan listening listener
const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Sever berjalan pada http://${host}:${port}`);
});