var express = require('express');
const uuidv4 = require('uuid/v4');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var logged = {};
let noticiaNextId = 1;
let lancamentoNextId = 1;
let categoriaNextId = 1;
var noticias = [];
var lancamentos = [];
var categorias = [];
var users = {
  ceo: {username: 'ceo',password: '123',admin: true},
  financeiro01: {username: 'financeiro01',password: '123',admin: false},
  financeiro02: {username: 'financeiro02',password: '123',admin: false},
  financeiro03: {username: 'financeiro03',password: '123',admin: false},
  financeiro04: {username: 'financeiro04',password: '123',admin: false},
  financeiro05: {username: 'financeiro05',password: '123',admin: false},
  financeiro06: {username: 'financeiro06',password: '123',admin: false},
  financeiro07: {username: 'financeiro07',password: '123',admin: false},
  financeiro08: {username: 'financeiro08',password: '123',admin: false},
  financeiro09: {username: 'financeiro09',password: '123',admin: false},
  financeiro10: {username: 'financeiro10',password: '123',admin: false},
  financeiro11: {username: 'financeiro11',password: '123',admin: false},
  financeiro12: {username: 'financeiro12',password: '123',admin: false},
  financeiro13: {username: 'financeiro13',password: '123',admin: false},
  financeiro14: {username: 'financeiro14',password: '123',admin: false},
  financeiro15: {username: 'financeiro15',password: '123',admin: false},
  financeiro16: {username: 'financeiro16',password: '123',admin: false},
  financeiro17: {username: 'financeiro17',password: '123',admin: false},
  financeiro18: {username: 'financeiro18',password: '123',admin: false},
  financeiro19: {username: 'financeiro19',password: '123',admin: false},
  financeiro20: {username: 'financeiro20',password: '123',admin: false},
  financeiro21: {username: 'financeiro21',password: '123',admin: false},
  financeiro22: {username: 'financeiro22',password: '123',admin: false},
  financeiro23: {username: 'financeiro23',password: '123',admin: false},
  financeiro24: {username: 'financeiro24',password: '123',admin: false},
  financeiro25: {username: 'financeiro25',password: '123',admin: false},
  financeiro26: {username: 'financeiro26',password: '123',admin: false},
  financeiro27: {username: 'financeiro27',password: '123',admin: false},
  financeiro28: {username: 'financeiro28',password: '123',admin: false},
  financeiro29: {username: 'financeiro29',password: '123',admin: false},
  financeiro30: {username: 'financeiro30',password: '123',admin: false},
  financeiro31: {username: 'financeiro31',password: '123',admin: false},
  financeiro32: {username: 'financeiro32',password: '123',admin: false},
  financeiro33: {username: 'financeiro33',password: '123',admin: false},
  financeiro34: {username: 'financeiro34',password: '123',admin: false},
  financeiro35: {username: 'financeiro35',password: '123',admin: false},
  financeiro36: {username: 'financeiro36',password: '123',admin: false},
  financeiro37: {username: 'financeiro37',password: '123',admin: false},
  financeiro38: {username: 'financeiro38',password: '123',admin: false},
  financeiro39: {username: 'financeiro39',password: '123',admin: false},
  financeiro40: {username: 'financeiro40',password: '123',admin: false},
};
//var categorias = {};
var tarefas = {};


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.post('/api/login', function(req, res) {
  if (req.body.login) {
      let user = users[req.body.login];
      console.log('user: ',user);
      console.log('body: ',req.body);
      if (user && user.password == req.body.senha) {
	const token = uuidv4();
	logged[token] = user;
	res.send(JSON.stringify({token: token}));
	console.log('created token: ',token);
	return;
      }
      
  }
  res.sendStatus(401)
  
});



app.get('/api/noticias', function(req, res) {
  console.log('req headers: ',req.headers);
  res.send(JSON.stringify(noticias));
});

app.post('/api/noticias', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let noticia = {id: noticiaNextId,
      autor: user.username,
      titulo: req.body.titulo,
      mensagem: req.body.mensagem,
      data: req.body.data,
      imagem: req.body.imagem,
    };
    noticias.push(noticia);
    noticiaNextId++;
    res.send(noticia);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/noticias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let noticia = noticias.find((n) => n.id == req.params.id);
	if(!noticia) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == noticia.autor) {
	    noticia.titulo = req.body.titulo;
            noticia.mensagem = req.body.mensagem;
            noticia.data = req.body.data;
            noticia.imagem = req.body.imagem;
            res.send(noticia);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/noticias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let noticia = noticias.find((n) => n.id == req.params.id);
	let index = noticias.findIndex((n) => n.id == req.params.id);
	if(!noticia) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == noticia.autor) {
	    noticias.splice(index, 1);
            res.send(noticia);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//lancamentos
app.get('/api/lancamentos', function(req, res) {
  console.log('req headers: ',req.headers);
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
      res.send(JSON.stringify(lancamentos));
      return;
  }
  res.sendStatus(401);
});

app.post('/api/lancamentos', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let lancamento = {id: lancamentoNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      valor: req.body.valor,
      receita: req.body.receita,
      categoria: req.body.categoria,
      data: req.body.data,
      repeticoes: req.body.repeticoes,
      repetitividade: req.body.repetitividade
    };
    lancamentos.push(lancamento);
    lancamentoNextId++;
    res.send(lancamento);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/lancamentos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let lancamento = lancamentos.find((n) => n.id == req.params.id);
	if(!lancamento) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == lancamento.autor) {
	    lancamento.nome = req.body.nome;
            lancamento.descricao = req.body.descricao;
            lancamento.valor = req.body.valor;
            lancamento.receita = req.body.receita;
	    lancamento.categoria = req.body.categoria;
            lancamento.data = req.body.data;
            lancamento.repeticoes = req.body.repeticoes;
            lancamento.repetitividade = req.body.repetitividade;
            res.send(lancamento);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/lancamentos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let lancamento = lancamentos.find((n) => n.id == req.params.id);
	let index = lancamentos.findIndex((n) => n.id == req.params.id);
	if(!lancamento) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == lancamento.autor) {
	    lancamentos.splice(index, 1);
            res.send(lancamento);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

// categorias
app.get('/api/categorias', function(req, res) {
  console.log('req headers: ',req.headers);
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
      res.send(JSON.stringify(categorias));
      return;
  }
  res.sendStatus(401);
});

app.post('/api/categorias', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let categoria = {id: categoriaNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao
    };
    categorias.push(categoria);
    categoriaNextId++;
    res.send(categoria);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/categorias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let categoria = categorias.find((n) => n.id == req.params.id);
	if(!categoria) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == categoria.autor) {
	    categoria.nome = req.body.nome;
            categoria.descricao = req.body.descricao;
            res.send(categoria);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/categorias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let categoria = categorias.find((n) => n.id == req.params.id);
	let index = categorias.findIndex((n) => n.id == req.params.id);
	if(!categoria) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == categoria.autor) {
	    categorias.splice(index, 1);
            res.send(categoria);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});


app.post('/api/logout', function(req, res) {
  if (req.body.login) {
      let keys = Object.keys(logged);
      keys.forEach((key) => {
	if(logged[key] && logged[key].username == req.body.login) {
	  logged[key] = null;
	}
      });
      res.send('OK');
      return;
  }
  res.sendStatus(401)
  
});

app.get('/api/allLoggedUsers', function(req, res) {
  res.send(JSON.stringify(logged));
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});
