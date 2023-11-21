import WeatherModel from '~/server/models/WeatherData.model';

export const maxDuration = 200;
export const dynamic = "force-dynamic";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    let sortedData = await WeatherModel.aggregate([
        {
            $match: {
                "location._id": id,
            },
        },
        {
            $sort: {
                Year: 1,
                Month: 1,
                Day: 1,
                Hour: 1,
            },
        },
    ]);
    return sortedData;
})