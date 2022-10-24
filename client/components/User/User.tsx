import React from "react";
import styles from "./User.module.css";
import { Box, Image, Badge, Button, Avatar } from "@chakra-ui/react";

interface Props {}
const User: React.FC<Props> = ({}) => {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  return (
    <div className={styles.user}>
      <div className={styles.user__banner}>
        <Badge borderRadius="full" px="2" className={styles.user__badge}>
          New
        </Badge>
        <Avatar
          className={styles.user__avatar}
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </div>
      <h1>@username</h1>
      <h2>
        23 <span>years</span>
      </h2>
      <p>Birthday 24 October &bull; male</p>
      <div className={styles.user__buttons}>
        <Button>Add</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
};

export default User;
