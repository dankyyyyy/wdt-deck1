import mongoose, { trusted } from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
    {
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

export default mongoose.model("Teams",schema)