export class Comment{
  constructor(
    public comment: String,
    public idPost: String,
    public namePost: String,
    public datePublication: String,
    public admin: Boolean
  ){}
}
