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

export type FriendSuggestionInputType = {
  accessToken: Scalars['String'];
};

export type FriendSuggestionObjectType = {
  __typename?: 'FriendSuggestionObjectType';
  error?: Maybe<AuthError>;
  suggestions: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordObjectType;
  followUser: FollowUserObjectType;
  resendVerificationCode: Scalars['Boolean'];
  sendForgotPasswordEmail: SendForgotPasswordEmailObjectType;
  signIn: SignInObjectType;
  signOut: Scalars['Boolean'];
  signUp: SignUpObjectType;
  updateAvatarOrBanner: UpdateProfileObjectType;
  updateProfile: UpdateProfileObjectType;
  verifyEmail: VerifyEmailObjectType;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInputType;
};


export type MutationFollowUserArgs = {
  input: FollowUserInputType;
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


export type MutationUpdateAvatarOrBannerArgs = {
  input: ProfileInput;
};


export type MutationUpdateProfileArgs = {
  input: ProfileInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
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
  cookie: Scalars['Boolean'];
  helloWorld: Scalars['String'];
  suggestions: FriendSuggestionObjectType;
  user?: Maybe<User>;
};


export type QueryCookieArgs = {
  cookie: Scalars['String'];
};


export type QuerySuggestionsArgs = {
  input: FriendSuggestionInputType;
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
  id: Scalars['Int'];
  theme?: Maybe<Scalars['String']>;
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

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Follower>>;
  followings?: Maybe<Array<Following>>;
  id: Scalars['Int'];
  isLoggedIn: Scalars['Boolean'];
  profile?: Maybe<Profile>;
  settings?: Maybe<Settings>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
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

export type FollowerFragmentFragment = { __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string };

export type FollowingFragmentFragment = { __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string };

export type ProfileFragmentFragment = { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string };

export type SettingFragmentFragment = { __typename?: 'Settings', id: number, theme?: string | null };

export type UserFragmentFragment = { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, settings?: { __typename?: 'Settings', id: number, theme?: string | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInputType;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordObjectType', accessToken?: string | null, user?: { __typename?: 'User', id: number, username: string, isLoggedIn: boolean } | null, error?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type RequestChangePasswordEmailMutationVariables = Exact<{
  input: SendForgotPasswordEmailInputType;
}>;


export type RequestChangePasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail: { __typename?: 'SendForgotPasswordEmailObjectType', success: boolean, message?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type ResendVerificatinCodeMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type ResendVerificatinCodeMutation = { __typename?: 'Mutation', resendVerificationCode: boolean };

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

export type UpdateProfileOrBannerMutationVariables = Exact<{
  input: ProfileInput;
}>;


export type UpdateProfileOrBannerMutation = { __typename?: 'Mutation', updateAvatarOrBanner: { __typename?: 'UpdateProfileObjectType', accessToken?: string | null, error?: { __typename?: 'AuthError', message: string, field: string } | null, user?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, profile?: { __typename?: 'Profile', id: number, username: string, email: string, bannerURL?: string | null, bday: string, verified?: boolean | null, bio?: string | null, photoURL?: string | null } | null } | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UpdateProfileObjectType', accessToken?: string | null, error?: { __typename?: 'AuthError', message: string, field: string } | null, user?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, profile?: { __typename?: 'Profile', id: number, username: string, email: string, bannerURL?: string | null, bday: string, verified?: boolean | null, bio?: string | null, photoURL?: string | null } | null } | null } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailObjectType', accessToken?: string | null, user?: { __typename?: 'User', id: number, username: string, email: string, confirmed: boolean, isLoggedIn: boolean } | null, error?: { __typename?: 'AuthError', message: string, field: string } | null } };

export type FriendsSuggestionsQueryVariables = Exact<{
  input: FriendSuggestionInputType;
}>;


export type FriendsSuggestionsQuery = { __typename?: 'Query', suggestions: { __typename?: 'FriendSuggestionObjectType', suggestions: Array<{ __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, settings?: { __typename?: 'Settings', id: number, theme?: string | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null }>, error?: { __typename?: 'AuthError', message: string, field: string } | null } };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', helloWorld: string };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', username: string, id: number, email: string, isLoggedIn: boolean, confirmed: boolean, createdAt: string, updatedAt: string, settings?: { __typename?: 'Settings', id: number, theme?: string | null } | null, profile?: { __typename?: 'Profile', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified?: boolean | null, gender: string } | null, followers?: Array<{ __typename?: 'Follower', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null, followings?: Array<{ __typename?: 'Following', id: number, email: string, username: string, photoURL?: string | null, bannerURL?: string | null, bio?: string | null, bday: string, verified: boolean, gender: string }> | null } | null };

export const SettingFragmentFragmentDoc = gql`
    fragment SettingFragment on Settings {
  id
  theme
}
    `;
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
  settings {
    ...SettingFragment
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
  settings {
    ...SettingFragment
  }
}
    ${SettingFragmentFragmentDoc}
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
export const ResendVerificatinCodeDocument = gql`
    mutation ResendVerificatinCode($input: VerifyEmailInput!) {
  resendVerificationCode(input: $input)
}
    `;
export type ResendVerificatinCodeMutationFn = Apollo.MutationFunction<ResendVerificatinCodeMutation, ResendVerificatinCodeMutationVariables>;

/**
 * __useResendVerificatinCodeMutation__
 *
 * To run a mutation, you first call `useResendVerificatinCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificatinCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificatinCodeMutation, { data, loading, error }] = useResendVerificatinCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResendVerificatinCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificatinCodeMutation, ResendVerificatinCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificatinCodeMutation, ResendVerificatinCodeMutationVariables>(ResendVerificatinCodeDocument, options);
      }
export type ResendVerificatinCodeMutationHookResult = ReturnType<typeof useResendVerificatinCodeMutation>;
export type ResendVerificatinCodeMutationResult = Apollo.MutationResult<ResendVerificatinCodeMutation>;
export type ResendVerificatinCodeMutationOptions = Apollo.BaseMutationOptions<ResendVerificatinCodeMutation, ResendVerificatinCodeMutationVariables>;
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
export const UserDocument = gql`
    query User {
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;