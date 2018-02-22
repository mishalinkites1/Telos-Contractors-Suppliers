const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt   = require('bcrypt-nodejs');
//const connect = process.env.MONGODB_URI || "mongodb://localhost:27017/telos";

const connect = process.env.MONGODB_URI ||"mongodb://upwork:upwork@ds117625.mlab.com:17625/telos"
mongoose.connect(connect);

const Schema = mongoose.Schema;
//RESIDENT
const userSchema = new Schema({
    account: String,
    email: String,
    areaCode: String,
    password: String,
    imageUrl: String,
    chineseName: String,
    englishName: String,
    foundedIn: String,
    address: {},
    fax: String,
    tel: String,
    category: Array,
    website: String,
    contactPerson: String,
    nature: String,
    businessRegistry: String,
});
const residentSchema = new Schema({
    name: String,
    email: String,
    account: String,
    password: String,
    polls: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Polls'
        }
    ],
    surveys: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Survey'
        }
    ],
    estateName: String,
    unit: String,
    block: String,
    floor: String,
    nature: String,
    numberOfOwners: String,
    shares: String,
    hkid: Array,
    hkidImage: Array,
    signature: Array,
    chopImage: String,
    proxyAppointed: [
    { type: Schema.Types.ObjectId,
            ref: 'Meeting'}
            ], //ALL THE MEETINGS WHERE THEY APPOINT US AS THE PROXY.
    deviceToken: String,
    deviceType: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    registered: {type: Boolean , default: false},
    viewedNotice: [{ type: Schema.Types.ObjectId,
            ref: 'Notice'}]
});


//ESTATE
const estateSchema = new Schema({
    estateName: String,
    estateNameDisplay: String,
    estateNameChn: String,
    username: String,
    password: String,
    emailAddress: String,
    chairmanName: String,
    surveys: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Survey'
        }
    ],
    currentMeetings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meeting'
        }
    ],
    pastMeetings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meeting'
        }
    ],
    currentNotices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notice'
        }
    ],
    pastNotices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notice'
        }
    ],
    blockArray: []
});

const tenderSchema = new Schema({
    noticeTitle: String,
    projectCategory: String,
    description: String,
    image: String,
    effectiveUntil: String,
    postedOn: {type: Date , default: new Date()},
    
})


const User = mongoose.model('User', userSchema);
const Resident = mongoose.model('Resident', residentSchema);
const Estate = mongoose.model('Estate', estateSchema);
const Tender = mongoose.model('Tender', tenderSchema);

module.exports = {
  User,
  Resident,
  Estate,
  Tender
}


// residentSchema.pre('save', function(next){
 
//     var user = this;
//      var SALT_FACTOR = 5;

//      if(!user.isModified('password')){
//          return next();
//      }
 
//      bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
//          if(err){
//              return next(err);
//          }
 
//         bcrypt.hash(user.password, salt, null, function(err, hash){
 
//              if(err){
//                  return next(err);
//             }
 
//             user.password = hash;
//             next();
 
//          });
 
//     });
 
//  });
 
//  residentSchema.methods.comparePassword = function(passwordAttempt, cb){
 
//     bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
//          if(err){
//              return cb(err);
//          } else {
//              cb(null, isMatch);
//          }
//      });
 
//  }
