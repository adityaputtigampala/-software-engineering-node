import Tuit from "./Tuit";
export default class Tuit2topic {
    private topic: string;
    private tuit: Tuit | null = null;
 
 
    constructor(topic: string, tuit: Tuit | null) {
            this.topic = topic;
            this.tuit = tuit;
    }
    get getTopic() {
        return this.topic;
    }
    set setTopic(value: string) {
        this.topic = value;
    }

    get getTuit() {
        return this.tuit;
    }
    set setTuit(value: Tuit | null) {
        this.tuit = value;
    }
 }