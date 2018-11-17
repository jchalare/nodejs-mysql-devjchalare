import { Router,Request,Response } from "express";
import MySQL from "../mysql/mysql";


const router = Router();//instancia de router


router.get('/heroes',(req:Request,res:Response)=>{

    const query='SELECT * FROM heroes';

    MySQL.ejecutarQuery(query,(err:any,heroes:Object[])=>{

        if(err){
            res.status(400).json({
                ok:false,
                error:err
            })
        }else{
            res.json({
                ok:true,
               heroes 
            })
        }


    });

    

});

router.get('/heroes/:id',(req:Request,res:Response)=>{

    const id = req.params.id;

    //escapar valores extraños,
    //el escape es un metodo de la libreria de mysql
    //por lo tanto debemos hacer una instancia llamando ese metodo
    //como estamos en patron singleton, se debe llamar al metodo que hace la instancia
    //no directamente la clase y metodo necesitado
    //es decir: MySQL.escape: esta mal, ya que la clase no se ha iniciailzado osea new MySQL()
    

    const escapedId=MySQL.instance.con.escape(id);


    const query=`SELECT * FROM heroes WHERE id=${escapedId}`;

    MySQL.ejecutarQuery(query,(err:any,heroe:Object[])=>{

        if(err){
            res.status(400).json({
                ok:false,
                error:err
            })
        }else{
            res.json({
                ok:true,
                heroe 
            })
        }


    });

    
});


export default router;