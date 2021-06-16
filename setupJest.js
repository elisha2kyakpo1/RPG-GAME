import fetchMock from 'jest-fetch-mock';

global.fetch = require('jest-fetch-mock');
require('jest-fetch-mock').enableMocks();

fetchMock.enableMocks();