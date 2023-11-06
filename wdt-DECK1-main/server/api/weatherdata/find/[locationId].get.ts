import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    // Find the first document
    const firstFind = await WeatherModel.findOne({ "location._id": id });
    
    
    let higherYearResults;
    // Check if a document was found in the first query
    if (firstFind) {
        higherYearResults = firstFind;
        let yearToCompare = firstFind.Year;
        let exit = false;
        do {
            // Find document with greatest year
            let queryRes = await WeatherModel.findOne({
                "location._id": id,
                Year: { $gt: yearToCompare }
            });
            if (queryRes != null){
                higherYearResults = queryRes;
                yearToCompare = higherYearResults.Year
            } else {
                exit = true;
            }
            
        } while (!exit);
    } 
    return higherYearResults;
})