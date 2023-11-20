import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { UserCard } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContect } from "../Context/ChatAppContect";

const alluser = () => {
    const { userLists, addFriends } = useContext(ChatAppContect);

    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>Find your friends</h1>
            </div>
            <div className={Style.alluser_items}>
                {Array.isArray(userLists)
                    ? userLists.map((el, i) => (
                        <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
                    )) : null}
            </div>
        </div>
    );
};

export default alluser;