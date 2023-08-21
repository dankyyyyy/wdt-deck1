import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) =>  {
    return await WeatherModel.find()
})