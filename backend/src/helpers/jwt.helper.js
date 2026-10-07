import jwt from "jsonwebtoken";

// generar el token
export const generateToken = (payload) => {
    try{
        return jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "Sh", // token valido por 1 hora
        });
    }catch(error){
        throw new Error("Error generando el token: " + error.message);
    }
};

// verficar token JWT
export const verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }catch(error) {
        throw new Error("Error verficando el token: " + error.message);
    }
};