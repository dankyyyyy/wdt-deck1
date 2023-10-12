import PresetModel from '~/server/models/Preset.model';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('Server-side Preset: ', body);

    try {
      const updatedAsset = await PresetModel.findByIdAndUpdate(
        body._id,
        {
          $set: {
            name: body.name, 
            location: body.location,
            wtg: body.wtg,
            assets: body.assets,
          },
        },
        { new: true }
      );
    
        if (!updatedAsset) {
          throw createError({
            message: 'Asset not found.',
          });
        }
        
        console.log('Updated Asset: ', updatedAsset);
        return { message: 'Asset updated.' }
      } catch (error) {
        throw createError({
          message: 'Asset found, but encountered an error during update.',
        });
      }
    })

    
