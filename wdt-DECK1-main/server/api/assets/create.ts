import AssetModel from '~/server/models/Asset.model'

export default defineEventHandler(async (event) => {
    //get data from the body
    const body = await readBody(event)

    //validations here
    //let error = AssetSchema.validate(body)
    // if (error) {
    //     throw createError({
    //         message: error.message,
    //         statusCode: 400,
    //         fatal: false,
    //     });
    // }

    //create asset model
    try {
        await AssetModel.create(body);
        return { message: "Asset created" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})