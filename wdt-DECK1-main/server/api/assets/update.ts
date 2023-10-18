import AssetModel from '~/server/models/Asset.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('Server-side Asset: ', body);

    try {
      const updatedAsset = await AssetModel.findByIdAndUpdate(
        body._id,
        {
          $set: {
            name: body.name,
            category: body.category,
            hs: body.hs,
            visibility: body.visibility,
            windSpeedLimit: body.windSpeedLimit,
            dayRate: body.dayRate,
            operationalFuelConsumption: body.operationalFuelConsumption,
            vesselSpeed: body.vesselSpeed,
            fuelFlowLoitering: body.fuelFlowLoitering,
            loitering: body.loitering,
            highEngineActivity: body.highEngineActivity,
            helicopterSpeed: body.helicopterSpeed,
            cloudbase: body.cloudbase,
            flightTime: body.flightTime,
            team: body.team,
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
