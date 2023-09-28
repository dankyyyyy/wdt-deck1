import PresetModel from '~/server/models/Preset.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id = body._id;

    try {
        await PresetModel.findByIdAndDelete(id);
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})