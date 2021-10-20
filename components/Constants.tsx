const AppConstant = {
  BASE_URL: 'https://api.github.com/',
  APP_COLOR: '#2196F3',
  APP_NAME: 'Github Explorer React Native',
  REQUEST_HEADER: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  NAVIGATE_SCREEN: {
    Home: 'Home',
    UserDetails: 'UserDetails',
    Follower: 'FollowerScreen',
    Following: 'FollowingScreen',
    Repositories: 'RepositoriesScreen',
    PublicGist: 'PublicGistScreen'
  },
  TEXT: {
    GithubExplorer: 'Github Explorer',
    UserDetails: 'Github User Details',
    Follower: 'Follower',
    Following: 'Following',
    Repositories: 'Repositories',
    PublicGist: 'Public Gist'
  }
};

export default AppConstant;