import TeamModel from '~/server/models/Team.model'

export default defineEventHandler(async (event) => {
    return await TeamModel.find()
})