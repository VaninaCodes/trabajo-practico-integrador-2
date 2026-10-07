import {verifyToken} from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next)=>{
    try{
        const token = req.cookie["token"];
        if(!token){
            return res.status(401).json({message: "No autenticado"});
        }

        const decoded = verifyToken(token);
        req.datosDelUsuarioLogeado = decoded;
        next();
    }catch(error){
        res.status(500).json({message: "Error interno del servidor"});
    }
}

export const adminMiddleware = (req, res, next) => {
    if(req.datosDelUsuarioLogeado.role !== "admin"){
        return res.status(403).json({message: "Acceso solo para administradores"});
    }
    next();
};

export const ownerMiddleware = (paramName = "id")=> {
    return(req, res, next)=> {
        const resourceUserId = Number(req.params[paramName]);
        if(req.datosDelUsuarioLogeado.role === "admin" || req.datosDelUsuarioLogeado.id === resourceUserId){
            return next();
        }
        return res.status(403).json({message: "No contas con los permisos para este resurso"});
    };
};