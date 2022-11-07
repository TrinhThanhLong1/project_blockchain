import { authStub } from "../test/stubs/auth.stub";
import { userStub } from "../test/stubs/user.stub";

export const AuthService = jest.fn().mockReturnValue({
    createUser: jest.fn().mockRejectedValue(userStub),
    login: jest.fn().mockRejectedValue(authStub)
})