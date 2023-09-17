import mongoose from 'mongoose'

const schema: mongoose.Schema = new mongoose.Schema(
    {
        // Shared Attributes
        name: { type: String, required: true },
        category: { type: String, required: true },

        windSpeedLimit: {type: Number}, // m*s^-1
        hs: { type: Number }, // m
        dayRate: {type: Number}, // €
        operationalFuelConsumption: {type: Number}, // l/h

        dailyAvailableTimePerTeam: {type: Number}, // h
        staffPerTeam: {type: Number},
        totalYearlyAvailableTime: {type: Number}, // h

        // Vessel-only Attributes
        vesselSpeed: {type: Number}, // kt
        loitering: {type: Number}, // h
        highEngineActivity: {type: Number}, // h
        loiteringFuelConsumption: {type: Number}, // l/h

        // Helicopter-only Attributes
        helicopterSpeed: {type: Number}, // kt
        cloudbase: { type: Number }, // m
        visibility: { type: Number }, // km
        flightTime: { type: Number }, // h
        
        // WTG-only Attributes
        plannedMaintenance: {type: Number}, // h
        troubleshootVisits: {type: Number},
        averageTsHours: {type:Number}, // h
    },
    { timestamps: true }
)

export default mongoose.model("Asset", schema)