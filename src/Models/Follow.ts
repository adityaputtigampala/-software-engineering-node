import User from "./User";

export default class Follow {
    private userFollowed: User;
    private userFollowing: User;
 
 
    constructor(userFollowed: User, userFollowing: User) {
            this.userFollowed = userFollowed;
            this.userFollowing = userFollowing;
    }
    get getuserFollowed() {
        return this.userFollowed;
    }
    set setuserFollowed(value: User) {
        this.userFollowed = value;
    }

    get getuserFollowing() {
        return this.userFollowing;
    }
    set setuserFollowing(value: User) {
        this.userFollowing = value;
    }
 }