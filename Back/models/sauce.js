const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema(
    {userId: { type: "string", required: true },
    name: { type: "string", required: true },
    manufacturer: { type: "string" },
    description: { type: "string" },
    mainPepper: { type: "string" },
    imageUrl: { type: "string" },
    heat: { type: "number" },
    likes: { type: "number" },
    dislikes: { type: "number" },
    usersLiked: { type: ["string"] },
    usersDisliked: { type: ["string"] }}
);

module.exports = mongoose.model('Sauces', sauceSchema);