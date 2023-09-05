import * as challengeAPI from "./challenge-api";

export async function createUser(userData) {
    try {
      const data = await challengeAPI.create(challengeData);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }