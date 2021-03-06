const fs = require('fs');
const colors = require('colors');


let listadoPorHacer = [];

const guardarDB = () => {
    //Transforma la data en formato JSON
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const getListado = (completado) => {

    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.completado === completado
    });

    return nuevoListado;

}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    //Carga cada uno de los elementos del arreglo, después la función 
    //'findIndex' permite determinar mediante un callback si la tarea coincide
    //con la que se esta intentando editar, si no coincide index sera igual a -1
    //Cualquier número por encima quiere decir que lo encontro y la posicion en la que lo encontro.

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }


}

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: "false"
    };
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const borrar = (descripcion) => {
    cargarDB();

    //La forma en la que se hizo en el curso, el 'filter' funciona para 
    //sacar todos los registros que no tienen la misma descripción.
    //Por último llena un nuevo arreglo y lo compara con el inicial, si son iguales
    //quiere decir que no encontró la descripción enviada, si son distintos
    //remplaza el arreglo inicial con los valores del nuevo, eliminando así el registro.

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    //Otra manera de hacerlo.

    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}