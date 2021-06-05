class UserSimpleDto {
    UserId;
    ServerId;
    UserName;

    constructor (user) {
        this.UserId = user.UserId;
        this.UserName = user.UserName;
        this.ServerId = user.ServerId;
    }
}

module.exports = UserSimpleDto;