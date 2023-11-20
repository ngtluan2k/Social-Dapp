import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Friend.module.css";
import images from "../../assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";
import { ChatAppContect } from "../../Context/ChatAppContect";

const Friend = () => {
  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    readMessage,
    sendMessage,
    readUser,
    account,
    userName,
    friendMsg,
    friendLists,
    loading,
    currentUserName,
    currentUserAddress,
  } = useContext(ChatAppContect);
  console.log(friendLists);
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {Array.isArray(friendLists) ?
            friendLists.map((el, i) => (
              <Card
                key={i + 1}
                el={el}
                i={i}
                readMessage={readMessage}
                readUser={readUser}
              />
            )) : null
          }
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
