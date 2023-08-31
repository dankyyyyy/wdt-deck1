import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    //get data from the body
    const body = await readBody(event)

    console.log("Team ID:", body.teamId);
    const team = await TeamModel.findOne({_id: body.teamId});
    if (!team) {
        throw createError({
            message: "Team not found"
        })
    }

    //delete team model
    try {
        await team.deleteOne();
        return { message: "Team deleted" }
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})