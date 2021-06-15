import { getScores } from '../src/API/Scores';

const fetch = require('node-fetch');

const fetchMock = fetch;

beforeEach(() => {
  fetchMock.resetMocks();
});

it('Return score', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    result: [
      {
        user: 'John Doe',
        score: 42,
      }],
  }));
  const res = await getScores();
  expect(res.result[0].score).toEqual(42);
  expect(fetch.mock.calls.length).toEqual(1);
});
