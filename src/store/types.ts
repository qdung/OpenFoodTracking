export interface IAuth {
  email: string
  name: string
  avatarUrl: string
  accessToken?: string
  loading: boolean
}

export interface IAppState {
  isSignIn: boolean
  user: IAuth
}
