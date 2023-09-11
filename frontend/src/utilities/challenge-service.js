import * as challengeAPI from './challenge-api';

export async function createChallenge(challengeData) {
    try {
      const data = await challengeAPI.create(challengeData);
      return data;
    } catch (err) {
      return err;
    }
  }

  export async function getChallenges(){
    try {
        const data = await challengeAPI.index()
        return data
    }catch(err){
        return err
    }
}

export async function createDailyChallenge(){
  try {
      const data = await challengeAPI.createDailyChallenge()
      return data
  }catch(err){
      return err
  }
}

export async function findChallengesByIds(array){
  try {
      const data = await challengeAPI.findChallengesByIds(array)
      return data
  }catch(err){
      return err
  }
}

export async function updateChallenge(formData) {
  try {
    const data = await challengeAPI.updateChallenge(formData);
    return data;
  } catch (err) {
    return err;
  }
}