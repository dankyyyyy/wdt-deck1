import WeatherdataModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    //get data from the body
    const body = await readBody(event)

    //validations here
    //let error = WeatherdataSchema.validate(body)
    // if (error) {
    //     throw createError({
    //         message: error.message,
    //         statusCode: 400,
    //         fatal: false,
    //     });
    // }

    //create weatherdata
    try {
        await WeatherdataModel.create(body);
        return { message: "Weatherdata created" }
    } catch (e: any) { 
        throw createError({
            message: e.message,
        })
    }
})