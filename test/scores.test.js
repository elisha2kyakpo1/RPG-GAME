import topScores from '../src/GameScores/TopScores';

describe('topScores', () => {
  it('returns scores in descending order by score', () => {
    const scores = [
      {
        user: 'user1',
        score: '100',
      },
      {
        user: 'user2',
        score: '150',
      },
      {
        user: 'user3',
        score: '99',
      },
      {
        user: 'myplayer',
        score: '101',
      },
    ];
    const sortedScore = [
      { user: 'user2', score: '150' },
      { user: 'myplayer', score: '101' },
      { user: 'user1', score: '100' },
      { user: 'user3', score: '99' },
    ];
    expect(topScores(scores)).toStrictEqual(sortedScore);
  });
  it('does not return same array', () => {
    const scores = [
      {
        user: 'user1',
        score: '100',
      },
      {
        user: 'user2',
        score: '150',
      },
      {
        user: 'user3',
        score: '99',
      },
      {
        user: 'myplayer',
        score: '101',
      },
    ];
    expect(topScores([...scores])).not.toStrictEqual(scores);
  });
});