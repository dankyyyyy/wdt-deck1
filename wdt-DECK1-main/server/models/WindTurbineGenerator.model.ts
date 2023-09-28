import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
    {
        windSpeedLimit: { type: Number },
        plannedMaintenance: { type: Number },
        troubleshootVisits: { type: Number },
        averageTsHours: { type: Number },
    },
    { timestamps: true }
)

export default mongoose.model("WindTurbineGenerator", schema)