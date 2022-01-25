const {Schema , Model} = require('mongoose');

let StorySchema = new Schema({

    StoryId:{
        Type:String,
    },
    StorySong:{
        Type:String
    },
    StoryOwner:{
        Type:String
    }
},
{timestamps:true});

module.exports.Story = new Model('Story',StorySchema);

