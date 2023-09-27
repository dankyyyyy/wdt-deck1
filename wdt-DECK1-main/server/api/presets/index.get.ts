import PresetModel from '~/server/models/Preset.model'

export default defineEventHandler(async (event) => {
    return await PresetModel.find()
})