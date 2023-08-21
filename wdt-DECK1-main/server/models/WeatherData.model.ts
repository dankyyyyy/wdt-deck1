import mongoose from 'mongoose'

const schema: mongoose.Schema = new mongoose.Schema(
    {
        Year: {
            type: Number,
            required: true
        },
        Month: {
            type: Number,
            required: true
        }, 
        Day: {
            type: Number,
            required: true
        },
        Hour: {
            type: Number,
            required: true
        },
        "Sign. wave height (Hs)": {
            type: Number,
            required: true
        },
        "Wind speed": {
            type: Number,
            required: true
        },
        Visibility: {
            type: Number,
            required: true
        },
        "VFR cloud": {
            type: Number,
            required: true
        },
        location: {
            type: Object,
            required: true,
        }
    },  
    { timestamps: true }
)

export default mongoose.model("Weatherdata", schema)