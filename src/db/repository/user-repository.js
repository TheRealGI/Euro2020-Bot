const db = require('../knex');


function getUserByUserIdAndServerId(simpleUserDto) {
    return db.dbConnection("UserEntity").select("*")
    .where("UserId", simpleUserDto.UserId)
    .andWhere("ServerId", simpleUserDto.ServerId);
}

function addUser(userEntity) {
    return db.dbConnection("UserEntity").insert(userEntity);
}

function updateScoreById(id, score)
{
    return db.dbConnection("UserEntity").where("Id", id).increment( "Score", score).then( () => {
        return true;
    }).catch(() => {
        return false;
    });
}

function getUsersByServerId(serverId) {
    return db.dbConnection("UserEntity").select("UserName", "Score").where("ServerId", serverId).orderBy("Score", "desc").limit(10);
}
module.exports = {getUserByUserIdAndServerId, addUser, updateScoreById, getUsersByServerId};

