// import fungsi dari file handler.js
const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
} = require('./handler');

const routes = [
{ // fungsi menyimpan catatan
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
},
{ // fungsi menampilkan catatan
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
},
{ // fungsi menampilkan catatan dengan spesifik
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
},
{ // fungsi mengubah catatan
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
},
{ // fungsi menghapus catatan
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
},
];
// exports file routes.js
module.exports = routes;