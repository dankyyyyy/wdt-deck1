import mongoose from 'mongoose'

const schema: mongoose.Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        cloudbase: { type: Number },
        visibility: { type: Number },
        hs: { type: Number },
    },
    { timestamps: true }
)

export default mongoose.model("Asset", schema)