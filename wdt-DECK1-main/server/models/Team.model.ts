import mongoose from "mongoose"

const schema: mongoose.Schema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },

        numberofPersons: {
            type: Number,
            required: true
        },

        shiftPeriod: {
            type: Number,
            required: true
        },
    },
    {timestamps : true}
)

export default mongoose.model("Team",schema)