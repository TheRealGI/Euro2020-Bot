class UserEntity {
    Id;
    UserId;
    ServerId;
    UserName;
    Score;

    constructor (user) {
        this.Id = user.Id ?? undefined
        this.UserId = user.UserId;
        this.UserName = user.UserName;
        this.ServerId = user.ServerId;
        this.Score = user.score ?? 0;
    }
}

module.exports = UserEntity;