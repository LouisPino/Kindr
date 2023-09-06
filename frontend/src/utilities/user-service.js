import * as userAPI from "./user-api";

export async function createUser(userData) {
    try {
      const data = await userAPI.create(userData);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }