import LocationModel from '~/server/models/Location.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const updatedLocation = await LocationModel.findByIdAndUpdate(
            body._id,
            {
                $set: {
                    name: body.name,
                    latitude: body.latitude,
                    longitude: body.longitude,
                    limit: body.limit,
                    wtg: body.wtg,
                },
            },
            { new: true }
        );

        if (!updatedLocation) {
            throw createError({
                message: 'Location not found.',
            });
        }

        console.log('Updated location: ', updatedLocation);
        return { message: 'Location updated.' }
    } catch (error) {
        throw createError({
            message: 'Location found, but encountered an error during update.',
        });
    }
})