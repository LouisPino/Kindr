import * as challengeAPI from './challenge-api';

export async function createChallenge(challengeData) {
    try {
      const data = await challengeAPI.create(challengeData);
      return data;
    } catch (err) {
      console.log(err);
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