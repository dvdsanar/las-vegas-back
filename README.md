# Backend Las Vegas Roulette

[![Las_Vegas_Roulette.jpg](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/13-02-27-spielbank-wiesbaden-by-RalfR-093.jpg/330px-13-02-27-spielbank-wiesbaden-by-RalfR-093.jpg)

## Contenidos

- [Backend Las Vegas Roulette](#backend-las-vegas-roulette)
  - [Contenidos](#contenidos)
- [Stack Tecnol贸gico 馃洜](#stack-tecnol贸gico-)
- [Descripci贸n y usabilidad 馃搵](#descripci贸n-y-usabilidad-)
  - [Entidades](#entidades)
- [Endpoints 鉀(#endpoints-)
- [Relaciones 馃エ](#relaciones-)
- [Variables de entorno 馃](#variables-de-entorno-)
- [Base de datos 馃敆](#base-de-datos-)
- [Comandos 煤tiles iniciales 馃憖](#comandos-煤tiles-iniciales-)
- [Instalaci贸n 馃シ](#instalaci贸n-)
- [Tareas pendientes 馃](#tareas-pendientes-)
- [Autor 馃](#autor-)
- [Como ayudar 馃](#como-ayudar-)
- [Agradecimientos 馃挅](#agradecimientos-)

# Stack Tecnol贸gico 馃洜

Se han utilizado las siguientes tecnolog铆as:

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

# Descripci贸n y usabilidad 馃搵

Proyecto final del bootcamp realizado en Geekshubs en el cu谩l tenemos total libertad a la hora realizar un proyecto full stack para implementar los conociemientos adquiridos en el curso. He elegido realizar una ruleta de casino en la que se puede practicar el uso de esta y poder aprender como se manejan ciertas apuestas, sus ganancias as铆 como el manejo del "dinero" que se posee. Lo que hace diferente a esta aplicaci贸n es que no hace falta introducir datos reales, que se puede jugar sin invertir dinero real y que puede servir como una ruleta de verdad si se quiere jugar en casa sin necesidad de tener una ruleta ya que al fin y al cabo el saldo que se introduce no es real y podemos tener infinidad de tiradas. He implementado el patr贸n MVC para la organizaci贸n de los modelos, las vistas y los controladores de las entidades.

## Entidades

Las entidades en este caso son 2. Una son los usuarios que se van a registrar en nuestra p谩gina web y que van a poder jugar en ella. La otra entidad son los juegos que se van a poder hacer, es decir cada una de las partidas que el usuario va a poder generar y realizar.
Dentro de la entidad usuario tendremos lo t铆pico dentro de dicha entidad como el nombre, el email, la contrase帽a y el rol, adem谩s para hacer menos ficticia la aplicaci贸n hemos introducido la tarjeta y el saldo del usuario.
La entidad de las partidas tendr谩 como claves el id de usuario que es el que generar谩 cada partida, la fecha en que se genera la partida, el dinero que se apuesta tanto al color como a la paridad, y que es lo que se apuesta en los mismos casos (rojo/negro, par/impar), y por 煤ltimo tendremos el resultado de la apuesta, que vendr谩 definido en un objeto con 3 variables (n煤mero, color, paridad (true = par, false = impar))

# Endpoints 鉀?

Podemos encontrar los siguientes endpoints para interactuar con la aplicaci贸n:

- `/users` -> Este endpoint engloba el login `users/login` para iniciar sesi贸n y obtener el token de entrada. El endpoint sin ning煤n tipo de a帽adido m谩s nos permite realizar una b煤squeda de todos los usuarios en la palicaci贸n, sin embargo esto solo lo podr谩 realizar el rol admin, adem谩s de poder generar un nuevo usuario con el modelo que se indica abajo. `/:id` para modificar los datos del usuario, obtener la informaci贸n de un usuario en concreto por su id espec铆fico y por 煤ltimo poder borrar dicho usuario (s贸lo el rol admin puede hacer esto 煤ltimo). Los dos 煤ltimos endpoints que engloba este son `/card/:id` y `/balance/:id` con los que podremos a帽adir una tarjeta al usuario y a帽adirle saldo a dicho usuario para que pueda jugar.
  Todos los usuarios que se registren por primera vez obtendr谩n 5 saldos para poder jugar.
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

- `/games` -> get(`/`) para comprobar todos los juegos que se han realizado. Post `/` para realizar una partida, es decir para jugar y poder crear partidas (games). Y por 煤ltimo `/:id` para conocer la informaci贸n de una sola partida
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

# Relaciones 馃エ

La relaci贸n existente entre las dos entidades que existen es 1 a N, es decir 1 game pertenece a un user, pero 1 user puede estar en N games. Esto se refleja en la tabla del modelo de Games a trav茅s de la foreign key idUser.

# Variables de entorno 馃

Las variables de entorno que se utilizan en el proyecto son las siguientes:

```
NODE_ENV=dev
DB_URI= mongodb://127.0.0.1:27017/Roulette
JWT_KEY= `la que cada uno quiera`
SERVER_PORT=3000
PORT=3000
```

# Base de datos 馃敆

He utilizado MongoDB junto con robo3T como GUI y Mongoose como ODM para interactuar com MongoDB.

# Comandos 煤tiles iniciales 馃憖

`npm run start` -> Para ejecutar el inicio del proyecto
`npm run start_dev` -> Iniciar el proyecto en modo desarrollo con nodemon

# Instalaci贸n 馃シ

Para poder utilizar el backend es necesario lo siguiente:

- Clonar o forkear el repositorio, **David S谩nchez Ariza:** _(https://github.com/dvdsanar/las-vegas-back)_.
- Tener instalado Node.js.
- Hacer _npm install_ para cargar las dependencias del package.json
- Atacar al API en modo localhost poniendo dicha referencia en el .env.
- Revisar esta documentaci贸n.
- Postman para atacar la API hasta que se levante el frontal.
- Conexi贸n a internet.

# Tareas pendientes 馃

- [ ] Despliegue en MongoAtlas.
- [ ] Realizaci贸n del front de la p谩gina.
- [ ] Poder realizar m谩s diferentes tipos de apuestas: docenas, columnas, falta/pasa, n煤meros....

# Autor 馃

- El autor de este proyecto soy yo mismo _David S谩nchez Ariza_ y aqu铆 se pueden encontrar el resto de mis proyectos https://github.com/dvdsanar

# Como ayudar 馃

- Si deseas colaborar con 茅ste proyecto u otro no dudes en contactar conmigo o solicitar una pull request.
- Mi correo electr贸nico dvdsanar@yahoo.es
- Cualquier aporte se puede tratar y debatir en cualquier terraza, bar o restaurante que guste a invitarme ^^

# Agradecimientos 馃挅

- A los tutores Pablo y Ana por su paciencia y ayuda en cualquier momento del dia y cualquier d铆a.
- A todos mis compa帽eros y profesores por hacer esto posible porque sin ellos este curso y todos sus proyectos no hubieran sido posibles.
