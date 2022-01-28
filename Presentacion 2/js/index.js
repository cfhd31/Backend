class Persona {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){                       //muestra nombre completo
        console.log(`El nombre completo es: ${this.nombre} ${this.apellido}.`);
    }

    addMascota(mascotas){                //agrega mascota
        this.mascotas.push(mascotas);
        console.log(`Las mascotas son: ${this.mascotas}.`)
    }

    countMascotas(){                     //contador de mascota
        let contadorMascota = this.mascotas.length
        console.log(`Cantidad de mascotas: ${contadorMascota}.`)
    }

    addBook(nombreLibro, autorLibro){    //agrega un libro
        this.libros.push(
            {
                titulo: nombreLibro,
                autor: autorLibro,
            }
        );
    };

    getBookNames(){                    //muestra el titulo de cada libro
        let titulos = [];
        for (var i = 0, max = usuario.libros.length; i < max; i += 1) {         //se podria hacer con un map, pero no me salia :(
            titulos.push(this.libros[i].titulo);
        }
        console.log(titulos)
    }
}

let usuario = new Persona ( "Francisco", 
                            "Herrera", 
                            [{titulo: "Libro 1", autor: "Autora 1"}, {titulo: "Libro 2", autor: "Autora 2"}], 
                            [" Perro", " Tortuga", " Gato",]
);

console.log()  //se borra, es para verlo bien en la consola
usuario.getFullName();
usuario.addMascota(" Loro");
usuario.countMascotas();
usuario.addBook("libro 3", "Autora 3");
usuario.getBookNames();
console.log()  //se borra, es para verlo bien en la consola
console.log(usuario)