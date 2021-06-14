const scoreBoard = (() => {
  const MyGameId = 'Zl4d7IVkemOTTVg2fUdz';
  const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${MyGameId}/scores/`;

  const postScores = async (name, scores) => {
    const result = await fetch(baseURL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        user: `${name}`,
        score: `${scores}`,
      }),
    });
    await result.json();
    return result;
  };

  const getScores = async () => {
    const data = await fetch(baseURL);
    const userScores = await data.json();
    return userScores;
  };
  return {
    postScores,
    getScores,
  };
});

export default scoreBoard();