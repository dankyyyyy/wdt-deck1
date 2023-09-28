import WindTurbineGeneratorModel from '~/server/models/WindTurbineGenerator.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('Server-side WindTurbineGenerator: ', body);

    try {
      const updatedWindTurbineGenerator = await WindTurbineGeneratorModel.findByIdAndUpdate(
        body._id,
        {
          $set: {
            name: body.name, 
            windSpeedLimit: body.windSpeedLimit,
            plannedMaintenance: body.plannedMaintenance,
            troubleshootVisits: body.troubleshootVisits,
            averageTsHours: body.averageTsHours,
          },
        },
        { new: true }
      );
    
        if (!updatedWindTurbineGenerator) {
          throw createError({
            message: 'WindTurbineGenerator not found.',
          });
        }
        
        console.log('Updated WindTurbineGenerator: ', updatedWindTurbineGenerator);
        return { message: 'WindTurbineGenerator updated.' }
      } catch (error) {
        throw createError({
          message: 'WindTurbineGenerator found, but encountered an error during update.',
        });
      }
    })

    
