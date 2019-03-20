//Importaciones
const cursos = require('./datos');
const fs = require('fs');
const express = require('express');
const app = express();

//Opciones
const options = {
	id: {
		demand: true,
		alias: 'i'
	},
	name: {
		demand: true,
		alias: 'n'
	},
	cc: {
		demand: true,
		alias: 'c'
	}
};

//argv
const argv = require('yargs')
	.command('inscribir', 'Inscribir un curso', options)
	.argv

//Función para mostrar los cursos
function showCursos (cursos) {
	console.log('\n\t\t\t°°° OFERTA DE CURSOS °°°\n');
	//Con forEach
	cursos.forEach(function(element, index) {
		setTimeout(function() {
			console.log((index + 1) + '. ID: ' + element.id + ', Nombre: ' + element.nombre +
				', Duración: ' + element.duracion + ' horas, Valor: $' + element.valor)
		}, 2000 * (index + 1));
	});
	//Con for
	/*
	for(let i = 0; i < cursos.length; i++){
		setTimeout(function() {
			console.log(cursos[i]);
		}, 2000 * (i + 1));
	}
	*/
}

//Para crear un archivo
let createFile = (name, cc, curso) => {
	txt = 'El estudiante ' + name + ' con cédula ' + cc +
		' se ha matriculado en el curso de ' + curso.nombre + ' (ID: ' +
		curso.id + '), el cual tiene una duración de: ' + 
		curso.duracion + ' horas y tiene un valor de: $' + curso.valor;
	//Para crear el archivo
	/*
	fs.writeFile('matriculado.txt', txt, (err) => {
		if(err) throw (err);
		console.log('\nSe ha creado el archivo');
	*/
	//Para mostrar por el servidor
	app.get('/', function(req, res) {
		res.send(txt)
	});
	app.listen(3000);
};

//Función para verificar y matricular
function matricular (id, name, cc, cursos) {
	let cursoMat = cursos.find(curso => curso.id == argv.i);

	if(typeof(cursoMat) == "undefined") {
		console.log('\nEl ID ingresado no corresponda a un curso');
		console.log('Verifique el ID ingresado con la lista de cursos:');
		showCursos(cursos);
	} else {
		createFile(argv.name, argv.cc, cursoMat);
	}
}

//1. The process.argv property returns an array containing the command line 
//	arguments passed when the Node.js process was launched.
//2. Si es mayor que 2, entonces hay datos (argv tiene siempre dos parámetos).
if(process.argv.length > 2){
	//(typeof(argv.id) != "undefined") (Si no hay nada en el id)}
	matricular(argv.id, argv.name, argv.cc, cursos);
} else
	showCursos(cursos);