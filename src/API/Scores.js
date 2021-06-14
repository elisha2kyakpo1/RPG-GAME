const scoreBoard = (() => {
  const MyGameId = 'Zl4d7IVkemOTTVg2fUdz';
  const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${MyGameId}/scores/`;

  const info = {};
  const postScores = () => {
    if (info.score > 0) {
      const data = info;
      fetch(baseURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      }).then((res) => {
        res.json();
      }).then((json) => json.result);
    }
  };
  const names = (name) => {
    info.user = name;
  };

  const scorer = (num) => {
    info.score = num;
  };
  const getScores = () => new Promise((resolve, reject) => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((json) => {
        resolve(json.result);
      }).catch((e) => {
        reject(e);
      });
  });
  return {
    postScores,
    getScores,
    names,
    scorer,
  };
});

export default scoreBoard();