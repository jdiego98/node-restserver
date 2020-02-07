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
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


//==========================
// Google Client ID
//==========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '793542702506-sn9vit6l8gh62idv6d9qdh0a5mf83l5a.apps.googleusercontent.com';

