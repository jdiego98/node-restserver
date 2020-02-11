
const express = require('express');
const app = express()

const Categoria = require('../models/categoria');

const {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

app.post('/categorias', verificaToken,  (req, res) => {
    
    let body = req.body; 

    let categoria = new Categoria ({
        descripcion: body.descripcion,
        usuario: body.usuario,
        estado: body.estado
    });

    categoria.save( (err, categoriaDB) => {

        if(err){            
           
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB){

            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


app.get('/categorias', ( req, res) => {


    Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err, categorias) => {

     if(err){
         return res.status(500).json({
             ok: false,
             err
         });
     }

     res.json({
         ok: true,
         categorias
     });
     
    })


    // Categoria.find( (err, categoriasDB) => {

    //     if(err){

    //         return res.json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         categoriasDB
    //     });

    // });
    
});

app.get('/categorias/:id', ( req, res ) => {

    let id = req.params.id;

    Categoria.findById( id, (err, categoriaDB) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoriaDB
        });
    })
  

});


app.put('/categorias/:id', verificaToken, (req , res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    // {new: true, runValidator: true} son configuraciones, para que no choque con las validaciones 
    Categoria.findByIdAndUpdate( id, descCategoria, {new: true, runValidators: true}, (err, categoriaDB ) => {

        if(err){

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !categoriaDB ){

            return res.status(400).json({ 
                message: 'No existe esa categoria ',
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });

});


app.delete('/categorias/:id',[ verificaToken, verificaAdminRole], ( req, res) => {

    let id = req.params.id; 

   Categoria.findByIdAndDelete( id, (err, categoriaDB) => {

    if(err){

        return res.status(500).json({
            ok: false,
            err
        });
    } 

    if( !categoriaDB){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El id no existe'
            }
        });
    }

    res.json({
        ok: true,
        mesasage: 'Categoria Borrada'
    });



   });

});

module.exports = app; 