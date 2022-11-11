import UserService from "../services/UserService";

const userService = new UserService();

export const useUserService = () => userService;
