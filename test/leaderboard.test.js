import fetchMock from 'jest-fetch-mock';
import { getScores, postScores } from '../src/API/Scores';

describe('mocking fetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('it gets user scores', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'Elisha', score: 100 }));

    getScores().then((res) => {
      expect(res[0].data).toEqual('Elisha');
    });
  });

  const success = postScores({ user: 'elisha', score: 100 });
  test('Test if return status', () => success.then((res) => {
    expect(res === 'ok').not.toBeTruthy();
  }));
});