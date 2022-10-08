import User from "../Models/User";

export default class Tuit {
   public id: string;
   public tuit: string;
   public postedOn: Date;
   public postedBy: User | null;

   constructor(id: string, tuit: string, postedOn: Date, postedBy: any) {
           this.id = id;
           this.tuit = tuit;
           this.postedOn = postedOn;
           this.postedBy = postedBy;
   }

   public get getTuit(): string {
        return this.tuit;
   }

   public set setTuit(tuit: string) {
        this.tuit = tuit;
   }

   public get getPostedOn(): Date {
        return this.postedOn;
   }

   public set setPostedOn(postedOn: Date) {
        this.postedOn;
   }

   public get getAuthor(): User | null {
        return this.postedBy;
   }

   public set setAuthor(user: User | null) {
        this.postedBy = user;
   }

}
