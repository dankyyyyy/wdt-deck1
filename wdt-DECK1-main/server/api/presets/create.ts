import PresetModel from '~/server/models/Preset.model';

export default defineEventHandler(async (event) => {
    // Get data from the request body
    const body = await readBody(event);

    //TODO validations

    // Creates the preset model
    const preset = await PresetModel.create(body);

    // Return a success message with the created preset data
    try {
      await PresetModel.create(body);
      return { message: "Asset created" }
  } catch (e: any) {
      throw createError({
          message: e.message,
      })
  }
})
