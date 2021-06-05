const db = require('../knex');


function getUserByUserIdAndServerId (simpleUserDto) {
    return db.dbConnection("UserEntity").select("*")
    .where("UserId", simpleUserDto.UserId)
    .andWhere("ServerId", simpleUserDto.ServerId);
}

function addUser(userEntity) {
    return db.dbConnection("UserEntity").insert(userEntity);
}
module.exports = {getUserByUserIdAndServerId, addUser};

