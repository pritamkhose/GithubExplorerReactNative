import HttpClient from './HttpClient';

//  https://api.github.com/search/users?q=pritamkhose&page=1
function getUserSearch(username, page_no) {
  return HttpClient({
    url: `search/users?q=${username}&page=${page_no}`,
    method: 'GET',
  });
}

//  https://api.github.com/search/repositories?q=topic:android
// eslint-disable-next-line no-unused-vars
function getUserSearchDefault(query) {
  return HttpClient({
    url: `search/repositories?q=topic:${query}`,
    method: 'GET',
  });
}

//  https://api.github.com/users/pritamkhose
function getUserDetails(username) {
  return HttpClient({
    url: `users/${username}`,
    method: 'GET',
  });
}

// https://api.github.com/users/pritamkhose/repos?sort=updated&per_page=100
function getUserRepos(username) {
  // , sort, per_page, page
  return HttpClient({
    url: `users/${username}/repos?sort=updated&per_page=${100}`,
    method: 'GET',
  });
}

//  https://api.github.com/users/pritamkhose/followers
function getUserFollowers(username) {
  return HttpClient({
    url: `users/${username}/followers?per_page=100`,
    method: 'GET',
  });
}

//  https://api.github.com/users/pritamkhose/following
function getUserFollowing(username) {
  return HttpClient({
    url: `users/${username}/following?per_page=100`,
    method: 'GET',
  });
}

//  https://api.github.com/users/pritamkhose/gists
function getUserGist(username) {
  return HttpClient({
    url: `users/${username}/gists?per_page=100&sort=updated`,
    method: 'GET',
  });
}

export default {
  getUserSearch,
  getUserDetails,
  getUserRepos,
  getUserFollowers,
  getUserFollowing,
  getUserGist,
};
