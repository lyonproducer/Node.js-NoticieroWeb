'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Noticia = require('./models/noticia')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/noticia', (req,res)=>{
	
	Noticia.find({}, (err,noticias) =>{

	if(err) return res.status(500).send({message: `Error, al realizar la peticion ${err}`})

    if(!noticias) return res.status(404).send({message: `la noticia no existe`})

    res.send(200, {noticias })

	})
})


app.get('/api/noticia/:noticiaId', (req,res)=>{

	let noticiaId = req.params.noticiaId

	Noticia.findById(noticiaId, (err,noticia) =>{

	if(err) return res.status(500).send({message: `Error, al realizar la peticion ${err}`})

    if(!noticia) return res.status(404).send({message: `la noticia no existe`})

    res.status(200).send({noticia})

	})

})


app.post('/api/noticia', (req,res)=>{

	console.log('POST /api/noticia')
	console.log(req.body)


	let noticia = new Noticia()
	noticia.Titulo = req.body.Titulo
	noticia.Tipo = req.body.Tipo
	noticia.Imagen = req.body.Imagen
	noticia.Sintesis = req.body.Sintesis
	noticia.Cuerpo = req.body.Cuerpo
	noticia.ReporteroCI = req.body.ReporteroCI


	noticia.save((err,noticiaStored)=>{


		if(err) res.status(500).send({message: `Errror al guardar en la bdd: ${err}`})

		res.status(200).send({noticia: noticiaStored})

	})
})

app.put('/api/noticia/:noticiaId', (req,res)=>{

		let noticiaId = req.params.noticiaId
		let update = req.body

		Noticia.findByIdAndUpdate(noticiaId, update,(err, noticiaUpdated) =>{

			if(err) return res.status(500).send({message: `Error, al actualizar peticion ${err}`})

				res.status(200).send({noticia: noticiaUpdated})

		})
})

app.delete('/api/noticia/:noticiaId', (req,res)=>{

	let noticiaId = req.params.noticiaId

	Noticia.findById(noticiaId, (err, noticia) =>{

	if(err) return res.status(500).send({message: `Error, al realizar la peticion ${err}`})

    noticia.remove(err =>{

    	if(err) return res.status(500).send({message: `Error, al realizar la peticion ${err}`})
		res.status(200).send({message: 'la noticia fue eliminada'})

    })

	})

})


app.use(express.static("web"))
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){

  //res.sendFile(__dirname + '/primera/index.html');
  res.sendFile(__dirname + '/index.html');
  //res.sendFile(__dirname + '/orlando/index.html');
  
});

app.get('/orlando/',function(req,res){

  //res.sendFile(__dirname + '/primera/index.html');
  res.sendFile(__dirname + '/orlando/index.html');
  
});




mongoose.connect('mongodb://localhost:27017/notiUneg', (err,res) =>{

	if(err) throw err
	console.log('conectado a la bdd sin peos')


	app.listen(port, ()=>{

	console.log(`API REST Uneg corriendo en http://localhost:${port}`)

})



})



