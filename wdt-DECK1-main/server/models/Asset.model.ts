import mongoose from 'mongoose'

const schema: mongoose.Schema = new mongoose.Schema(
    {
        // Shared Attributes
        name: { type: String, required: true },
        category: { type: String, required: true },
        hs: { type: Number },
        visibility: { type: Number },
        windSpeedLimit: { type: Number },
        dayRate: { type: Number },
        operationalFuelConsumption: { type: Number },

        // Vessel-only Attributes
        vesselSpeed: { type: Number },
        loitering: { type: Number },
        loiteringFuelConsumption: { type: Number },
        highEngineActivity: { type: Number },

        // Helicopter-only Attributes
        helicopterSpeed: { type: Number },
        cloudbase: { type: Number },

        team: { type: Object, required: true },
    },
    { timestamps: true }
)

export default mongoose.model("Asset", schema)
