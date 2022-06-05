# Backend Las Vegas Roulette

[![Las_Vegas_Roulette.jpg](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/13-02-27-spielbank-wiesbaden-by-RalfR-093.jpg/330px-13-02-27-spielbank-wiesbaden-by-RalfR-093.jpg)

## Contenidos

- [Backend Las Vegas Roulette](#backend-las-vegas-roulette)
  - [Contenidos](#contenidos)
- [Stack Tecnológico 🛠](#stack-tecnológico-)
- [Descripción y usabilidad 📋](#descripción-y-usabilidad-)
  - [Entidades](#entidades)
- [Endpoints ⛩](#endpoints-)
- [Relaciones 🥨](#relaciones-)
- [Variables de entorno 🥑](#variables-de-entorno-)
- [Base de datos 🔗](#base-de-datos-)
- [Comandos útiles iniciales 👀](#comandos-útiles-iniciales-)
- [Instalación 🥷](#instalación-)
- [Tareas pendientes 🧙](#tareas-pendientes-)
- [Autor 🤟](#autor-)
- [Como ayudar 🤝](#como-ayudar-)
- [Agradecimientos 💖](#agradecimientos-)

# Stack Tecnológico 🛠

Se han utilizado las siguientes tecnologías:

<p align="left">     
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  <a href="https://mobile.twitter.com/mongoosejs" target="_blank"> 
  <img src="https://pbs.twimg.com/profile_images/946432748276740096/0TXzZU7W_400x400.jpg" alt="mongoosejs" width="40" height="40"/>
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
  <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> 
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
  <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a>
  
</a> 
</p>

# Descripción y usabilidad 📋

Proyecto final del bootcamp realizado en Geekshubs en el cuál tenemos total libertad a la hora realizar un proyecto full stack para implementar los conociemientos adquiridos en el curso. He elegido realizar una ruleta de casino en la que se puede practicar el uso de esta y poder aprender como se manejan ciertas apuestas, sus ganancias así como el manejo del "dinero" que se posee. Lo que hace diferente a esta aplicación es que no hace falta introducir datos reales, que se puede jugar sin invertir dinero real y que puede servir como una ruleta de verdad si se quiere jugar en casa sin necesidad de tener una ruleta ya que al fin y al cabo el saldo que se introduce no es real y podemos tener infinidad de tiradas. He implementado el patrón MVC para la organización de los modelos, las vistas y los controladores de las entidades.

## Entidades

Las entidades en este caso son 2. Una son los usuarios que se van a registrar en nuestra página web y que van a poder jugar en ella. La otra entidad son los juegos que se van a poder hacer, es decir cada una de las partidas que el usuario va a poder generar y realizar.
Dentro de la entidad usuario tendremos lo típico dentro de dicha entidad como el nombre, el email, la contraseña y el rol, además para hacer menos ficticia la aplicación hemos introducido la tarjeta y el saldo del usuario.
La entidad de las partidas tendrá como claves el id de usuario que es el que generará cada partida, la fecha en que se genera la partida, el dinero que se apuesta tanto al color como a la paridad, y que es lo que se apuesta en los mismos casos (rojo/negro, par/impar), y por último tendremos el resultado de la apuesta, que vendrá definido en un objeto con 3 variables (número, color, paridad (true = par, false = impar))

# Endpoints ⛩

Podemos encontrar los siguientes endpoints para interactuar con la aplicación:

- `/users` -> Este endpoint engloba el login `users/login` para iniciar sesión y obtener el token de entrada. El endpoint sin ningún tipo de añadido más nos permite realizar una búsqueda de todos los usuarios en la palicación, sin embargo esto solo lo podrá realizar el rol admin, además de poder generar un nuevo usuario con el modelo que se indica abajo. `/:id` para modificar los datos del usuario, obtener la información de un usuario en concreto por su id específico y por último poder borrar dicho usuario (sólo el rol admin puede hacer esto último). Los dos últimos endpoints que engloba este son `/card/:id` y `/balance/:id` con los que podremos añadir una tarjeta al usuario y añadirle saldo a dicho usuario para que pueda jugar.
  Todos los usuarios que se registren por primera vez obtendrán 5 saldos para poder jugar.
  Modelo Users:

```
{
  name: String,
  email: String,
  password: String,
  rol: String,
  card: Number,
  balance: Number,
}
```

- `/games` -> get(`/`) para comprobar todos los juegos que se han realizado. Post `/` para realizar una partida, es decir para jugar y poder crear partidas (games). Y por último `/:id` para conocer la información de una sola partida
  Modelo Games:

```
{
 idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  date: Date,
  betAmountColour: Number,
  betAmountParity: Number,
  betColour: String,
  betParity: Boolean,
  result: Object,
}
```

# Relaciones 🥨

La relación existente entre las dos entidades que existen es 1 a N, es decir 1 game pertenece a un user, pero 1 user puede estar en N games. Esto se refleja en la tabla del modelo de Games a través de la foreign key idUser.

# Variables de entorno 🥑

Las variables de entorno que se utilizan en el proyecto son las siguientes:

```
NODE_ENV=dev
DB_URI= mongodb://127.0.0.1:27017/Roulette
JWT_KEY= `la que cada uno quiera`
SERVER_PORT=3000
PORT=3000
```

# Base de datos 🔗

He utilizado MongoDB junto con robo3T como GUI y Mongoose como ODM para interactuar com MongoDB.

# Comandos útiles iniciales 👀

`npm run start` -> Para ejecutar el inicio del proyecto
`npm run start_dev` -> Iniciar el proyecto en modo desarrollo con nodemon

# Instalación 🥷

Para poder utilizar el backend es necesario lo siguiente:

- Clonar o forkear el repositorio, **David Sánchez Ariza:** _(https://github.com/dvdsanar/las-vegas-back)_.
- Tener instalado Node.js.
- Hacer _npm install_ para cargar las dependencias del package.json
- Atacar al API en modo localhost poniendo dicha referencia en el .env.
- Revisar esta documentación.
- Postman para atacar la API hasta que se levante el frontal.
- Conexión a internet.

# Tareas pendientes 🧙

- [ ] Despliegue en MongoAtlas.
- [ ] Realización del front de la página.
- [ ] Poder realizar más diferentes tipos de apuestas: docenas, columnas, falta/pasa, números....

# Autor 🤟

- El autor de este proyecto soy yo mismo _David Sánchez Ariza_ y aquí se pueden encontrar el resto de mis proyectos https://github.com/dvdsanar

# Como ayudar 🤝

- Si deseas colaborar con éste proyecto u otro no dudes en contactar conmigo o solicitar una pull request.
- Mi correo electrónico dvdsanar@yahoo.es
- Cualquier aporte se puede tratar y debatir en cualquier terraza, bar o restaurante que guste a invitarme ^^

# Agradecimientos 💖

- A los tutores Pablo y Ana por su paciencia y ayuda en cualquier momento del dia y cualquier día.
- A todos mis compañeros y profesores por hacer esto posible porque sin ellos este curso y todos sus proyectos no hubieran sido posibles.
