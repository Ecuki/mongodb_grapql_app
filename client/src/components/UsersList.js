import React from "react";
import { Link } from "react-router-dom";

import { List, Image } from "semantic-ui-react";

import imgProfile from "../assets/no_image.png";

export default function UsersList({ users }) {
  console.log(users);
  return (
    <List>
      <List.Header as="h2">User List</List.Header>
      {users.map(user => (
        <>
          <List.Item>
            <Image avatar src={imgProfile} />
            <List.Content>
              <List.Header as={Link} to={`/user/${user.id}`}>
                {user.username}
              </List.Header>
            </List.Content>
          </List.Item>
        </>
      ))}
    </List>
  );
}
