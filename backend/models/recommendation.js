const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const recommendationSchema = new mongoose.Schema({
    userFrom: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    serviceEmail: {
        type: String,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Vă rugăm să introduceți o adresă de email validă"
        ]
    },

    content: {
        type: String,
        trim: true,
        required: [true, "Vă rugăm să adăugați un text"],
        maxlength: 500
    },

    phone: {
        type: String,
        trim: true,
        match: [
            /^(\+)?([ 0-9]){10,14}$/,
            "Vă rugăm să introduceți un număr de telefon valid"
        ]
    },
    
}, {timestamps: true});

module.exports = mongoose.model("Recommendation", recommendationSchema);