import AssetModel from '~/server/models/Asset.model'

export default defineEventHandler(async (event) => {
    const name = event.context.params?.name;
    return await AssetModel.find({ name: name })
    })