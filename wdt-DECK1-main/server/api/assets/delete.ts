import AssetModel from '~/server/models/Asset.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body._id;

    try {
        await AssetModel.findByIdAndDelete(id);
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})