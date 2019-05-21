const mongoose = require('../database');

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  celular: {
    type: String
  },
  documento: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  telefone: {
    type: String
  },
  tipo: {
    type: String
  },
  criado: {
    type: Date,
    default: Date.now
  }
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;