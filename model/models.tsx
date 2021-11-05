export interface Props {
  route: PropsRoutes;
}

export interface PropsImages {
  style: any;
  uri: string;
}

export interface PropsRoutes {
  params: UserItem;
}

export interface UserItem {
  username: string;
  avatar_url: string;
}

export interface UserLoginItem {
  login: string;
  avatar_url: string;
}

export interface UserDetailObject {
  name: string;
  bio: string;
  location: string;
  email: string;
  blog: string;
  created_at: string;
  updated_at: string;
  following: number;
  followers: number;
  public_gists: number;
  public_repos: number;
}

export interface RepoItem {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks: number;
}

export interface GistItem {
  html_url: string;
  description: string;
  files: any;
  created_at: string;
  updated_at: string;
}
