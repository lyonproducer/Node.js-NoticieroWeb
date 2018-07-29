'use strict'

//modelos

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NoticiaSchema = Schema({

	Titulo: String,
	Tipo: String,
	Imagen: String,
	Sintesis: String,
	Cuerpo: String,
	ReporteroCI: String 

})

module.exports = mongoose.model('Noticia', NoticiaSchema)