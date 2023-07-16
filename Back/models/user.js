const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator'); /*Package permettant de valider l'unicité d'une clé via l'option "unique"*/
const validator = require('validator'); /* Package permetant de valider certains champs comme la conformité du format de l'email via l'option validate*/

const userSchema = mongoose.Schema(
    {email: {type: "string", required: true, unique: true, validate: {
        validator: validator.isEmail,
        message: 'Adresse email invalide'
    } },
    password: {type: "string", required: true}}
)

userSchema.plugin(mongooseUniqueValidator); /*Application du plugin mongoose-unique-validator au schema*/

module.exports = mongoose.model('user', userSchema);