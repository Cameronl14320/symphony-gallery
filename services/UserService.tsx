import {IUser} from "../data/IUser";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {firebaseAuth} from "../config/firebase";
import IAuthState from "../data/IAuthState";

const membershipErrors: Map<string, string> = new Map([
    ["auth/user-not-found", "Invalid email or password"],
    ["auth/email-already-in-use", "Invalid email, please try again"],
    ["", ""],
]);

export class UserService {

    private async createUser(userId: string, nickname: string, dateOfBirth: Date) : Promise<Response> {
        const body : IUser = {
            userId: userId,
            nickname: nickname,
            verified: false,
            dateOfBirth: dateOfBirth.toUTCString(),
            accountCreated: new Date().toUTCString()
        };

        return await fetch(`/api/user/${userId}`, { method: "POST", body: JSON.stringify(body) });
    }

    public async signInWithEmailAndPassword(email: string, password: string): Promise<IAuthState> {
        try {
           const authResult = await signInWithEmailAndPassword(firebaseAuth, email, password);

           if (!!authResult.user) {
               return {
                   success: true,
                   error: ""
               }
           }
           return {
               success: false,
               error: "Failed to login"
           }
        } catch (ex: any) {
            return {
                success: false,
                error: membershipErrors.get(ex.code) ?? ex.code
            }
        }
    }

    public async signUpUserWithEmailAndPassword(email: string, password: string, nickname: string, dateOfBirth: Date): Promise<IAuthState> {
        try {
            const user = await createUserWithEmailAndPassword(firebaseAuth, email, password);

            if (!user.user) {
                return {
                    success: false,
                    error: "Error when signing up"
                }
            }

            const create = await this.createUser(user.user.uid, nickname, dateOfBirth);

            if (!create.ok) {
                return {
                    success: false,
                    error: "Failed to create user, need to conciliate"
                }
            }

            return {
                success: true,
                error: ""
            }
        } catch (ex: any) {
            return {
                success: false,
                error: membershipErrors.get(ex.code) ?? ex.code
            }
        }
    }
}

export default UserService;
