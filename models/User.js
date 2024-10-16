import mongoose, {Schema} from "mongoose";


// "firstName" : "",
// "lastName" : "",
// "email" : "",
// "password" :"" ,
// "roles" : ""

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required : true
        },
        lastName:{
            type: String,
            required : true
        },
        email: {
            type: String,
            required : true
        },
        password: {
            type: String,
            required : true
        },
        profileImage: {
            type: String,
            required: false,
            default: ""
        },
        favorites: [
            {
                type: String
            }
        ],
        isActive:{
            type:Boolean,
            default:false
        },
        isAdmin :{
            type: Boolean,
            default: false
        },
        // Foriegn connection to Roles table
        roles:{
            type: [Schema.Types.ObjectId],
            required: true,
            ref:"Role"
        },
        verificationToken: {
            type: String,
            required: false,
        }
    
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);