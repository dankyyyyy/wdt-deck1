import { Nitro } from 'nitropack'
import mongoose from "mongoose"

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();
    
    mongoose.connect(config.mongodbUri)
    .then(() => console.log("connected to mongodb"))
    .catch((e) => console.log(e));
}