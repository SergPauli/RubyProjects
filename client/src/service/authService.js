import BaseService from "./BaseService"
export class AuthService extends BaseService {
  login(username, password) {
    return this.instance
      .post("/auth/login", { username: username, password: password }, this.requestConfig)
      .then((response) => response.data)      
  }
  logout(token) {
    return this.instance.get("/auth/logout", this.requestConfig).then((response) => response.data)      
  }
}

