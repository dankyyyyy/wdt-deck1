import LocationModel from '~/server/models/Location.model'

export default defineEventHandler(async (event) => {
    return await LocationModel.find()
})