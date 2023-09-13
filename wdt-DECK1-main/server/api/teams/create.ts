import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        await TeamModel.create(body);
        return { message: "Team created" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})