import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const updatedTeam = await TeamModel.findByIdAndUpdate(
            body._id,
            {
                $set: {
                    name: body.name,
                    numberOfPersons: body.numberOfPersons,
                    shiftPeriod: body.shiftPeriod,
                },
            },
            { new: true }
        );

        if (!updatedTeam) {
            throw createError({
                message: 'Team not found.',
            });
        }

        return { message: 'Team updated.' };
    } catch (error) {
        throw createError({
            message: 'Team found, but encountered an error during update.',
        });
    }
})