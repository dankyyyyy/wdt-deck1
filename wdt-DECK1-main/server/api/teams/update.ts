import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    //get data from the body
    const body = await readBody(event)

    const teamToUpdate = await TeamModel.findById({_id: body.teamId});
    if (!teamToUpdate) {
        throw createError({
            message: "Team not found"
        })
    }

    //update team model
    try {
        await teamToUpdate.updateOne(body);
        return { message: "Team updated" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})