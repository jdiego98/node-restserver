//==========================
//Puerto
//==========================

process.env.PORT = process.env.PORT || 3000;


//==========================
// Entorno
//==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==========================
// Base de datos
//==========================

let urlDB; 

// if( process.env.NODE_ENV === 'dev'){
//    urlDB = 'mongodb://localhost/cafe';
// }else {
    urlDB = 'mongodb+srv://jdiego:E2KkgAMCrXFc87nZ@cluster0-yvtcg.mongodb.net/test?retryWrites=true&w=majority';
// }

process.env.URLDB = urlDB;

