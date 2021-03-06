const userRepository = require('../db/repository/user-repository');
const mapper = require('../db/mapper/user');

const addUserIfNotExists = async function(simpleUserDto) {
    var user = await userRepository.getUserByUserIdAndServerId(simpleUserDto)
    if(!user || user.length < 1){
        let userEntity = mapper.MapDtoToEntity(simpleUserDto);
        user = await userRepository.addUser(userEntity);
    }

    return mapper.MapEntityToDto(user[0]); 
}

const getIdByUserId = async function (message) {
    let simpleDto = {UserId: message.author.id, ServerId:  message.guild.id, UserName: message.author.username};
    await addUserIfNotExists(simpleDto);
    return userRepository.getUserByUserIdAndServerId(simpleDto).then( result => result[0]);
} 

const updateScoreById= async function (id, score) { 
    return userRepository.updateScoreById(id, score);
} 

const getTipRankingsByServer = async function(serverId){
    return userRepository.getUsersByServerId(serverId);
}

const getUserById = async function (userDto) {
    return await userRepository.getUserByUserIdAndServerId({UserId: userDto.userId, ServerId: userDto.serverId});
}

module.exports = {addUserIfNotExists, getIdByUserId, updateScoreById, getTipRankingsByServer, getUserById};