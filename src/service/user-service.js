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

module.exports = {addUserIfNotExists};