import CreateUserDto from 'src/modules/user/dto/user.create.dto'

export const userStub = (): CreateUserDto => {
    return {
        "username": "Long",
        "password": "123",
        "birthDay": "2020-01-01"
    }
}