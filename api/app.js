const morgan = require('morgan')
let express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }))

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mongodb";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  return db;
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mongo");
  dbo.createCollection("personajes", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mongo");
  dbo.collection("personajes").findOne({}, function (err, result) {
    if (err) throw err;
    console.log(result?.casa);
    db.close();
  });
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ extended: true }));
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(morgan('dev'))


app.listen(6060, function () {
  console.log('Aplicación escuchando el puerto 6060!');
});

async function getCount(dbo) {
  const cant = await dbo.collection("personajes").estimatedDocumentCount({});
  return cant;
}

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mongo");

  getCount(dbo).then(cant => {
    if (cant > 0) {
      const mensaje = "Base ya creada con " + cant + " objetos"
      console.log(mensaje);
      return mensaje;
    }
    let myobj =[
      {
        nombreSH: 'Batman',
        nombreReal: 'Bruce Wayne',
        casa: 'DC',
        año: '1966',
        equipamiento: 'Soy Batman.',
        biografia: 'Nananananananananananananananananana Batman!.',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/15427/15427953.png'
      },
      {
        nombreSH: 'Black Panther',
        nombreReal: 'T\'Challa',
        casa: 'Marvel',
        año: '1966',
        equipamiento: 'Traje de Vibranium, habilidades sobrehumanas',
        biografia: 'T\'Challa es el rey de Wakanda, una nación africana ficticia con tecnología avanzada y el único lugar en el mundo donde se encuentra el metal raro Vibranium. Tras la muerte de su padre, T\'Challa asume el manto de Black Panther para proteger a su nación y al mundo.',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892395.png'
      },
      {
        nombreSH: 'Wolverine',
        nombreReal: 'Logan',
        casa: 'Marvel',
        año: '1974',
        equipamiento: 'Garras de Adamantium, regeneración.',
        biografia: 'Wolverine, cuyo nombre de nacimiento es James Howlett, ​ es un superhéroe y antihéroe ficticio que aparece en los cómics publicados por Marvel Comics, principalmente en asociación con los X-Men.',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892401.png'
      },
      {
        nombreSH: 'Deadpool',
        nombreReal: 'Wade Wilson',
        casa: 'Marvel',
        año: '1991',
        equipamiento: 'Fuerza sobrehumana, velocidad, durabilidad, resistencia, agilidad y reflejos, factor regenerativo',
        biografia: 'Wade Winston Wilson, más conocido como Deadpool, ​ es un personaje ficticio, mercenario, supervillano​​ y antihéroe, ​ que aparece en los cómics publicados por Marvel Comics. Creado por el artista Rob Liefeld y el escritor Fabian Nicieza, Deadpool apareció por primera vez en New Mutants #98.',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892389.png'
      },
      {
        nombreSH: 'Capitan America',
        nombreReal: 'Steve Rogers',
        casa: 'Marvel',
        año: '1941',
        equipamiento: 'Fuerza Sobrehumana, entrenamiento militar, escudo de vibranium.',
        biografia: 'El Capitán América, cuyo nombre real es Steven "Steve" Grant Rogers, es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics.',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892380.png'
      },
      {
        nombreSH: 'Ojo de Halcon',
        nombreReal: 'Clint Barton',
        casa: 'Marvel',
        año: '1964',
        equipamiento: 'Maestro en Arquería, habilidades de combate.',
        biografia: 'Hawkeye fue presentado como un villano reacio en Tales of Suspense # 57 (septiembre de 1964). Después de dos apariciones más como villano en Tales of Suspense #60 y #64 (diciembre de 1964 y abril de 1965), Hawkeye se unió a las filas de los Vengadores en The Avengers #16 (mayo de 1965). Hawkeye se convirtió en un miembro perenne del equipo y ha hecho numerosas apariciones en los cinco volúmenes ((vol. 1) (1963–1996), (vol. 2) (1997), (vol. 3) (1999–2004), (vol. 4) (2010-2013) y (vol. 5) (2013-presente).',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892386.png'
      },
      {
        nombreSH: 'Vision',
        nombreReal: 'Vision',
        casa: 'Marvel',
        año: '1968',
        equipamiento: 'Poderes marcianos, cambio de forma, invisibilidad',
        biografia: 'Visión es un personaje del universo Marvel, conocido por ser un androide (también referido como un "sintezoide") con inteligencia artificial. Fue creado por el escritor Roy Thomas y el artista John Buscema.',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892404.png'
      },
      {
        nombreSH: 'Daredevil',
        nombreReal: 'Matt Murdock',
        casa: 'Marvel',
        año: '1964',
        equipamiento: 'Sentidos Agudizados, artes marciales.',
        biografia: 'Matt Murdock es un abogado de Nueva York que perdió la vista en un accidente de tráfico cuando era niño. El accidente fue causado por el derrame de un material químico radiactivo, el cual también le otorgó otros sentidos sobrehumanos. A pesar de su ceguera, sus sentidos se agudizaron al punto de tener una "ecolocalización" similar a un radar, lo que le permite percibir su entorno con gran detalle..',
        imgURL: 'https://cdn-icons-png.flaticon.com/512/11892/11892461.png'
      }
    ];
    dbo.collection("personajes").insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log("Documento inseartados " + res.insertedCount);
      db.close();
    });
  }
  )
});



/*Peticiones*/

app.post('/cargar', (req, res) => {
  try {
    const { nombresh, nombrereal, casa, año, equipamiento, biografia, imgURL } = req.body
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      const dbo = db.db("mongo");
      const personaje = {
        nombreSH: nombresh,
        nombreReal: nombrereal,
        casa: casa,
        año: año,
        equipamiento: equipamiento,
        biografia: biografia,
        imgURL: imgURL
      };
      dbo.collection("personajes").insertOne(personaje, function (err, result) {
        if (err) throw err;
        console.log("Personaje cargado")
        db.close();
      });
    });
    res.send('Personaje cargado')
  }
  catch (err) {
    console.log(err)
  }
}
)

app.get('/allpersonajes', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mongo");
    dbo.collection("personajes").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
})

app.get('/personaje/:id', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    const { id } = req.params;
    if (err) throw err;
    const dbo = db.db("mongo");
    console.log('hola')
    const query = { nombreSH: id };
    dbo.collection("personajes").find(query).toArray(function (err, result) {
      if (err) throw err;
      res.send(result[0]);
      db.close();
    });
  });
})

app.delete('/eliminar/:nombre', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    const { nombre } = req.params
    if (err) throw err;
    var dbo = db.db("mongo");
    var myquery = { nombreSH: nombre };
    dbo.collection("personajes").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      res.send("1 document deleted");
      db.close();
    });
  });
})

app.put('/actualizar/:nombre', (req, res) => {
  try {
    MongoClient.connect(url, function (err, db) {
      const { nombre } = req.params
      const { nombreSH, nombreReal, casa, equipamiento, biografia, año, imgURL } = req.body
      if (err) throw err;
      var dbo = db.db("mongo");
      var myquery = { nombreSH: nombre };
      const newvalues = {
        $set: {
          nombreSH: nombreSH,
          nombreReal: nombreReal,
          casa: casa,
          año: año,
          equipamiento: equipamiento,
          biografia: biografia,
          imgURL: imgURL
        }
      };
      dbo.collection("personajes").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
    res.send('Personaje actualizado')
  } catch (err) {
    console.log(err)
  }
})

app.get('/personajesporcasa/:casa', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    const { casa } = req.params;
    if (err) throw err;
    const dbo = db.db("mongo");
    const query = { casa: casa };
    dbo.collection("personajes").find(query).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
})

