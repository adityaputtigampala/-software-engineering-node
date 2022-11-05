import User from "./User";

export default class Follow {
    public follower: User;
    public followed: User;
 
 
    constructor(follower: User, followed: User) {
            this.follower = follower;
            this.followed = followed;
    }
    get getuserFollowed() {
        return this.follower;
    }
    set setuserFollowed(value: User) {
        this.follower = value;
    }

    get getuserFollowing() {
        return this.followed;
    }
    set setuserFollowing(value: User) {
        this.followed = value;
    }
 }