// import dependencies nanoid
const { nanoid } = require('nanoid');
// import file notes.js
const notes = require('./notes');
// fungsi handler menyimpan catatan
const addNoteHandler = (request, h) => {
  // fungsi ambil data
  const { title, tags, body } = request.payload;
  // menambahkan nilai untuk properti id
  const id = nanoid(16);
  // menambahkan nilai untuk properti createdAt dan updatedAt
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  // fungsi memasukan nilai ke dalam array notes
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  // push ke dalam array notes
  notes.push(newNote);
  // fungsi menentukan apakah data sudah masuk ke array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // logika dari fungsi menentukan respon apakah data sudah masuk ke array notes
  if (isSuccess) {
    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
            noteId: id,
        },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};
// fungsi handler menampilkan catatan
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});
// fungsi handler menampilkan catatan dengan spesifik
const getNoteByIdHandler = (request, h) => {
  // mendapatkan nilai id dari request.params
  const { id } = request.params;
  // mendapatkan objek note dari objek array notes
  const note = notes.filter((n) => n.id === id)[0];
  // logika dari fungsi respon mendapatkan objek note dari objek array notes
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};
// fungsi handler mengubah catatan
const editNoteByIdHandler = (request, h) => {
  // mendapatkan nilai id
  const { id } = request.params;
  // dapatkan data notes terbaru
  const { title, tags, body } = request.payload;
  // mendapatkan nilai terbaru dari properti updatedAt
  const updatedAt = new Date().toISOString();
  // mendapatkan index array pada objek catatan
  const index = notes.findIndex((note) => note.id === id);
  // logika mendapatkan respon index array pada objek catatan
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// fungsi handler menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
  // mendapatkan nilai id melalui path params
  const { id } = request.params;
  // mendapatkan index dari objek catatan
  const index = notes.findIndex((note) => note.id === id);
  // logika menghapus index dari objek catatan dan respons success
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // logika bila bernila -1 maka respons gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// exports fungsi dari file handler.js
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};