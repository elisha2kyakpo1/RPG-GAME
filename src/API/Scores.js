const MyGameId = 'Zl4d7IVkemOTTVg2fUdz';
const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${MyGameId}/scores/`;

const postScores = async (name, scores) => {
  const res = await fetch(baseURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      user: `${name}`,
      score: `${scores}`,
    }),
  });
  await res.json();
  return res;
};

const getScores = async () => {
  const data = await fetch(baseURL);
  const userScores = await data.json();
  return userScores;
};

export { postScores, getScores };