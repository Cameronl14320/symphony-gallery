import {IUser} from "../data/IUser";

export class UserService {

    public async createUser(userId: string, nickname: string) : Promise<Response> {
        const body : IUser = {
            userId: userId,
            nickname: nickname
        };

        return await fetch(`/api/user/${userId}`, { method: "POST", body: JSON.stringify(body) });
    }
}

export default UserService;
