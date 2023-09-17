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
            dailyAvailableTimePerTeam: body.dailyAvailableTimePerTeam,
            staffPerTeam: body.staffPerTeam,
            totalYearlyAvailableTime: body.totalYearlyAvailableTime,
            vesselSpeed: body.vesselSpeed,
            loiteringFuelConsumption: body.loiteringFuelConsumption,
            loitering: body.loitering,
            highEngineActivity: body.highEngineActivity,
            helicopterSpeed: body.helicopterSpeed,
            flightTime: body.flightTime,
            cloudbase: body.cloudbase,
            plannedMaintenance: body.plannedMaintenance,
            troubleshootVisits: body.troubleshootVisits,
            averageTsHours: body.averageTsHours,
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

    
