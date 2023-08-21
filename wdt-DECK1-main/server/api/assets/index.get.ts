import AssetModel from '~/server/models/Asset.model'

export default defineEventHandler(async (event) => {
    return await AssetModel.find()
})