import type { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserSignIn{
    email:string,
  password:string,
  confirmPassword:string
}
export interface UserLogIn{
    email:string,
  password:string
}

export interface FileEntry{
  file:OutputFileEntry[];
}

export interface Post{
  caption: string,
  photos: Photometa[],
  likes:number,
  userLikes:number,
  date:Date,
  userId:string|null;
}

export interface Photometa{
  cdnUrl: string,
  uuid: string
}