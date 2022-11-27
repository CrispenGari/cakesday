import { Modal, ModalContent } from "@chakra-ui/modal";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { MdPersonSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  SearchUserDocument,
  useMeQuery,
} from "../../graphql/generated/graphql";
import { client } from "../../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
import { StateType } from "../../types";

import UserResult from "../UserResult/UserResult";
import styles from "./SearchUsersModal.module.css";
interface Props {
  onClose: () => void;
  isOpen: boolean;
}
const SearchUsersModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data: me } = useMeQuery();
  const theme = useSelector(({ theme }: StateType) => theme);
  const [results, setResults] = React.useState([]);
  const [searching, setSearching] = React.useState(false);
  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    const { data, loading } = await client.query({
      query: SearchUserDocument,
      variables: {
        input: {
          searchTerm,
        },
      },
    });
    setResults(data.search ?? []);
    setSearching(loading);
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && searchTerm.trim().length > 1) {
      (async () => {
        const { data, loading } = await client.query({
          query: SearchUserDocument,
          variables: {
            input: {
              searchTerm,
            },
          },
        });
        setResults(data.search ?? []);
        setSearching(loading);
      })();
    }

    if (searchTerm.trim().length <= 1) {
      setResults([]);
    }
    return () => {
      mounted = false;
    };
  }, [searchTerm]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        className={
          theme === "dark"
            ? styles.search__user__modal__content__dark
            : styles.search__user__modal__content
        }
      >
        <form onSubmit={search}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdPersonSearch color={theme === "dark" ? "white" : "gray"} />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="search user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </form>
        <div className={styles.search__user__modal__content__container}>
          {searching ? (
            <div
              className={
                styles.search__user__modal__content__container__searching
              }
            >
              searching...
            </div>
          ) : results.length === 0 ? (
            <div
              className={
                styles.search__user__modal__content__container__no_users
              }
            >
              {searchTerm.length < 2
                ? `try at least 2 characters.`
                : `no matches for '${searchTerm}'.`}
            </div>
          ) : (
            results.map((user: any) => (
              <UserResult
                user={user}
                key={user.id}
                meUsername={me?.me?.username as any}
              />
            ))
          )}
        </div>

        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default SearchUsersModal;
