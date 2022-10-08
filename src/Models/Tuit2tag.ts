import Tuit from "./Tuit";
export default class Tuit2tag {
    private tag: string;
    private tuit: Tuit | null = null;
 
 
    constructor(tag: string, tuit: Tuit | null) {
            this.tag = tag;
            this.tuit = tuit;
    }
    get getTag() {
        return this.tag;
    }
    set setTag(value: string) {
        this.tag = value;
    }

    get getTuit() {
        return this.tuit;
    }
    set setTuit(value: Tuit | null) {
        this.tuit = value;
    }
 }