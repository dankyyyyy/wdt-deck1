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
                },
            },
            { new: true }
        );

        if (!updatedLocation) {
            throw createError({
                message: 'Asset not found.',
            });
        }

        console.log('Updated Asset: ', updatedLocation);
        return { message: 'Asset updated.' }
    } catch (error) {
        throw createError({
            message: 'Asset found, but encountered an error during update.',
        });
    }
})