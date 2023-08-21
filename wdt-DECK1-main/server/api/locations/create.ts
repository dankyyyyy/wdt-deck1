import LocationModel from '~/server/models/Location.model'

export default defineEventHandler(async (event) => {
    //get data from the body
    const body = await readBody(event)

    //validations here
    //let error = LocationSchema.validate(body)
    // if (error) {
    //     throw createError({
    //         message: error.message,
    //         statusCode: 400,
    //         fatal: false,
    //     });
    // }

    //create location model
    try {
        await LocationModel.create(body);
        return { message: "Location created" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})