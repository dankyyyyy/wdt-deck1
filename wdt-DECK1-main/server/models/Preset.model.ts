import mongoose from "mongoose";
import { IAsset, ILocation, ITeam, IWindTurbineGenerator } from "~/types";

const schema: mongoose.Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        location: { type: Object, required: true },
        wtg: { type: Object, required: true },
        asset1: { type: Object, required: true },
        asset2: { type: Object, required: true },
    },
    { timestamps: true }
)

export default mongoose.model("Preset", schema)