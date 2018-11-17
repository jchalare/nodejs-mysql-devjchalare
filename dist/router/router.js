"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router(); //instancia de router
router.get('/heroes', (req, res) => {
    const query = 'SELECT * FROM heroes';
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    //escapar valores extraños,
    //el escape es un metodo de la libreria de mysql
    //por lo tanto debemos hacer una instancia llamando ese metodo
    //como estamos en patron singleton, se debe llamar al metodo que hace la instancia
    //no directamente la clase y metodo necesitado
    //es decir: MySQL.escape: esta mal, ya que la clase no se ha iniciailzado osea new MySQL()
    const escapedId = mysql_1.default.instance.con.escape(id);
    const query = `SELECT * FROM heroes WHERE id=${escapedId}`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe
            });
        }
    });
});
exports.default = router;
