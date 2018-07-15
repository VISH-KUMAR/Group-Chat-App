export interface LoginResponse{
    // ? makes them optional
    result?:{
        email?:string;
        uid?:string;
    }
    error?:{
        code?:string;
        message?:string;
    }
}