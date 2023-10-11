import LocationModel from '~/server/models/Location.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body._id;
    let response;
    try {
        response = await LocationModel.findByIdAndDelete(id);
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
    
    return response;
})