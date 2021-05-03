export interface IUser {
    _id: string,
    imgProfile: string,
    email: string,
    userName: string,
    password: string,
    name: string,
    lastname: string,
    lastLogin: Date,
    createAt: Date,
    files: string[],
    role: string
}