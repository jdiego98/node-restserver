require('./config/config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//Habilitar la carpeta public

app.use( express.static(path.resolve(__dirname, '../public')));




//Configuracion global de rutas
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(resp => {
    console.log('Base de datos ONLINE');
}).catch(err => {

    console.log(err);

});


app.listen(process.env.PORT, () => {

    console.log("Escucando puerto: ", process.env.PORT);
});





/*
===============================================================
app.use(require('./route/usuarios)); debe de ir despues del app.use(bodyParser.urlencoded({ extended: false }))
y el app.use(require('./routes/usuarios')); para que asi el app al usar las rutas de usuario pueda hacer uso
del body parser

===============================================================
*/

/*
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});
*/

// mongoose.connect('mongodb://localhost/cafe', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false,
// }, (err, res) => {
 
//     if(err) throw new Error('Conexion a base de datos fallida');
 
//     console.log('Conexión a base de datos exitosa');
// });

