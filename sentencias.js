const tablaVariables = {

    generarTabla: function(array){

        var aux = [];

        if(array.length > 0){

            for(var x = 0; x < array.length; x++){

                for(var y = 0; y < array[x]['identificadores'].length; y++ ){

                    if(array[x]['identificadores'][y] != ","){
                        aux.push({'tipo':array[x]['tipo'],'identificador':array[x]['identificadores'][y],'linea':array[x]['linea']});
                    }

                }

            }

        }

        return aux;

    }

}

const sentenciasAPI = {

    //Aca se crean los nodos de cada producion que se iran retornando a modo de arrelgos JSON para el AST
    //Se consumira delde el API xD

    tipoDato: function(tipo_dato){
        return {
            tipo: tipo_dato
        }
    },

    declaracionConstanteSimple: function(cont_palabra, lista_id, puntoComa){
        
        return {
            constante: cont_palabra,
            tipo: tipo_dato,
            identificadores: lista_id,
            puntoComa: puntoComa
        }
    },

    declaracionSimple: function(tipo_dato, lista_id, puntoComa){
        return {
            tipo: tipo_dato,
            identificadores: lista_id,
            puntoComa: puntoComa
        }
    },

    declaracionConstanteConAsignacion: function(cont_palabra, tipo_dato, lista_id, signoIgual, expresion, puntoComa){
        return {
            constante: cont_palabra,
            tipo: tipo_dato,
            identificadores: lista_id,
            igual: signoIgual,
            valor: expresion,
            puntoComa: puntoComa
        }
    },

    declaracionConAsignacion: function(tipo_dato, lista_id, signoIgual, expresion, puntoComa){
        return {
            tipo: tipo_dato,
            identificadores: lista_id,
            igual: signoIgual,
            valor: expresion,
            puntoComa: puntoComa
        }
    },

    asignacion: function(lista_id,signoIgual,expresion,puntoComa){

        console.log({
            identificadores:lista_id,
            igual: signoIgual,
            valor: expresion,
            puntoComa: puntoComa
        });
        return{
            identificadores:lista_id,
            igual: signoIgual,
            valor: expresion,
            puntoComa: puntoComa
        }
    },

    identificador: function(id){
        return{
            identificador: id
        }
    },

    metodo: function(palabraReservadaVoid, id, parentesisIzquierdo, parametros, parentesisDerecho, llaveIzquierda, sentenciasMetodosFunciones, llaveDerecha)
    {
        if(parametros != null && sentenciasMetodosFunciones != null){
            return {
                palabraReservada: palabraReservadaVoid,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parametros: parametros,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                sentencias: sentenciasMetodosFunciones,
                llaveDerecha: llaveDerecha
            }
        } else if(parametros != null && sentenciasMetodosFunciones == null){
            return {
                palabraReservada: palabraReservadaVoid,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parametros: parametros,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                llaveDerecha: llaveDerecha
            }
        } else if(parametros == null && sentenciasMetodosFunciones != null){
            return {
                palabraReservada: palabraReservadaVoid,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                sentencias: sentenciasMetodosFunciones,
                llaveDerecha: llaveDerecha
            }
        } else if(parametros == null && sentenciasMetodosFunciones == null){
            return {
                palabraReservada: palabraReservadaVoid,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                llaveDerecha: llaveDerecha
            }
        }
    },

    funcion: function(tipo_dato,id,parentesisIzquierdo, parametros, parentesisDerecho, llaveIzquierda, sentenciasMetodosFunciones, llaveDerecha){
        if(parametros != null && sentenciasMetodosFunciones != null){
            return {
                tipo: tipo_dato,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parametros: parametros,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                sentencias: sentenciasMetodosFunciones,
                llaveDerecha: llaveDerecha
            }
        } else if(parametros != null && sentenciasMetodosFunciones == null){
            return {
                tipo: tipo_dato,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parametros: parametros,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                llaveDerecha: llaveDerecha
            }
        } else if(parametros == null && sentenciasMetodosFunciones != null){
            return {
                tipo: tipo_dato,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                sentencias: sentenciasMetodosFunciones,
                llaveDerecha: llaveDerecha
            }
        }
        else if (parametros == null && sentenciasMetodosFunciones == null){
            return {
                tipo: tipo_dato,
                identificador: id,
                parentesisIzquierdo: parentesisIzquierdo,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                llaveDerecha: llaveDerecha
            }
        }

    },

    metodoMain: function(palabraReservada,palabraReservada2,parentesisIzquierdo,parentesisDerecho,llaveIzquierda,sentenciasMetodosFunciones,llaveDerecha){
        if(sentenciasMetodosFunciones != null){
            return {
                plabraReservada:palabraReservada,
                palabraReservadaMain: palabraReservada2,
                parentesisIzquierdo: parentesisIzquierdo,
                parentesisDerecho: parentesisDerecho,
                llaveIzquierda: llaveIzquierda,
                sentencias: sentenciasMetodosFunciones,
                llaveDerecha: llaveDerecha
            }
        }
        return {
            palabraReservada: palabraReservada,
            parentesisIzquierdo: parentesisIzquierdo,
            parentesisDerecho: parentesisDerecho,
            llaveIzquierda: llaveIzquierda,
            llaveDerecha: llaveDerecha
        } 
    },

    ifSimple: function(palabraReservada,parentesisIzquierdo,condicion,parentesisDerecho,llaveIzquierda,sentenciasMetodosFunciones,llaveDerecha){
        if(sentenciasMetodosFunciones!=null)
        {
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion: condicion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                sentencias:sentenciasMetodosFunciones,
                llaveDerecha:llaveDerecha
            }            
        }
        else
        {
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion: condicion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
            }
        }
    },
    
    elseIfSimple: function(palabraReservada,palabraReservada2,parentesisIzquierdo,condicion,parentesisDerecho,llaveIzquierda,sentenciasMetodosFunciones,llaveDerecha)
    {
        if(sentenciasMetodosFunciones!=null)
        {
            return{
                palabraReservada:palabraReservada,
                palabraReservada2:palabraReservada2,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion: condicion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                sentencias:sentenciasMetodosFunciones,
                llaveDerecha:llaveDerecha
            }            
        }
        else
        {
            return{
                palabraReservada:palabraReservada,
                palabraReservada2:palabraReservada2,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion: condicion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
            }
        }
    },

    elseSimple: function(palabraReservada,llaveDerecha,sentenciasMetodosFunciones,llaveIzquierda){
        if(sentenciasMetodosFunciones!=null)
        {
            return{
                palabraReservada:palabraReservada,
                llaveIzquierda:llaveIzquierda,
                sentencias:sentenciasMetodosFunciones,
                llaveDerecha:llaveDerecha
            }            
        }
        else
        {
            return{
                palabraReservada:palabraReservada,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
            }
        }
    },

    controlSwitch: function(palabraReservada,parentesisIzquierdo,expresion,parentesisDerecho,llaveIzquierda,lista_casos,llaveDerecha){
        if(lista_casos != null){
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo,parentesisIzquierdo,
                expresion:expresion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                casos:lista_casos,
                llaveDerecha:llaveDerecha
            }        
        } else{
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo,parentesisIzquierdo,
                expresion:expresion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
            }    
        }
    },

    casoSimple: function(palabraReservada,expresion,dosPuntos,sentenciasSwitch,sentenciaBreak){
        if(sentenciaBreak != null)
        {
            return{
                palabraReservada:palabraReservada,
                expresion:expresion,
                dosPuntos:dosPuntos,
                sentencia:sentenciasSwitch,
                sentenciaBreak:sentenciaBreak
            }
        }else{

            return{
                palabraReservada:palabraReservada,
                expresion:expresion,
                dosPuntos:dosPuntos,
                sentencia:sentenciasSwitch
            }
        }
    },

    sentenciaBreak: function(palabraReservada,puntoComa){
        return{
            palabraReservada:palabraReservada,
            puntoComa:puntoComa
        }
    },

    defaultSimple: function(palabraReservada,dosPuntos,sentenciasSwitch){
        return{
            palabraReservadaL:palabraReservada,
            dosPuntos:dosPuntos,
            imprimir:sentenciasSwitch
        }
    },

    cicloFor: function(palabraReservada,parentesisIzquierdo,declaracion,asignacion,dosPuntos,condicion,dosPuntos2,expresion,parentesisDerecho,llaveIzquierda,sentenciasCiclos,llaveDerecha){
        if(declaracion!=null ){
            if(sentenciasCiclos != null){
                return{
                    palabraReservada:palabraReservada,
                    parentesisIzquierdo:parentesisIzquierdo,
                    declaracion:declaracion,
                    dosPuntos:dosPuntos,
                    condicion:condicion,
                    dosPuntos:dosPuntos2,
                    expresion:expresion,
                    parentesisDerecho:parentesisDerecho,
                    llaveIzquierda:llaveIzquierda,
                    sentencias:sentenciasCiclos,
                    llaveDerecha:llaveDerecha
                }
            }
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo:parentesisIzquierdo,
                declaracion:declaracion,
                dosPuntos:dosPuntos,
                condicion:condicion,
                dosPuntos:dosPuntos2,
                expresion:expresion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
            }
        } else {
            if(sentenciasCiclos != null){
                return{
                    palabraReservada:palabraReservada,
                    parentesisIzquierdo:parentesisIzquierdo,
                    asignacion:asignacion,
                    dosPuntos:dosPuntos,
                    condicion:condicion,
                    dosPuntos:dosPuntos2,
                    expresion:expresion,
                    parentesisDerecho:parentesisDerecho,
                    llaveIzquierda:llaveIzquierda,
                    sentencias:sentenciasCiclos,
                    llaveDerecha:llaveDerecha
                }
            }
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo:parentesisIzquierdo,
                asignacion:asignacion,
                dosPuntos:dosPuntos,
                condicion:condicion,
                dosPuntos:dosPuntos2,
                expresion:expresion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
            }        
        }
    },
    
    cicloWhile: function(palabraReservada,parentesisIzquierdo,condicion,parentesisDerecho,llaveIzquierda,sentenciasCiclos,llaveDerecha){
        if(sentenciasCiclos!=null){
            return{
                palabraReservada:palabraReservada,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion:condicion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                sentencias:sentenciasCiclos,
                llaveDerecha:llaveDerecha
            }
        }
        return{
            palabraReservada:palabraReservada,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion:condicion,
                parentesisDerecho:parentesisDerecho,
                llaveIzquierda:llaveIzquierda,
                llaveDerecha:llaveDerecha
        }
    },

    cicloDoWhile: function(palabraReservada,llaveIzquierda,sentenciasCiclos,llaveDerecha,palabraReservada2,parentesisIzquierdo,condicion,parentesisDerecho,puntoComa){
        if(sentenciasCiclos!=null){
            return{
                palabraReservada:palabraReservada,
                llaveIzquierda:llaveIzquierda,
                sentencias:sentenciasCiclos,
                llaveDerecha:llaveDerecha,
                palabraReservada2:palabraReservada2,
                parentesisIzquierdo:parentesisIzquierdo,
                condicion:condicion,
                parentesisDerecho:parentesisDerecho,
                puntoComa:puntoComa
            }
        }
        return{
            palabraReservada:palabraReservada,
            llaveIzquierda:llaveIzquierda,
            llaveDerecha:llaveDerecha,
            palabraReservada2:palabraReservada2,
            parentesisIzquierdo:parentesisIzquierdo,
            condicion:condicion,
            parentesisDerecho:parentesisDerecho,
            puntoComa:puntoComa
        }
    },
    
    sentenciaImprimir: function(palabraReservada,punto,palabraReservada2,parentesisIzquierdo,expresion,parentesisDerecho,puntoComa){
        return{
            palabraReservada:palabraReservada,
            punto:punto,
            palabraReservada2:palabraReservada2,
            parentesisIzquierdo:parentesisIzquierdo,
            expresion:expresion,
            parentesisDerecho:parentesisDerecho,
            puntoComa:puntoComa
        }        
    },
    
    returnFuncion: function(palabraReservada,expresion,puntoComa){
        return{
            palabraReservada:palabraReservada,
            expresion:expresion,
            puntoComa:puntoComa
        }
    },

    sentenciaReturn: function(palabraReservada,puntoComa){
        return{
            palabraReservada:palabraReservada,
            puntoComa:puntoComa
        }
    },

    sentenciaContinue: function(palabraReservada,puntoComa){
        return{
            palabraReservada:palabraReservada,
            puntoComa:puntoComa
        }
    },

    expresionOperacion: function(operador,signo,operador2){
        return{
            operador:operador,
            signo:signo,
            operador2:operador2
        }
    },

    expresionParentesis: function(parentesisIzquierdo,expresion,parentesisDerecho){
        return{
            parentesisIzquierdo:parentesisIzquierdo,
            expresion:expresion,
            parentesisDerecho:parentesisDerecho
        }
    },

    expresionSimple: function(valor){
        return{
            valor:valor
        }
    },

    expresionAumentoDecremento: function(valor,simbolo){
        return{
            valor:valor,
            simbolo:simbolo
        }
    },

    condicionesOperacion: function(condicion,simbolo,condicion2){
        return{
            condicion:condicion,
            simbolo:simbolo,
            condicion2:condicion2
        }
    },

    condicionesNegacion: function(simbolo,condiciones){
        return{
            simbolo:simbolo,
            condiciones:condiciones
        }
    },

    condicionesParentesis: function(parentesisIzquierdo,condiciones,parentesisDerecho){
        return{
            parentesisIzquierdo:parentesisIzquierdo,
            condiciones:condiciones,
            parentesisDerecho:parentesisDerecho
        }
    },

    condicionesSimple:  function(condicion){
        return{
            condiciones:condiciones
        }
    },

    condicionComparacion: function(expresion,simbolo,expresion2){
        return{
            operador:expresion,
            simbolo:simbolo,
            operador2:expresion2
        }
    },

    condicionNegada: function(simbolo,expresion){
        return{
            simbolo:simbolo,
            operador:expresion
        }
    },
    
    condicionParentesis: function(parentesisIzquierdo,expresion,parentesisDerecho){
        return{
            parentesisIzquierdo:parentesisIzquierdo,
            expresion:expresion,
            parentesisDerecho,parentesisDerecho
        }
    },

    valor: function(valor){
        return{
            valor:valor
        }
    }

}


module.exports.sentenciasAPI = sentenciasAPI;
module.exports.tablaVariables = tablaVariables;

//module.exports.sentenciasAPI  =  sentenciasAPI;