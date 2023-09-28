import WindTurbineGeneratorModel from '~/server/models/WindTurbineGenerator.model'

export default defineEventHandler(async (event) => {
    return await WindTurbineGeneratorModel.find()
})