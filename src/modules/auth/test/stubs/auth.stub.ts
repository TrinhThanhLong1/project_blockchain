import { LoginDto } from "../../dto/auth.login.dto";

export const authStub = (): LoginDto => {
    return {
        username: "Long",
        password: "123"
    }
}