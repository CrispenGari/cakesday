import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthError = {
  __typename?: 'AuthError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ChangePasswordInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChangePasswordObjectType = {
  __typename?: 'ChangePasswordObjectType';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type ChangePasswordSettingInputType = {
  accessToken: Scalars['String'];
  currentPassword: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};

export type ChangePasswordSettingsObjectType = {
  __typename?: 'ChangePasswordSettingsObjectType';
  message: AuthError;
  success: Scalars['Boolean'];
};

export type CommonSettings = {
  __typename?: 'CommonSettings';
  createdAt: Scalars['String'];
  emailSubscriptions: Scalars['Boolean'];
  id: Scalars['Int'];
  theme: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FollowUserInputType = {
  accessToken: Scalars['String'];
  friendUsername: Scalars['String'];
};

export type FollowUserObjectType = {
  __typename?: 'FollowUserObjectType';
  message: AuthError;
  success: Scalars['Boolean'];
};

export type Follower = {
  __typename?: 'Follower';
  bannerURL?: Maybe<Scalars['String']>;
  bday: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  photoURL?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: User;
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type Following = {
  __typename?: 'Following';
  bannerURL?: Maybe<Scalars['String']>;
  bday: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  photoURL?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: User;
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type Friend = {
  __typename?: 'Friend';
  bannerURL?: Maybe<Scalars['String']>;
  bday: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  photoURL?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: User;
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type FriendSuggestionInputType = {
  accessToken: Scalars['String'];
};

export type FriendSuggestionObjectType = {
  __typename?: 'FriendSuggestionObjectType';
  error?: Maybe<AuthError>;
  suggestions: Array<User>;
};

export type ImAuthenticatedInputType = {
  refreshToken: Scalars['String'];
};

export type ImAuthenticatedObjectType = {
  __typename?: 'ImAuthenticatedObjectType';
  error: AuthError;
  imAuthenticated: Scalars['Boolean'];
};

export type InvalidateTokenInputType = {
  accessToken: Scalars['String'];
  currentPassword: Scalars['String'];
};

export type InvalidateTokenObjectType = {
  __typename?: 'InvalidateTokenObjectType';
  message: AuthError;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordObjectType;
  changePasswordSettings: ChangePasswordSettingsObjectType;
  followUser: FollowUserObjectType;
  imAuthenticated: ImAuthenticatedObjectType;
  invalidateToken: InvalidateTokenObjectType;
  resendVerificationCode: Scalars['Boolean'];
  sendForgotPasswordEmail: SendForgotPasswordEmailObjectType;
  signIn: SignInObjectType;
  signOut: Scalars['Boolean'];
  signUp: SignUpObjectType;
  unFollowUser: FollowUserObjectType;
  updateAvatarOrBanner: UpdateProfileObjectType;
  updateProfile: UpdateProfileObjectType;
  updateProfileSettings: UpdateProfileSettingsObjectType;
  verifyEmail: VerifyEmailObjectType;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInputType;
};


export type MutationChangePasswordSettingsArgs = {
  input: ChangePasswordSettingInputType;
};


export type MutationFollowUserArgs = {
  input: FollowUserInputType;
};


export type MutationImAuthenticatedArgs = {
  input: ImAuthenticatedInputType;
};


export type MutationInvalidateTokenArgs = {
  input: InvalidateTokenInputType;
};


export type MutationResendVerificationCodeArgs = {
  input: VerifyEmailInput;
};


export type MutationSendForgotPasswordEmailArgs = {
  input: SendForgotPasswordEmailInputType;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUnFollowUserArgs = {
  input: FollowUserInputType;
};


export type MutationUpdateAvatarOrBannerArgs = {
  input: ProfileInput;
};


export type MutationUpdateProfileArgs = {
  input: ProfileInput;
};


export type MutationUpdateProfileSettingsArgs = {
  input: UpdateProfileSettingInputType;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type NotificationsSettings = {
  __typename?: 'NotificationsSettings';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  onBirthDayWish: Scalars['Boolean'];
  onFriendBirthday: Scalars['Boolean'];
  onFriendProfileUpdate: Scalars['Boolean'];
  onNewFollowers: Scalars['Boolean'];
  onNewFriends: Scalars['Boolean'];
  onNewUserAccountCreation: Scalars['Boolean'];
  updatedAt: Scalars['String'];
};

export type PrivacySettings = {
  __typename?: 'PrivacySettings';
  createdAt: Scalars['String'];
  followersFollowings: Scalars['String'];
  id: Scalars['Int'];
  myBirthday: Scalars['String'];
  myProfile: Scalars['String'];
  sendBirthDayWishes: Scalars['String'];
  shareBirthDayCard: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  bannerURL?: Maybe<Scalars['String']>;
  bday: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  photoURL?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};

export type ProfileInput = {
  accessToken: Scalars['String'];
  avatar?: InputMaybe<Scalars['String']>;
  banner?: InputMaybe<Scalars['String']>;
  bday?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  me?: Maybe<User>;
  suggestions: FriendSuggestionObjectType;
  user?: Maybe<User>;
};


export type QuerySuggestionsArgs = {
  input: FriendSuggestionInputType;
};


export type QueryUserArgs = {
  input: UserInputType;
};

export type SendForgotPasswordEmailInputType = {
  email: Scalars['String'];
};

export type SendForgotPasswordEmailObjectType = {
  __typename?: 'SendForgotPasswordEmailObjectType';
  message?: Maybe<AuthError>;
  success: Scalars['Boolean'];
};

export type Settings = {
  __typename?: 'Settings';
  common?: Maybe<CommonSettings>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  notifications?: Maybe<NotificationsSettings>;
  privacy?: Maybe<PrivacySettings>;
  updatedAt: Scalars['String'];
};

export type SignInInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type SignInObjectType = {
  __typename?: 'SignInObjectType';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignUpObjectType = {
  __typename?: 'SignUpObjectType';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type UpdateProfileObjectType = {
  __typename?: 'UpdateProfileObjectType';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type UpdateProfileSettingInputType = {
  accessToken: Scalars['String'];
  bday?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileSettingsObjectType = {
  __typename?: 'UpdateProfileSettingsObjectType';
  message: AuthError;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Follower>>;
  followings?: Maybe<Array<Following>>;
  friends?: Maybe<Array<Friend>>;
  id: Scalars['Int'];
  isLoggedIn: Scalars['Boolean'];
  profile?: Maybe<Profile>;
  settings?: Maybe<Settings>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInputType = {
  id: Scalars['Int'];
};

export type VerifyEmailInput = {
  accessToken: Scalars['String'];
  verificationCode?: InputMaybe<Scalars['String']>;
};

export type VerifyEmailObjectType = {
  __typename?: 'VerifyEmailObjectType';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type CommonSettingsFragmentFragment = { __typename?: 'CommonSettings', id: number, theme: string, emailSubscriptions: boolean, createdAt: string };

export type FollowerFragmentFragment = { __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string };

export type FollowingFragmentFragment = { __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string };

export type FriendFragmentFragment = { __typename?: 'Friend', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string };

export type NotificationSettingsFragmentFragment = { __typename?: 'NotificationsSettings', id: number, onNewUserAccountCreation: boolean, onNewFriends: boolean, onFriendProfileUpdate: boolean, onFriendBirthday: boolean, onBirthDayWish: boolean, createdAt: string, updatedAt: string };

export type PrivacySettingsFragmentFragment = { __typename?: 'PrivacySettings', id: number, myProfile: string, myBirthday: string, sendBirthDayWishes: string, shareBirthDayCard: string, followersFollowings: string, createdAt: string, updatedAt: string };

export type ProfileFragmentFragment = { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string };

export type SettingsFragmentFragment = { __typename?: 'Settings', id: number, createdAt: string, updatedAt: string, common?: { __typename?: 'CommonSettings', id: number, theme: string, emailSubscriptions: boolean, createdAt: string } | null, privacy?: { __typename?: 'PrivacySettings', id: number, myProfile: string, myBirthday: string, sendBirthDayWishes: string, shareBirthDayCard: string, followersFollowings: string, createdAt: string, updatedAt: string } | null, notifications?: { __typename?: 'NotificationsSettings', id: number, onNewUserAccountCreation: boolean, onNewFriends: boolean, onFriendProfileUpdate: boolean, onFriendBirthday: boolean, onBirthDayWish: boolean, createdAt: string, updatedAt: string } | null };

export type UserFragmentFragment = { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, friends?: Array<{ __typename?: 'Friend', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, settings?: { __typename?: 'Settings', id: number, createdAt: string, updatedAt: string, common?: { __typename?: 'CommonSettings', id: number, theme: string, emailSubscriptions: boolean, createdAt: string } | null, privacy?: { __typename?: 'PrivacySettings', id: number, myProfile: string, myBirthday: string, sendBirthDayWishes: string, shareBirthDayCard: string, followersFollowings: string, createdAt: string, updatedAt: string } | null, notifications?: { __typename?: 'NotificationsSettings', id: number, onNewUserAccountCreation: boolean, onNewFriends: boolean, onFriendProfileUpdate: boolean, onFriendBirthday: boolean, onBirthDayWish: boolean, createdAt: string, updatedAt: string } | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInputType;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordObjectType', accessToken?: string | null, user?: { __typename?: 'User', id: number, username: string, isLoggedIn: boolean } | null, error?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type ChangePasswordSettingsMutationVariables = Exact<{
  input: ChangePasswordSettingInputType;
}>;


export type ChangePasswordSettingsMutation = { __typename?: 'Mutation', changePasswordSettings: { __typename?: 'ChangePasswordSettingsObjectType', success: boolean, message: { __typename?: 'AuthError', field: string, message: string } } };

export type FollowUserMutationVariables = Exact<{
  input: FollowUserInputType;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'FollowUserObjectType', success: boolean, message: { __typename?: 'AuthError', field: string, message: string } } };

export type ImAuthenticatedMutationVariables = Exact<{
  input: ImAuthenticatedInputType;
}>;


export type ImAuthenticatedMutation = { __typename?: 'Mutation', imAuthenticated: { __typename?: 'ImAuthenticatedObjectType', imAuthenticated: boolean, error: { __typename?: 'AuthError', field: string, message: string } } };

export type InvalidateTokensMutationVariables = Exact<{
  input: InvalidateTokenInputType;
}>;


export type InvalidateTokensMutation = { __typename?: 'Mutation', invalidateToken: { __typename?: 'InvalidateTokenObjectType', success: boolean, message: { __typename?: 'AuthError', message: string, field: string } } };

export type RequestChangePasswordEmailMutationVariables = Exact<{
  input: SendForgotPasswordEmailInputType;
}>;


export type RequestChangePasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail: { __typename?: 'SendForgotPasswordEmailObjectType', success: boolean, message?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type ResendVerificationCodeMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type ResendVerificationCodeMutation = { __typename?: 'Mutation', resendVerificationCode: boolean };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInObjectType', accessToken?: string | null, user?: { __typename?: 'User', id: number, username: string } | null, error?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpObjectType', accessToken?: string | null, user?: { __typename?: 'User', id: number, email: string, username: string } | null, error?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type UnFollowUserMutationVariables = Exact<{
  input: FollowUserInputType;
}>;


export type UnFollowUserMutation = { __typename?: 'Mutation', unFollowUser: { __typename?: 'FollowUserObjectType', success: boolean, message: { __typename?: 'AuthError', field: string, message: string } } };

export type UpdateProfileOrBannerMutationVariables = Exact<{
  input: ProfileInput;
}>;


export type UpdateProfileOrBannerMutation = { __typename?: 'Mutation', updateAvatarOrBanner: { __typename?: 'UpdateProfileObjectType', accessToken?: string | null, error?: { __typename?: 'AuthError', message: string, field: string } | null, user?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, profile?: { __typename?: 'Profile', id: number, username: string, email: string, bannerURL?: string | null, bday: string, verified?: boolean | null, bio?: string | null, photoURL?: string | null } | null } | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UpdateProfileObjectType', accessToken?: string | null, error?: { __typename?: 'AuthError', message: string, field: string } | null, user?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, profile?: { __typename?: 'Profile', id: number, username: string, email: string, bannerURL?: string | null, bday: string, verified?: boolean | null, bio?: string | null, photoURL?: string | null } | null } | null } };

export type UpdateProfileSettingsMutationVariables = Exact<{
  input: UpdateProfileSettingInputType;
}>;


export type UpdateProfileSettingsMutation = { __typename?: 'Mutation', updateProfileSettings: { __typename?: 'UpdateProfileSettingsObjectType', success: boolean, message: { __typename?: 'AuthError', field: string, message: string } } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailObjectType', accessToken?: string | null, user?: { __typename?: 'User', id: number, username: string, email: string, confirmed: boolean, isLoggedIn: boolean } | null, error?: { __typename?: 'AuthError', message: string, field: string } | null } };

export type FriendsSuggestionsQueryVariables = Exact<{
  input: FriendSuggestionInputType;
}>;


export type FriendsSuggestionsQuery = { __typename?: 'Query', suggestions: { __typename?: 'FriendSuggestionObjectType', suggestions: Array<{ __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, friends?: Array<{ __typename?: 'Friend', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, settings?: { __typename?: 'Settings', id: number, createdAt: string, updatedAt: string, common?: { __typename?: 'CommonSettings', id: number, theme: string, emailSubscriptions: boolean, createdAt: string } | null, privacy?: { __typename?: 'PrivacySettings', id: number, myProfile: string, myBirthday: string, sendBirthDayWishes: string, shareBirthDayCard: string, followersFollowings: string, createdAt: string, updatedAt: string } | null, notifications?: { __typename?: 'NotificationsSettings', id: number, onNewUserAccountCreation: boolean, onNewFriends: boolean, onFriendProfileUpdate: boolean, onFriendBirthday: boolean, onBirthDayWish: boolean, createdAt: string, updatedAt: string } | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null }>, error?: { __typename?: 'AuthError', message: string, field: string } | null } };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', helloWorld: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, friends?: Array<{ __typename?: 'Friend', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, settings?: { __typename?: 'Settings', id: number, createdAt: string, updatedAt: string, common?: { __typename?: 'CommonSettings', id: number, theme: string, emailSubscriptions: boolean, createdAt: string } | null, privacy?: { __typename?: 'PrivacySettings', id: number, myProfile: string, myBirthday: string, sendBirthDayWishes: string, shareBirthDayCard: string, followersFollowings: string, createdAt: string, updatedAt: string } | null, notifications?: { __typename?: 'NotificationsSettings', id: number, onNewUserAccountCreation: boolean, onNewFriends: boolean, onFriendProfileUpdate: boolean, onFriendBirthday: boolean, onBirthDayWish: boolean, createdAt: string, updatedAt: string } | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null } | null };

export type UserByIdQueryVariables = Exact<{
  input: UserInputType;
}>;


export type UserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, friends?: Array<{ __typename?: 'Friend', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, settings?: { __typename?: 'Settings', id: number, createdAt: string, updatedAt: string, common?: { __typename?: 'CommonSettings', id: number, theme: string, emailSubscriptions: boolean, createdAt: string } | null, privacy?: { __typename?: 'PrivacySettings', id: number, myProfile: string, myBirthday: string, sendBirthDayWishes: string, shareBirthDayCard: string, followersFollowings: string, createdAt: string, updatedAt: string } | null, notifications?: { __typename?: 'NotificationsSettings', id: number, onNewUserAccountCreation: boolean, onNewFriends: boolean, onFriendProfileUpdate: boolean, onFriendBirthday: boolean, onBirthDayWish: boolean, createdAt: string, updatedAt: string } | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null } | null };

export const FriendFragmentFragmentDoc = gql`
    fragment FriendFragment on Friend {
  id
  email
  username
  photoURL
  bannerURL
  bio
  bday
  verified
  gender
}
    `;
export const CommonSettingsFragmentFragmentDoc = gql`
    fragment CommonSettingsFragment on CommonSettings {
  id
  theme
  emailSubscriptions
  createdAt
}
    `;
export const PrivacySettingsFragmentFragmentDoc = gql`
    fragment PrivacySettingsFragment on PrivacySettings {
  id
  myProfile
  myBirthday
  sendBirthDayWishes
  shareBirthDayCard
  followersFollowings
  createdAt
  updatedAt
}
    `;
export const NotificationSettingsFragmentFragmentDoc = gql`
    fragment NotificationSettingsFragment on NotificationsSettings {
  id
  onNewUserAccountCreation
  onNewFriends
  onFriendProfileUpdate
  onFriendBirthday
  onBirthDayWish
  createdAt
  updatedAt
}
    `;
export const SettingsFragmentFragmentDoc = gql`
    fragment SettingsFragment on Settings {
  id
  createdAt
  updatedAt
  common {
    ...CommonSettingsFragment
  }
  privacy {
    ...PrivacySettingsFragment
  }
  notifications {
    ...NotificationSettingsFragment
  }
}
    ${CommonSettingsFragmentFragmentDoc}
${PrivacySettingsFragmentFragmentDoc}
${NotificationSettingsFragmentFragmentDoc}`;
export const ProfileFragmentFragmentDoc = gql`
    fragment ProfileFragment on Profile {
  id
  email
  username
  photoURL
  bannerURL
  bio
  bday
  verified
  gender
}
    `;
export const FollowerFragmentFragmentDoc = gql`
    fragment FollowerFragment on Follower {
  id
  email
  username
  photoURL
  bannerURL
  bio
  bday
  verified
  gender
}
    `;
export const FollowingFragmentFragmentDoc = gql`
    fragment FollowingFragment on Following {
  id
  email
  username
  photoURL
  bannerURL
  bio
  bday
  verified
  gender
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  username
  id
  email
  isLoggedIn
  confirmed
  createdAt
  updatedAt
  friends {
    ...FriendFragment
  }
  settings {
    ...SettingsFragment
  }
  profile {
    ...ProfileFragment
  }
  followers {
    ...FollowerFragment
  }
  followings {
    ...FollowingFragment
  }
}
    ${FriendFragmentFragmentDoc}
${SettingsFragmentFragmentDoc}
${ProfileFragmentFragmentDoc}
${FollowerFragmentFragmentDoc}
${FollowingFragmentFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInputType!) {
  changePassword(input: $input) {
    user {
      id
      username
      isLoggedIn
    }
    accessToken
    error {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangePasswordSettingsDocument = gql`
    mutation ChangePasswordSettings($input: ChangePasswordSettingInputType!) {
  changePasswordSettings(input: $input) {
    success
    message {
      field
      message
    }
  }
}
    `;
export type ChangePasswordSettingsMutationFn = Apollo.MutationFunction<ChangePasswordSettingsMutation, ChangePasswordSettingsMutationVariables>;

/**
 * __useChangePasswordSettingsMutation__
 *
 * To run a mutation, you first call `useChangePasswordSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordSettingsMutation, { data, loading, error }] = useChangePasswordSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordSettingsMutation, ChangePasswordSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordSettingsMutation, ChangePasswordSettingsMutationVariables>(ChangePasswordSettingsDocument, options);
      }
export type ChangePasswordSettingsMutationHookResult = ReturnType<typeof useChangePasswordSettingsMutation>;
export type ChangePasswordSettingsMutationResult = Apollo.MutationResult<ChangePasswordSettingsMutation>;
export type ChangePasswordSettingsMutationOptions = Apollo.BaseMutationOptions<ChangePasswordSettingsMutation, ChangePasswordSettingsMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($input: FollowUserInputType!) {
  followUser(input: $input) {
    success
    message {
      field
      message
    }
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const ImAuthenticatedDocument = gql`
    mutation ImAuthenticated($input: ImAuthenticatedInputType!) {
  imAuthenticated(input: $input) {
    imAuthenticated
    error {
      field
      message
    }
  }
}
    `;
export type ImAuthenticatedMutationFn = Apollo.MutationFunction<ImAuthenticatedMutation, ImAuthenticatedMutationVariables>;

/**
 * __useImAuthenticatedMutation__
 *
 * To run a mutation, you first call `useImAuthenticatedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImAuthenticatedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imAuthenticatedMutation, { data, loading, error }] = useImAuthenticatedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImAuthenticatedMutation(baseOptions?: Apollo.MutationHookOptions<ImAuthenticatedMutation, ImAuthenticatedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImAuthenticatedMutation, ImAuthenticatedMutationVariables>(ImAuthenticatedDocument, options);
      }
export type ImAuthenticatedMutationHookResult = ReturnType<typeof useImAuthenticatedMutation>;
export type ImAuthenticatedMutationResult = Apollo.MutationResult<ImAuthenticatedMutation>;
export type ImAuthenticatedMutationOptions = Apollo.BaseMutationOptions<ImAuthenticatedMutation, ImAuthenticatedMutationVariables>;
export const InvalidateTokensDocument = gql`
    mutation InvalidateTokens($input: InvalidateTokenInputType!) {
  invalidateToken(input: $input) {
    message {
      message
      field
    }
    success
  }
}
    `;
export type InvalidateTokensMutationFn = Apollo.MutationFunction<InvalidateTokensMutation, InvalidateTokensMutationVariables>;

/**
 * __useInvalidateTokensMutation__
 *
 * To run a mutation, you first call `useInvalidateTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvalidateTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invalidateTokensMutation, { data, loading, error }] = useInvalidateTokensMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvalidateTokensMutation(baseOptions?: Apollo.MutationHookOptions<InvalidateTokensMutation, InvalidateTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvalidateTokensMutation, InvalidateTokensMutationVariables>(InvalidateTokensDocument, options);
      }
export type InvalidateTokensMutationHookResult = ReturnType<typeof useInvalidateTokensMutation>;
export type InvalidateTokensMutationResult = Apollo.MutationResult<InvalidateTokensMutation>;
export type InvalidateTokensMutationOptions = Apollo.BaseMutationOptions<InvalidateTokensMutation, InvalidateTokensMutationVariables>;
export const RequestChangePasswordEmailDocument = gql`
    mutation RequestChangePasswordEmail($input: SendForgotPasswordEmailInputType!) {
  sendForgotPasswordEmail(input: $input) {
    message {
      field
      message
    }
    success
  }
}
    `;
export type RequestChangePasswordEmailMutationFn = Apollo.MutationFunction<RequestChangePasswordEmailMutation, RequestChangePasswordEmailMutationVariables>;

/**
 * __useRequestChangePasswordEmailMutation__
 *
 * To run a mutation, you first call `useRequestChangePasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestChangePasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestChangePasswordEmailMutation, { data, loading, error }] = useRequestChangePasswordEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestChangePasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<RequestChangePasswordEmailMutation, RequestChangePasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestChangePasswordEmailMutation, RequestChangePasswordEmailMutationVariables>(RequestChangePasswordEmailDocument, options);
      }
export type RequestChangePasswordEmailMutationHookResult = ReturnType<typeof useRequestChangePasswordEmailMutation>;
export type RequestChangePasswordEmailMutationResult = Apollo.MutationResult<RequestChangePasswordEmailMutation>;
export type RequestChangePasswordEmailMutationOptions = Apollo.BaseMutationOptions<RequestChangePasswordEmailMutation, RequestChangePasswordEmailMutationVariables>;
export const ResendVerificationCodeDocument = gql`
    mutation ResendVerificationCode($input: VerifyEmailInput!) {
  resendVerificationCode(input: $input)
}
    `;
export type ResendVerificationCodeMutationFn = Apollo.MutationFunction<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>;

/**
 * __useResendVerificationCodeMutation__
 *
 * To run a mutation, you first call `useResendVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationCodeMutation, { data, loading, error }] = useResendVerificationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResendVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>(ResendVerificationCodeDocument, options);
      }
export type ResendVerificationCodeMutationHookResult = ReturnType<typeof useResendVerificationCodeMutation>;
export type ResendVerificationCodeMutationResult = Apollo.MutationResult<ResendVerificationCodeMutation>;
export type ResendVerificationCodeMutationOptions = Apollo.BaseMutationOptions<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    user {
      id
      username
    }
    accessToken
    error {
      field
      message
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    accessToken
    user {
      id
      email
      username
    }
    error {
      field
      message
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UnFollowUserDocument = gql`
    mutation UnFollowUser($input: FollowUserInputType!) {
  unFollowUser(input: $input) {
    success
    message {
      field
      message
    }
  }
}
    `;
export type UnFollowUserMutationFn = Apollo.MutationFunction<UnFollowUserMutation, UnFollowUserMutationVariables>;

/**
 * __useUnFollowUserMutation__
 *
 * To run a mutation, you first call `useUnFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowUserMutation, { data, loading, error }] = useUnFollowUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowUserMutation, UnFollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowUserMutation, UnFollowUserMutationVariables>(UnFollowUserDocument, options);
      }
export type UnFollowUserMutationHookResult = ReturnType<typeof useUnFollowUserMutation>;
export type UnFollowUserMutationResult = Apollo.MutationResult<UnFollowUserMutation>;
export type UnFollowUserMutationOptions = Apollo.BaseMutationOptions<UnFollowUserMutation, UnFollowUserMutationVariables>;
export const UpdateProfileOrBannerDocument = gql`
    mutation UpdateProfileOrBanner($input: ProfileInput!) {
  updateAvatarOrBanner(input: $input) {
    error {
      message
      field
    }
    accessToken
    user {
      username
      id
      email
      isLoggedIn
      confirmed
      profile {
        id
        username
        email
        bannerURL
        bday
        verified
        bio
        photoURL
        verified
      }
    }
  }
}
    `;
export type UpdateProfileOrBannerMutationFn = Apollo.MutationFunction<UpdateProfileOrBannerMutation, UpdateProfileOrBannerMutationVariables>;

/**
 * __useUpdateProfileOrBannerMutation__
 *
 * To run a mutation, you first call `useUpdateProfileOrBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileOrBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileOrBannerMutation, { data, loading, error }] = useUpdateProfileOrBannerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileOrBannerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileOrBannerMutation, UpdateProfileOrBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileOrBannerMutation, UpdateProfileOrBannerMutationVariables>(UpdateProfileOrBannerDocument, options);
      }
export type UpdateProfileOrBannerMutationHookResult = ReturnType<typeof useUpdateProfileOrBannerMutation>;
export type UpdateProfileOrBannerMutationResult = Apollo.MutationResult<UpdateProfileOrBannerMutation>;
export type UpdateProfileOrBannerMutationOptions = Apollo.BaseMutationOptions<UpdateProfileOrBannerMutation, UpdateProfileOrBannerMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: ProfileInput!) {
  updateProfile(input: $input) {
    error {
      message
      field
    }
    accessToken
    user {
      username
      id
      email
      isLoggedIn
      confirmed
      profile {
        id
        username
        email
        bannerURL
        bday
        verified
        bio
        photoURL
        verified
      }
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateProfileSettingsDocument = gql`
    mutation UpdateProfileSettings($input: UpdateProfileSettingInputType!) {
  updateProfileSettings(input: $input) {
    success
    message {
      field
      message
    }
  }
}
    `;
export type UpdateProfileSettingsMutationFn = Apollo.MutationFunction<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>;

/**
 * __useUpdateProfileSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateProfileSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileSettingsMutation, { data, loading, error }] = useUpdateProfileSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>(UpdateProfileSettingsDocument, options);
      }
export type UpdateProfileSettingsMutationHookResult = ReturnType<typeof useUpdateProfileSettingsMutation>;
export type UpdateProfileSettingsMutationResult = Apollo.MutationResult<UpdateProfileSettingsMutation>;
export type UpdateProfileSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    user {
      id
      username
      email
      confirmed
      isLoggedIn
    }
    accessToken
    error {
      message
      field
    }
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const FriendsSuggestionsDocument = gql`
    query FriendsSuggestions($input: FriendSuggestionInputType!) {
  suggestions(input: $input) {
    suggestions {
      ...UserFragment
    }
    error {
      message
      field
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useFriendsSuggestionsQuery__
 *
 * To run a query within a React component, call `useFriendsSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsSuggestionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFriendsSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<FriendsSuggestionsQuery, FriendsSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsSuggestionsQuery, FriendsSuggestionsQueryVariables>(FriendsSuggestionsDocument, options);
      }
export function useFriendsSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsSuggestionsQuery, FriendsSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsSuggestionsQuery, FriendsSuggestionsQueryVariables>(FriendsSuggestionsDocument, options);
        }
export type FriendsSuggestionsQueryHookResult = ReturnType<typeof useFriendsSuggestionsQuery>;
export type FriendsSuggestionsLazyQueryHookResult = ReturnType<typeof useFriendsSuggestionsLazyQuery>;
export type FriendsSuggestionsQueryResult = Apollo.QueryResult<FriendsSuggestionsQuery, FriendsSuggestionsQueryVariables>;
export const HelloWorldDocument = gql`
    query HelloWorld {
  helloWorld
}
    `;

/**
 * __useHelloWorldQuery__
 *
 * To run a query within a React component, call `useHelloWorldQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloWorldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloWorldQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloWorldQuery(baseOptions?: Apollo.QueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, options);
      }
export function useHelloWorldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, options);
        }
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldLazyQueryHookResult = ReturnType<typeof useHelloWorldLazyQuery>;
export type HelloWorldQueryResult = Apollo.QueryResult<HelloWorldQuery, HelloWorldQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($input: UserInputType!) {
  user(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    