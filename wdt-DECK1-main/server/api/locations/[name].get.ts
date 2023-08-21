import LocationModel from '~/server/models/Location.model'

export default defineEventHandler(async (event) => {
    const name = event.context.params?.name;
    return await LocationModel.find({ name: name })
})