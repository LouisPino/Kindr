import * as userAPI from "./user-api";

export async function createUser(userData) {
    try {
      const data = await userAPI.create(userData);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  
  export async function findUserByEmail(userEmail) {
    try {
      const data = await userAPI.findUserByEmail(userEmail);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  
  export async function updateUser(formData) {
    console.log(formData)
    try {
      const data = await userAPI.updateUser(formData);
      console.log(data)
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  export async function findChallengesById(challengeIds) {
    console.log('challengeIds', challengeIds)
    try {
      const data = await userAPI.findChallengesById(challengeIds);
      console.log(data)
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }