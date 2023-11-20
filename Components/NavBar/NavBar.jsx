import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./NavBar.module.css"
import { ChatAppContect } from "../../Context/ChatAppContect";
import { Model, Error } from "../index";
import images from "../../assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All users",
      link: "alluser"
    }, {
      menu: "CHAT",
      link: "/chat"
    }, {
      menu: "CONTRACT",
      link: "/"
    }, {
      menu: "SETTINGS",
      link: "/"
    }, {
      menu: "FAQS",
      link: "/"
    }, {
      menu: "TERMS OF USE",
      link: "/"
    },
  ];

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(ChatAppContect);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* // DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} 
              ${active == i + 1 ? Style.active_btn : ""}`}>
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}>
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* // MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} 
              ${active == i + 1 ? Style.active_btn : ""}`}>
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}

              <p className={Style.mobile_menu_btn}>
                <Image src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* CONNECT WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ?
              (<button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>) :
              (<button onClick={() => setOpenModel(true)}>
                {""}
                <Image src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create account"}</small>
              </button>
              )}
          </div>
          <div className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* MODEL COMPONENTS */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
          openBox={setOpenModel}
          title="WELCOME TO"
          head="CHAT DAPP"
          info="lorem ipsumdolor sit amet, consectetur adipsicing el maxime 
          assumenda exercitation voluptatibus, vero aliquid it impedit 
          dolores coluptate recusandae nulla fuga? Praesentium sint 
          fugit! Placeat?" 
          smallInfo="kindley select your name..."
          image={images.hero}
          functionName={createAccount}
          address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default NavBar;
