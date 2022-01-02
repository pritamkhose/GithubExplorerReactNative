import * as axios from 'axios';

test('axios good response', () => {
  axios.get.mockImplementation(() => Promise.resolve({data: {}}));
  axios.post.mockImplementation(() => Promise.resolve({data: {}}));
  axios.get.mockImplementation(() => Promise.resolve({data: {}}));
  axios.delete.mockImplementation(() => Promise.resolve({data: {}}));
});

test('axios bad response', () => {
  axios.get.mockImplementation(() => Promise.reject({}));
  axios.post.mockImplementation(() => Promise.reject({}));
  axios.put.mockImplementation(() => Promise.reject({}));
  axios.delete.mockImplementation(() => Promise.reject({}));
});
