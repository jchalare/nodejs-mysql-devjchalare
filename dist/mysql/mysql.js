"use strict";
//Patron singleton, para evitar tener multiples instancias
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('clase inicia');
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        //si existe la instacia se retorna, si no, se crea una nueva
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        //el atributo con es un atributo de la clase
        //No se puede iniciar en un metodo estatico
        //se llama instance, ya que este tiene la configuracion para crear una nueva instancia
        //se puede usar atributos de clase siempre y cuando la clase ya este inicializada-
        //como es un metodo estatico, no es posible
        this.instance.con.query(query, (err, results, fields) => {
            if (err) {
                console.log('error en query', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('Registro no existe ');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.con.connect((err) => {
            if (err) {
                console.log(err);
                return;
            }
            this.conectado = true;
            console.log('Base de datos Online');
        });
    }
}
exports.default = MySQL;
