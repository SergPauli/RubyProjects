import axios from "axios"

export class AuthService {
  login(username, password) {
    return axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => response.data)
      .catch((error) => {throw error }) 
          
  }
  logout(token) {
    return axios
      .get("/auth/logout", { Authorization: token })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

