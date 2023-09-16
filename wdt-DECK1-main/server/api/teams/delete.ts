import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body._id;

    try {
        await TeamModel.findByIdAndDelete(id);
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})