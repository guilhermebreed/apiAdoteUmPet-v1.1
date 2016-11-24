var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	app = express(),
	Pessoa = require('./models/Pessoa'),
	Animal = require('./models/Animal');

//Conexão com mongoDB
mongoose.connect('mongodb://localhost/api/v1.1/', function(err){
	if(err){
		console.log('Erro ao conectar no mongodb' + err);
	}
});

app.use(bodyParser());

var port = process.env.PORT || 3000;

//Rotas
var router = express.Router();

router.get('/', function(req,res){
	res.json({message: 'API AdoteUmPet'});
});

//Rota Pessoas
router.route('/Pessoa')
	.get(function(req,res){
		Pessoa.find(function(err, dados){
			if(err){
				res.send(err);
			}
			res.json(dados);
		})
	})

	.post(function(req,res){
		var pessoas = new Pessoa();
		pessoas.nomePessoa = req.body.nomePessoa;
		pessoas.usuario = req.body.usuario;
		pessoas.email = req.body.email;
		pessoas.senha = req.body.senha;
		pessoas.endereco = req.body.endereco;
		pessoas.contato = req.body.contato;
		pessoas.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'Pessoa cadastrada!'})
		});
	});

router.route('/Pessoa/:id')
	.get(function(req,res){
		Pessoa.findById(req.params.id, function(err, dados){
			if(err){
				res.send(err);
			}
				res.json(dados);
		});
	})

	.put(function(req,res){
		Pessoa.findById(req.params.id, function(err, dados){
			if(err){
				req.send(err)
			}
				dados.nomePessoa = req.body.nomePessoa;
				dados.usuario = req.body.usuario;
				dados.email = req.body.email;
				dados.senha = req.body.senha;
				dados.endereco = req.body.endereco;
				dados.contato = req.body.contato;
				dados.save(function(err){
					if(err){
						res.send(err)
					}
					res.json({message: 'Pessoa atualizada!'})
				});
		});
	})

	.delete(function(req,res){
		Pessoa.remove({_id: req.params.id}, function(err, dados){
			if(err){
				res.send(err);
			}
				res.json({message: 'Pessoa excluída!'})
		})
	});

//Rota animais
router.route('/Animal')
	.get(function(req,res){
		Animal.find(function(err, dados){
			if(err){
				res.send(err);
			}
			res.json(dados);
		})
	})

	.post(function(req,res){
		var animais = new Animal();
		animais.nomeAnimal = req.body.nomeAnimal;
		animais.raca = req.body.raca;
		animais.idade = req.body.idade;
		animais.descricao = req.body.descricao;
		animais.idPessoa = req.body.idPessoa;
		animais.contato = req.body.contato;
		animais.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'Animal cadastrado!'})
		});
	});

	router.route('/Animal/:id')
	.get(function(req,res){
		Animal.findById(req.params.id, function(err, dados){
			if(err){
				res.send(err);
			}
				res.json(dados);
		});
	})

	.put(function(req,res){
		Animal.findById(req.params.id, function(err, dados){
			if(err){
				req.send(err)
			}
				dados.nomeAnimal = req.body.nomeAnimal;
				dados.raca = req.body.raca;
				dados.idade = req.body.idade;
				dados.descricao = req.body.descricao;
				dados.idPessoa = req.body.idPessoa;
				dadps.contato = req.body.contato;
				dados.save(function(err){
					if(err){
						res.send(err)
					}
					res.json({message: 'Animal atualizado!'})
				});
		});
	})

	.delete(function(req,res){
		Animal.remove({_id: req.params.id}, function(err, dados){
			if(err){
				res.send(err);
			}
				res.json({message: 'Dados do animal excluídos!'})
		})
	});

app.use('/api/v1.1/', router);

app.listen(port, function(){
	console.log('Servidor rodando na porta: '+ port);
});
