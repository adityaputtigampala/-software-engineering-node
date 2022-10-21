import User from "./User";

export default class Follow {
    private follower: string;
    private followed: string;
 
 
    constructor(follower: string, followed: string) {
            this.follower = follower;
            this.followed = followed;
    }
    get getuserFollowed() {
        return this.follower;
    }
    set setuserFollowed(value: string) {
        this.follower = value;
    }

    get getuserFollowing() {
        return this.followed;
    }
    set setuserFollowing(value: string) {
        this.followed = value;
    }
 }