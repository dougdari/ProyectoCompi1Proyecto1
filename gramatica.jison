

%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*   									// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"const"             {console.log('const'); return 'R_CONST';}   
"if"                {console.log('if'); return 'R_IF';}    
"else"              {console.log('else'); return 'R_ELSE';}
"switch"            {console.log('switch'); return 'R_SWITCH';}
"case"              {console.log('case'); return 'R_CASE';}    
"break"             {console.log('break'); return 'R_BREAK';}    
"default"           {console.log('default'); return 'R_DEFAULT';}
"for"               {console.log('for'); return 'R_FOR';}    
"while"             {console.log('while'); return 'R_WHILE';}   
"do"                {console.log('do'); return 'R_DO';}
"continue"          {console.log('continue'); return 'R_CONTINUE';}    
"void"              {console.log('void'); return 'R_VOID';}
"return"            {console.log('return'); return 'R_RETURN';}    
"call"              {console.log('call'); return 'R_CALL';}    
"null"              {console.log('null'); return 'R_NULL';}    
"println"           {console.log('println'); return 'R_PRINTLN';}    
"print"             {console.log('print'); return 'R_PRINT';}    
"typeof"            {console.log('typeof'); return 'R_TYPEOF';}

"int"               {console.log('int'); return 'R_INT';}
"double"            {console.log('double'); return 'R_DOUBLE';}
"char"              {console.log('char'); return 'R_CHAR';}
"boolean"           {console.log('boolean'); return 'R_BOOLEAN';}
"String"            {console.log('String'); return 'R_STRING';}    

"("                 {console.log('('); return 'R_PIZ';}
")"                 {console.log(')'); return 'R_PDER';}
"{"                 {console.log('{'); return 'R_LIZ';}
"}"                 {console.log('}'); return 'R_LDER';}

"++"                {console.log('++'); return 'R_AUMENTO';}    
"--"                {console.log('--'); return 'R_DECREMENTO';}    
"**"                {console.log('**'); return 'R_POTENCIA';}
"=="                {console.log('=='); return 'R_IGUALCOMPARATIVO';}
">="                {console.log('>='); return 'R_MAYORIGUAL';}
"<="                {console.log('<='); return 'R_MENORIGUAL';}
"!="                {console.log('!='); return 'R_NOIGUAL';}
"||"                {console.log('||'); return 'R_OCONDICIONAL';}
"&&"                {console.log('&&'); return 'R_YCONDICIONAL';}    

"+"                 {console.log('+'); return 'R_SUMA';}
"-"                 {console.log('-'); return 'R_RESTA';}
"*"                 {console.log('*'); return 'R_POR';}
"/"                 {console.log('/'); return 'R_DIVISION';}
"%"                 {console.log('%'); return 'R_MODULO';}
">"                 {console.log('>'); return 'R_MAYOR';}
"<"                 {console.log('<'); return 'R_MENOR';}
"^"                 {console.log('^'); return 'R_XOR';}
"!"                 {console.log('!'); return 'R_NEGADO';}
":"                 {console.log(':'); return 'R_DOSPUNTOS';}
";"                 {console.log(';'); return 'R_PUNTOCOMA';}
","                 {console.log(','); return 'R_COMA';}
"="                 {console.log('='); return 'R_IGUAL_ASIG';}


\"[^\"]*\"				{console.log('cadena'); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b  	{console.log('decimal'); return 'DECIMAL'; }
[0-9]+\b				{console.log('numero'); return 'ENTERO';}
([a-zA-Z])[a-zA-Z0-9_]*	{console.log('identificador'); return 'IDENTIFICADOR'; }
true|false              {console.log('booleando'); return 'BOOLEANO';}
['][^\']][']           {console.log('caracter'); return 'CARACTER';}

<<EOF>>				return 'EOF';   
.					{ 
                        tablaErroresLexicos.push({'lexico':yytext,'linea':yylloc.first_line,'columna':yylloc.first_column});  
                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        
                    }

/lex

%{

    const sentenciasAPI = require('./sentencias').sentenciasAPI;

    let htmlRecolectado = "";

    let tablaVariables = [];

    let tablaErroresLexicos = [];

    let tablaErroresSintacticos = [];

%}

%left 'R_SUMA' 'R_RESTA'
%left 'R_POR' 'R_DIVISION'
%left 'R_YCONDICIONAL' 'R_OCONDICIONAL'
%left 'R_MAYORIGUAL' 'R_MENORIGUAL' 'R_MENOR' 'R_MAYOR' 'R_IGUALCOMPARATIVO' 'R_NOIGUAL' 'R_XOR'

%start inicio 
%%

inicio : sentencias_iniciales EOF {
    
    
    var aux2 = tablaErroresLexicos;
    var aux3 = tablaErroresSintacticos;
    var aux4 = tablaVariables;
    htmlRecolectado = "";
    tablaErroresLexicos = [];
    tablaErroresSintacticos = [];
    tablaVariables = [];

    if(aux2.length || aux3.length){
        return {"html":aux,"ast":null,"erroresLexicos":aux2,"erroresSintacticos":aux3,"tablaVariables":null};
    }

       return {"ast":$1,"erroresLexicos":aux2,"erroresSintacticos":aux3,"tablaVariables":aux4};    
        return $1 
    }
;

sentencias_iniciales : asignacion sentencias_iniciales {$2.push($1); $$ = $2; }
    |declaracion sentencias_iniciales {$2.push($1); $$ = $2; }
    |metodo sentencias_iniciales {$2.push($1); $$ = $2; }
    |funcion sentencias_iniciales {$2.push($1); $$ = $2; }
    |asignacion {$$ = [$1];}
    |declaracion {$$ = [$1];}
    |metodo {$$ = [$1];}
    |funcion {$$ = [$1];}
;

lista_id : IDENTIFICADOR R_COMA lista_id { $3.push($1); $3.push($2); $$ = $3 ;} 
    |IDENTIFICADOR { $$ = [$1]; }
;

tipo_dato : R_INT { $$ = $1; }
    |R_DOUBLE { $$ = $1; }
    |R_CHAR { $$ = $1; }
    |R_BOOLEAN { $$ = $1; }
    |R_STRING { $$ = $1; }
;

declaracion : R_CONST tipo_dato lista_id R_IGUAL_ASIG expresion R_PUNTOCOMA  {
            tablaVariables.push({'constante':$1,'tipo':$2,'identificadores':$3,'linea':this._$.first_line});
            $$ = sentenciasAPI.declaracionConstanteConAsignacion($1,$2,$3,$4,$5,$6);
        }
    |tipo_dato lista_id R_IGUAL_ASIG expresion R_PUNTOCOMA {
            tablaVariables.push({'tipo':$1,'identificadores':$2,'linea':this._$.first_line});
            $$ = sentenciasAPI.declaracionConAsignacion($1,$2,$3,$4,$5);
        }
    |R_CONST tipo_dato lista_id R_PUNTOCOMA {
            tablaVariables.push({'constante':$1, 'tipo':$2,'identificadores':$3,'linea':this._$.first_line});
            $$ = sentenciasAPI.declaracionConstanteSimple($1,$2,$3,$4);
        }
    |tipo_dato lista_id R_PUNTOCOMA {
            tablaVariables.push({'tipo':$1,'identificadores':$2,'linea':this._$.first_line});
            $$ = sentenciasAPI.declaracionSimple($1,$2,$3);
        }
;

asignacion : lista_id R_IGUAL_ASIG expresion R_PUNTOCOMA { 
    $$ = sentenciasAPI.asignacion($1,$2,$3,$4); }
;

metodo 
    :R_VOID IDENTIFICADOR R_PIZ parametros R_PDER R_LIZ sentencias_metodos_funciones R_LDER { $$ = sentenciasAPI.metodo($1,$2,$3,$4,$5,$6,$7,$8); }
    |R_VOID IDENTIFICADOR R_PIZ R_PDER R_LIZ sentencias_metodos_funciones R_LDER { $$ = sentenciasAPI.metodo($1,$2,$3,null,$4,$5,$6,$7); }
    |R_VOID IDENTIFICADOR R_PIZ parametros R_PDER R_LIZ R_LDER { $$ = sentenciasAPI.metodo($1,$2,$3,$4,$5,$6,null,$7); }
    |R_VOID IDENTIFICADOR R_PIZ R_PDER R_LIZ R_LDER { $$ = sentenciasAPI.metodo($1,$2,$3,null,$4,$5,null,$6); }
;

funcion
    :tipo_funcion IDENTIFICADOR R_PIZ parametros R_PDER R_LIZ sentencias_metodos_funciones R_LDER { $$ = sentenciasAPI.funcion($1,$2,$3,$4,$5,$6,$7,$8); }
    |tipo_funcion IDENTIFICADOR R_PIZ R_PDER R_LIZ sentencias_metodos_funciones R_LDER { $$ = sentenciasAPI.funcion($1,$2,$3,null,$4,$5,$6,$7); }
    |tipo_funcion IDENTIFICADOR R_PIZ parametros R_PDER R_LIZ R_LDER { $$ = sentenciasAPI.funcion($1,$2,$3,$4,$5,$6,null,$7); }
    |tipo_funcion IDENTIFICADOR R_PIZ R_PDER R_LIZ R_LDER { $$ = sentenciasAPI.funcion($1,$2,$3,null,$4,$5,null,$6); }
;

parametros
    :tipo_funcion IDENTIFICADOR R_COMA parametros { $4.push($1); $4.push($2); $4.push($3); $$ = $4.push({tipo:$1,identificador:$2}); }
    |tipo_funcion IDENTIFICADOR { $$ = {tipo:$1,identificador:$2};}
;

tipo_funcion : tipo_dato { $$ = $1; }
    |IDENTIFICADOR { $$ = $1; }
;

expresion
    :expresion R_RESTA expresion { $$ = sentenciasAPI.expresionOperacion($1,$2,$3); }
    |expresion R_SUMA expresion { $$ = sentenciasAPI.expresionOperacion($1,$2,$3); }
    |expresion R_POTENCIA expresion { $$ = sentenciasAPI.expresionOperacion($1,$2,$3); }
    |expresion R_DIVISION expresion { $$ = sentenciasAPI.expresionOperacion($1,$2,$3); }
    |expresion R_MODULO expresion { $$ = sentenciasAPI.expresionOperacion($1,$2,$3); }
    |expresion R_POR expresion { $$ = sentenciasAPI.expresionOperacion($1,$2,$3); }
    |R_PIZ expresion R_PDER { $$ = sentenciasAPI.expresionParentesis($1,$2,$3); } 
    |valor { $$ = $1;}
    |expresion { $$ = $1;}

;

valor: R_AUMENTO IDENTIFICADOR { $$ = [$1,$2]}
     | R_DECREMENTO IDENTIFICADOR { $$ = [$1,$2]}
     | IDENTIFICADOR R_AUMENTO { $$ = [$1,$2]}
     | IDENTIFICADOR R_DECREMENTO { $$ = [$1,$2]}
     | ENTERO { $$ = $1; }
     | DECIMAL { $$ = $1; }
     | CADENA { $$ = $1; } 
     | IDENTIFICADOR { $$ = $1; }
     | CARACTER { $$ = $1; }
     | BOOLEANO { $$ = $1;  }
;

