import PresetModel from '~/server/models/Preset.model';

export default defineEventHandler(async (event) => {
  try {
    // Get data from the request body
    const body = await readBody(event);

    //TODO validations

    // Creates the preset model
    const preset = await PresetModel.create(body);

    // Return a success message with the created preset data
    return {
      message: 'Preset created',
      data: preset,
    };
  } catch (e: any) {
    // Handle errors and return an error response
    throw createError({
      message: e.message,
    });
  }
});
