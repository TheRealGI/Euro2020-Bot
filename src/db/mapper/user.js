const UserEntity = require('../entity/UserEntity');
const UserSimpleDto = require('../dto/UserSimpleDto');
const UserDto = require('../dto/UserDto');

const MapDtoToEntity = function (user) {
    return new UserEntity(user);
}

const MapToSimpleDto = function (user) {
    return new UserSimpleDto(user);
}

const MapEntityToDto = function (user) {
    return new UserDto(user)
}
module.exports = { MapDtoToEntity, MapToSimpleDto, MapEntityToDto };