import LocationModel from '~/server/models/Location.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body._id;

    try {
        await LocationModel.findByIdAndDelete(id);
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})