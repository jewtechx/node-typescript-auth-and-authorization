import UserModel, { User } from "../model/user.model";

export const createUser = (input:Partial<User>) => {
    return UserModel.create(input)
}

export const findUserById = (id : string) => {
    return UserModel.findById(id)
}

export const findUserByEmail = (email:string) => {
    return UserModel.findOne({email})
}