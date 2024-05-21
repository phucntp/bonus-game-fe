import { ServiceBase } from "./00.servicebase";

class UserService extends ServiceBase {
  async getAllUser(): Promise<any> {
    return this.get({
      endpoint: "",
    });
  }
}

export const userService = new UserService("user");
