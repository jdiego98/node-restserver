const express = require('express');
const _ = require('underscore');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();

const Producto = require('../models/producto');



app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;

    let nuevoProducto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    });

    nuevoProducto.save( (err, productoDB) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            productoDB
        });

    });



});

app.get('/productos', verificaToken, ( req, res )=> {


    let desde = req.query.desde || 0;
    desde =Number(desde);



    Producto.find({disponible: true})         
         .skip(desde)
         .limit(5)
         .populate('usuario', ' nombre email')
         .populate( 'categoria', 'descripcion')
         .exec( (err, productosDB) => {

            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productosDB
            });

         });
})


app.get('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec(  (err, productoDB) => {

            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if(!productoDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message:'No existe ese producto'
                    }
                });
            }
    
            res.json({
                ok: true,
                producto: productoDB
            });
        }

        ); 
              

});

app.get('/productos/buscar/:termino',verificaToken, (req, res) => {


    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');


    Producto.find({nombre: regex})
        .populate('categoria', 'descripcion')
        .exec( (err, productosDB) => {

            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: productosDB
            })
        });

});


app.put('/productos/:id',[verificaToken, verificaAdminRole], ( req, res) => {

    let id = req.params.id; 

    let body = _.pick(req.body, ['nombre','precioUni', 'descripcion']);

  
    

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true}, (err, productoDB) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el producto'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })
        
    });

});


app.delete('/productos/:id',[verificaToken, verificaAdminRole], ( req, res) => { 

    let id = req.params.id;


    Producto.findByIdAndUpdate( id, {disponible: false}, {new: true, runValidators:true}, (err, productoBorrado) => {

        if(err){

            return res.status(400).json({
                ok: false,
                err
            });
        }

        if( !productoBorrado ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe ese producto'
                }
            });
        }

     

        res.json({
            ok: true,
            usuario: productoBorrado
        });
    });


});

module.exports = app; 



