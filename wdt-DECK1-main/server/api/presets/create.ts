import PresetModel from '~/server/models/Preset.model';

export default defineEventHandler(async (event) => {
    // Get data from the request body
    const body = await readBody(event);

    //TODO validations
    
    // Return a success message with the created preset data
    try {
      await PresetModel.create(body);
      return { message: "Preset created" }
  } catch (e: any) {
      throw createError({
          message: e.message,
      })
  }
})
