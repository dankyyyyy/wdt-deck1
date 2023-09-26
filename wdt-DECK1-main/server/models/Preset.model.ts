import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  
    //name of the preset
    name: {
    type: String,
    required: true
  },

    //location object
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    //asset objects
    assets: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
        }
    ]
    });

export default mongoose.model('Preset', schema);
