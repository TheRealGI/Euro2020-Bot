class UserDto {
    Id;
    UserId;
    UserName;
    Score;
    ServerId;

    constructor (user) {
        this.Id = user.Id;
        this.UserId = user.UserId;
        this.UserName = user.UserName;
        this.Score = user.Score;
        this.ServerId = user.ServerId;
    }

}

module.exports = UserDto;