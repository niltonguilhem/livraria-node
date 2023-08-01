import mongoose from "mongoose"

mongoose.connect("mongodb+srv://nilguilhem:123@alura.gjqpfxz.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;