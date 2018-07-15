//we don't have to do this   within our application we could just simply 
//create an array but doing like this allow us to more type and taking advantage of typerscript
export interface UserProfile{
    firstName:string;
    lastName:string;
    avatar:string;
    userName:string;
    status?:string;
}