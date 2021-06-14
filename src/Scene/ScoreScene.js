const topScores = (scores) => scores.sort((a, b) => {
  if (+a.score > +b.score) return -1;
  return 1;
});
export default topScores;