const MyGameId = 'Zl4d7IVkemOTTVg2fUdz';
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const getScores = async (gameId = MyGameId) => {
  const gameScoresURL = `${baseURL}games/${gameId}/scores`;

  const data = await fetch(gameScoresURL);
  const userScores = await data.json();

  return userScores;
};
const postScore = async (userName, userScore, gameId = MyGameId) => {
  const gameScoresURL = `${baseURL}games/${gameId}/scores`;

  const res = await fetch(gameScoresURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),

  });

  await res.json();
  return res;
};

export { getScores, postScore };