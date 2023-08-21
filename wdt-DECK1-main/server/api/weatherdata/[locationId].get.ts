import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    let sortedData = await WeatherModel.find({ "location._id": id })

    sortedData = sortedData.sort((a, b) => {
        if (a.Year !== b.Year) {
            return a.Year - b.Year;
        } else if (a.Month !== b.Month) {
            return a.Month - b.Month;
        } else if (a.Day !== b.Day) {
            return a.Day - b.Day;
        } else {
            return a.Hour - b.Hour;
        }
    });
    //Error msg when using mongodb's sorting method
    //Executor error during find command :: caused by :: Sort exceeded memory limit of 33554432 bytes, 
    //but did not opt in to external sorting. Aborting operation.

    // const pageSize = 20000; // Number of documents to retrieve in each page
    // const pages = 11; // Number of pages to retrieve
    // let sortedData = [];
    // for (let i = 1; i <= pages; i++) {
    //     const result = await WeatherModel.find({ location: id })
    //         .sort({ Year: 1, Month: 1, Day: 1, Hour: 1 })
    //         .limit(pageSize)
    //         .skip((i - 1) * pageSize);
    //     sortedData.push(...result);
    //     console.log(sortedData.length);
        
    // }
    return sortedData;
})