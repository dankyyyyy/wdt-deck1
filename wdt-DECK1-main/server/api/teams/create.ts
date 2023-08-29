import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    //get data from the body
    const body = await readBody(event)

    //create team model
    try {
        await TeamModel.create(body);
        return { message: "Team created" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})