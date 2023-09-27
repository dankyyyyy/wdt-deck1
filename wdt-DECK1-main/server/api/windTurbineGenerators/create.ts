import WindTurbineGeneratorModel from "~/server/models/WindTurbineGenerator.model";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    //TODO GLOBAL validations here

    try {
        await WindTurbineGeneratorModel.create(body);
        return { message: "Wind Turbine Generator created" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})