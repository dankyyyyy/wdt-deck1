import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        location: { type: Object, required: true },
        wtg: { type: Object, required: true },
        assets: { type: Array, required: true},
    },
    { timestamps: true }
)

export default mongoose.model("Preset", schema)
