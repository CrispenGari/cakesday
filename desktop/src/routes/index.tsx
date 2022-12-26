import React, { useEffect, useState } from "react";
import {
  Routes as R,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { Loading } from "../components";
import { ImAuthenticatedDocument } from "../graphql/generated/graphql";
import { Home, NotFound } from "../pages/app";
import {
  ConfirmEmail,
  ForgotPassoword,
  MoreInfo,
  NewPassword,
  Profile,
  SignIn,
  SignUp,
} from "../pages/auth";
import { Welcome } from "../pages/common";
import { client } from "../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
interface Props {}
const Routes: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [imAuthenticated, setImAuthenticated] = useState(false);
  useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        setLoading(true);
        const { data } = await client.mutate({
          mutation: ImAuthenticatedDocument,
          variables: {
            input: {
              refreshToken: "", // get it from cookies
            },
          },
        });

        if (data?.imAuthenticated?.imAuthenticated === true) {
          setImAuthenticated(true);
          setLoading(false);
        } else {
          setImAuthenticated(false);
          setLoading(false);
        }
      })();
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      {imAuthenticated ? (
        <R>
          <Route
            path="/"
            caseSensitive
            element={<Navigate to="/auth/welcome" replace />}
          />
          <Route path="/home" caseSensitive element={<Home />} />
          <Route path="*" element={<NotFound />} caseSensitive />
        </R>
      ) : (
        <R>
          <Route
            path="/"
            caseSensitive
            element={<Navigate to="/auth/welcome" replace />}
          />
          <Route path="/auth/welcome" caseSensitive element={<Welcome />} />
          <Route path="/auth/signin" element={<SignIn />} caseSensitive />
          <Route path="/auth/signup" element={<SignUp />} caseSensitive />
          <Route
            path="/auth/confirm-email"
            element={<ConfirmEmail />}
            caseSensitive
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPassoword />}
            caseSensitive
          />
          <Route path="/auth/profile" element={<Profile />} caseSensitive />
          <Route path="/auth/more-info" element={<MoreInfo />} caseSensitive />
          <Route
            path="/auth/new-password"
            element={<NewPassword />}
            caseSensitive
          />
          <Route path="*" element={<NotFound />} caseSensitive />
        </R>
      )}
    </Router>
  );
};

export default Routes;
