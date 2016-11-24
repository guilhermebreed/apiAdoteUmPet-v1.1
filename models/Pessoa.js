var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PessoaSchema = new Schema({
	nomePessoa: {type: String, required: true, trim: true},
	usuario: {type: String, unique: true, required: true, trim: true},
	email: {type: String, unique: true, required: true, trim: true},
	senha: {type: String, required: true, trim: true},
	endereco: {type: String, required: true, trim: true},
	contato: {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Pessoa', PessoaSchema);
