

//Patron singleton, para evitar tener multiples instancias

import mysql = require('mysql');
import { Result } from 'range-parser';

export default class MySQL{

    private static _instance:MySQL;

    con: mysql.Connection;
    conectado:boolean=false;

    constructor(){
        console.log('clase inicia');
        this.con =  mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
        });

        this.conectarDB();

    }

    public static get instance(){
        //si existe la instacia se retorna, si no, se crea una nueva
        return this._instance || (this._instance=new this() )
    }

    static ejecutarQuery(query:string,callback:Function){
        //el atributo con es un atributo de la clase
        //No se puede iniciar en un metodo estatico
        //se llama instance, ya que este tiene la configuracion para crear una nueva instancia
        //se puede usar atributos de clase siempre y cuando la clase ya este inicializada-
        //como es un metodo estatico, no es posible
        this.instance.con.query(query,(err,results:Object[],fields)=>{
            if(err){
                console.log('error en query',err);
                return callback(err);
            }

            if(results.length===0){
                callback('Registro no existe ');
            }else{
                callback(null,results);
            }

            
        });
    }


    private conectarDB(){
        this.con.connect((err:mysql.MysqlError)=>{

            if(err){
                console.log(err);
                return;
            }

            this.conectado=true;
            console.log('Base de datos Online');

        });
    }


}