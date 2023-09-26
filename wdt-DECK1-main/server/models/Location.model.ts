import mongoose from 'mongoose'

const schema: mongoose.Schema = new mongoose.Schema(
    {
        presetId: {type: Number},
        name: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        limit: { type: Number, required: true },
        wtg: { type: Number, required: true }
    },
    { timestamps: true }
)

export default mongoose.model("Location", schema)