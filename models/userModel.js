const { Schema, default: mongoose } = require('mongoose');


const UserSchema = new Schema({
    moveInDate: String,
    firstName1: String,
    lastName1: String,
    birthDate1: String,
    driversLic1: String,
    state1: String,
    cellPhone1: String,
    email1: String,
    firstName2: String,
    lastName2: String,
    birthDate2: String,
    driversLic2: String,
    state2: String,
    cellPhone2: String,
    email2: String,
    adults: String,
    children: String,
    minor1Name: String,
    minor1Age: String,
    pet1Type: String,
    pet1Breed: String,
    pet1Weight: String,
    pet2Type: String,
    pet2Breed: String,
    pet2Weight: String,
    pet3Type: String,
    pet3Breed: String,
    pet3Weight: String,
    emergencyName: String,
    emergencyAddress: String,
    emergencyPhone: String,
    currentAddress1: String,
    currentZip1: String,
    currentHowLong1: String,
    currentReason1: String,
    currentLandLord1: String,
    currentPhone1: String,
    currentEmail1: String,
    currentFax1: String,
    employer1: String,
    position1: String,
    employedHowLong1: String,
    income1: String,
    otherIncome: String,
    otherIncomeAmt: String,
    car1Make: String,
    car1Model: String,
    car1Year: String,
    car1Plate: String,
    car1State: String,
    stayDuration: String,
    depositPayment: String,
    receiveKeys: String,
    date: String,
    printedName1: String


})





module.exports = mongoose.model('User', UserSchema)