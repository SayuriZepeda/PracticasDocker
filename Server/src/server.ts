import db from "./config/bd";
import express from "express";
import router from "./router";

const server = express();

server.use(express.json());

server.use("/api/products", router);
//server.use("/api", router);

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log("Conexion a la base de datos exitosa!");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos:");
        console.log("Retrying connection in 5 seconds...");
    }
}

connectDB();

export default server;