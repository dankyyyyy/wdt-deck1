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
        dailyAvailableTimePerTeam: { type: Number },
        staffPerTeam: { type: Number },
        totalYearlyAvailableTime: { type: Number },

        // Vessel-only Attributes
        vesselSpeed: { type: Number },
        fuelFlowLoitering: { type: Number },
        loitering: { type: Number },
        highEngineActivity: { type: Number },

        // Helicopter-only Attributes
        helicopterSpeed: { type: Number },
        cloudbase: { type: Number },
    },
    { timestamps: true }
)

export default mongoose.model("Asset", schema)
