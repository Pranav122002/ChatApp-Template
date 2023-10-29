import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link to="/personal-chat">
        <button role="button">Personal Chats</button>
      </Link>
      <Link to="/community-chat">
        <button role="button">Community Chats</button>
      </Link>
    </>
  );
}
