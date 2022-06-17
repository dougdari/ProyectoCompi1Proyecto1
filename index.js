const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();
const $ = require("jquery");
const fs = require('fs');
const parser = require('./gramatica'); 

var bodyParser = require('body-parser');
const { WSAEINPROGRESS } = require('constants');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const sentenciasAPI = require('./sentencias').sentenciasAPI;
const tablaVariablesAPI = require('./sentencias').tablaVariables;

const inicioReporte = `<!DOCTYPE html>
                            <html lang="es">
                            <head>
                                <meta charset="utf-8">
                                <title>
                                    Reporte
                                </title>
                            </head>
                            <body style="background-color: black; color: white;">
                                <div>
                                    <h1 style="text-align: center">Reporte de analisis lexico y sintactico</h1>
                                    <table style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; margin-left: auto; margin-right: auto;">
                                        <tr style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse;">
                                            <th style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">Descripcion</th>
                                            <th style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">Linea</th>
                                            <th style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">Fila</th>
                                        </tr>`;

const finReporte = `</table>
                            </div>
                        </body>
                    </html>`;

app.use(express.static('assets'));

app.post('/ast', (req,res) =>
{
    var entrada = req.body.entrada;
    var ast;
    var tablaVariables;
    var reporteLexicos = "";
    var reporteSintacticos = "";
    var contenidoReporte = "";
    var reporteDeErrores = "";

    try {

        ast = parser.parse(entrada.toString());

        console.log('paso');
        console.log(ast);

       /*if(ast['ast'] != "}"){
            if(ast['ast'] != null){
                
                //traduccion = traductorAPI.traducir(ast["ast"]);
            }            
        } else {
            ast['ast'] = null;            
        }*/


        if(ast['tablaVariables'] != null){

            tablaVariables = tablaVariablesAPI.generarTabla(ast['tablaVariables']); 
        }
          

        reporteLexicos = ast['erroresLexicos'];
        reporteSintacticos = ast['erroresSintacticos'];

        fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2));

        if(reporteLexicos != undefined){

            if(reporteLexicos.length >0){
                for(var x = 0; x < reporteLexicos.length ; x++){
                    contenidoReporte = contenidoReporte + `<tr style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse;">
                            <td style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">${reporteLexicos[x]['lexico']}</th>
                            <td style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">${reporteLexicos[x]['linea']}</th>
                            <td style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">${reporteLexicos[x]['columna']}</th>
                        </tr>`;

                        
                }
            }

        }

        if(reporteSintacticos != undefined){
            
 

            if(reporteSintacticos.length > 0){


                for(var x = 0; x < reporteSintacticos.length ; x++){
                    contenidoReporte = contenidoReporte + `<tr style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse;">
                            <td style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">${reporteSintacticos[x]['lexico']}</th>
                            <td style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">${reporteSintacticos[x]['linea']}</th>
                            <td style="border: 1px solid rgb(2, 128, 2); border-collapse: collapse; padding-right: 8px; padding-left: 8px;">${reporteSintacticos[x]['columna']}</th>
                        </tr>`;

                }
            }

        }

        if(contenidoReporte.length > 0){

                reporteDeErrores = inicioReporte + contenidoReporte + finReporte;
    
                fs.writeFileSync('./reporteErrores.html', reporteDeErrores);


            contenidoReporte == "";
        }
        

    } catch (e) {
        console.error(e);
        return;
    }

    res.json({
        ast:ast['ast'],
        //html:ast['html'],
        tablaVariables:tablaVariables
    });
});



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.listen(8080, function (){

    //var miEntrada = "/*comentario \n\n multilinea*/ asignaciion = 'c';";

      //  ast = parser.parse(miEntrada);

    console.log('mi app');
});