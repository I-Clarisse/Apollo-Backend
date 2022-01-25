const {Schema,Model} = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

let NotificationSchema = new Schema({
    NotificationId:{
        type:String,
        required
    },
    NotificationMessage:{
        type:String,
        required
    },
    NotificationTo:{
        type:String,
        required
    }
},
{timestamps:true});

module.exports.Notification = new Model('Notification',NotificationSchema);

