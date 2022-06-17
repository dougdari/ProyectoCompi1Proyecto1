let ast;
/*var openTabs = 1;
var tabs = [];*/

function peticionAxios(entrada){
 
    axios({
        method: 'POST',
        url: 'http://localhost:8080/ast',
        data:{
            entrada: entrada
        }
    }).then(function (result){
        recolector(result.data);
    });
}

function tablaVariables(arr){

  $('#tabla_variables').append(`<table style="width: 100%; border-collapse: collapse; border: 1px solid black;">

                                  <thead>
                                    <tr>
                                      <th style = "text-align: center; border-collapse: collapse; border: 1px solid black;">Tipo</th>
                                      <th style = "text-align: center; border-collapse: collapse; border: 1px solid black;">Nombre</th>
                                      <th style = "text-align: center; border-collapse: collapse; border: 1px solid black;">Linea</th>
                                    </th>
                                  </thead>
                                  <tbody style="width: 100% !important;" id = "contenido_tabla_variables">
                                    
                                  </tbody>
                              </table>`);

  if(arr.length > 0){

      for(var x = 0; x < arr.length; x++){

        $('#contenido_tabla_variables').append(`<tr>
            <td style="border-collapse: collapse; border: 1px solid black;">${arr[x]['tipo']}</td>
            <td style="border-collapse: collapse; border: 1px solid black;">${arr[x]['identificador']}</td>
            <td style="border-collapse: collapse; border: 1px solid black;">${arr[x]['linea']}</td>
          </tr>`);

      }
      
  }

}

function recolector(data){

    ast  = {'ast':data['ast']};
    traduccion = data['traduccion'];
    htmlRecolectado = data['html'];
    reportVariables = data['tablaVariables'];


    if(htmlRecolectado != undefined){

      if(htmlRecolectado.length > 0){
        document.getElementById('html').value = htmlRecolectado;
        //document.getElementById('json').value = combertidorHtmlAJson(htmlRecolectado,true);
      }
      
    }


    if(traduccion != undefined){
      document.getElementById('salida').value = traduccion;
    }

    $('#tabla_variables').html("");

    if(reportVariables != undefined){
      this.tablaVariables(reportVariables);
    }

    var arreglo = [];

    if(ast['ast'] != null){

      arbolCarpetas(ast,arreglo);

    }



    //$("#contenedorArbol").empty();

    

    /*/$("#contenedorArbol").append("<div id=\"astCarpetas\"></div>");

    if(arreglo.length > 0){
      $("#astCarpetas").jstree({
          'core':{
              'data': arreglo

          }
                  
      });
    }
        

    //console.log(JSON.stringify(arreglo));
  */

}

/*
function arbolCarpetas (data, arr) {
    for (var key in data) {
      if (Array.isArray(data[key]) || data[key].toString() === "[object Object]") {
        // when data[key] is an array or object
        var nodes = [];
        var completedNodes = arbolCarpetas(data[key], nodes);
        arr.push({
          text: key,
          children: completedNodes
        });
      } else {
        // when data[key] is just strings or integer values
        arr.push({
          text: key + " : " + data[key]
        });
      }
    }
    return arr;
  }
*/
function ejectuarAnalisis2(){

    var texto = document.getElementById('entrada').value;

    document.getElementById('salida').value = "";

    document.getElementById('html').value = "";

    document.getElementById('ast').value = "";

    peticionAxios(texto);

}

/*

function nuevaTab(){
  
  openTabs++;

  $('#lista_tabs').append(`<li id="li_entrada_${openTabs}" role="presentation" class="">
      <a href="#entrada_${openTabs}" style="padding-right: 5px !important;" aria-controls="entrada_${openTabs}" data-toggle="tab" role="tab">Entrada ${openTabs} <span style="margin-left: 10px !important;" class="close">×</span> </a>
    </li>`);
  $('#divs_tabs').append(`<div role="tabpanel" class="tab-pane active" id="entrada_${openTabs}">
      <textarea style="max-width: 100%; min-height: 500px; display: inline-flex;" id="entrada_text_area_${openTabs}" name="entrada"
      class="form-control" placeholder="Entrada" spellcheck="false" required>111111111111
      </textarea>
    </div>`);
  $('#lista_tabs').trigger('click');
}
*/

/*

function combertidorHtmlAJson(element, json) {
  var treeObject = {};

  if (typeof element === "string") {
      if (window.DOMParser) {
            parser = new DOMParser();
            docNode = parser.parseFromString(element,"text/xml");
      } else { // Microsoft strikes again
            docNode = new ActiveXObject("Microsoft.XMLDOM");
            docNode.async = false;
            docNode.loadXML(element); 
      } 
      element = docNode.firstChild;
  }

  //Recursively loop through DOM elements and assign properties to object
  function treeHTML(element, object) {
      object["type"] = element.nodeName;
      var nodeList = element.childNodes;
      if (nodeList != null) {
          if (nodeList.length) {
              object["content"] = [];
              for (var i = 0; i < nodeList.length; i++) {
                  if (nodeList[i].nodeType == 3) {
                      object["content"].push(nodeList[i].nodeValue);
                  } else {
                      object["content"].push({});
                      treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                  }
              }
          }
      }
      if (element.attributes != null) {
          if (element.attributes.length) {
              object["attributes"] = {};
              for (var i = 0; i < element.attributes.length; i++) {
                  object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
              }
          }
      }
  }
  treeHTML(element, treeObject);

  return (json) ? JSON.stringify(treeObject) : treeObject;
}
*/

