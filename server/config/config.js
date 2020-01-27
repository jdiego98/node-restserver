//==========================
//Puerto
//==========================

process.env.PORT = process.env.PORT || 3000;


//==========================
// Entorno
//==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========================
// Vencimiento del token
//==========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
 
process.env.CAUDICIDAD_TOKEN = 60 * 60 * 24 * 30;

//==========================
// SEED de autentificacion 
//==========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'; 


//==========================
// Base de datos
//==========================

let urlDB; 

if( process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost/cafe';
}else {
    urlDB = 'mongodb+srv://jdiego:E2KkgAMCrXFc87nZ@cluster0-yvtcg.mongodb.net/test?retryWrites=true&w=majority'; // deberia de ir el nombre de la base de datos enves de test!!
}

process.env.URLDB = urlDB;

