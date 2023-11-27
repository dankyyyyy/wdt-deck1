import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    const { year = 0 } = getQuery(event);

    const yearlyEntry = await WeatherModel.findOne({ "location._id": id, Year: year});
    return yearlyEntry;
})