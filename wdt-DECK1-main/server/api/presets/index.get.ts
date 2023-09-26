import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
  
    const LocationModel = mongoose.model('Location');
    const AssetModel = mongoose.model('Asset');

    const locations = await LocationModel.find();
    const assets = await AssetModel.find();

    return await { locations, assets };
});