import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    const result = await WeatherModel.findOne({ "location._id": id })
    return result;
})