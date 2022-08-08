export class Post{
    constructor(
      public _id: String,
      public title: String,
      public picture: String,
      public description: String,
      public datePublication: String,
      public dateUpdate: String,
      public author: String,
      public authorName: String,
      public comments: Boolean,
      public linkVideo: String,
      public review: String,
      public live: Boolean,
      public dateHoy: String
    ){}
  }
