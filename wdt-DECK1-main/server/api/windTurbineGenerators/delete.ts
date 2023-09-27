import WindTurbineGeneratorModel from '~/server/models/WindTurbineGenerator.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body._id;

    try {
        await WindTurbineGeneratorModel.findByIdAndDelete(id);
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})