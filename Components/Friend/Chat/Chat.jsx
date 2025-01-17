import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Chat.module.css";
import images from "../../../assets";
import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(router.query.address);
      readUser(router.query.address)
    }
  }, [])

  return (
    <div className={Style.Chat}>
      {
        currentUserName && currentUserAddress ? (
          <div className={Style.Chat_user_info}>
            <Image
              src={images.accountName}
              alt="image"
              width={70}
              height={70}
            />
            <div className={Style.Chat_user_info_box}>
              <h4>{currentUserName}</h4>
              <p className={Style.Chat_user_info_box_show}>
                {currentUserAddress}
              </p>
            </div>
          </div>
        ) : ("")
      }
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {
              Array.isArray(friendMsg) ?
                (
                  friendMsg.map((el, i) => (
                    <div >
                      {
                        el.sender == chatData.address ? (
                          <div className={Style.Chat_box_left_title}>
                            <Image
                              src={images.accountName}
                              alt="image"
                              width={50}
                              height={50}
                            />
                            <span>
                              {chatData.name} {""}
                              <small>{converTime(el.timestamp)}</small>
                            </span>
                          </div>
                        ) : (
                          <div className={Style.Chat_box_left_title}>
                            <Image
                              src={images.accountName}
                              alt="image"
                              width={50}
                              height={50}
                            />
                            <span>
                              {userName} {""}
                              <small>Time: {converTime(el.timestamp)}</small>
                            </span>
                          </div>
                        )
                      }
                      <p key={i + 1}>
                        {el.msg}
                        {""}
                        {""}
                      </p>
                    </div>
                  ))
                ) : null
            }
          </div>
          <div className={Style.Chat_box_right}>

          </div>
        </div>
        {
          currentUserName && currentUserAddress ? (
            <div className={Style.Chat_box_send}>
              <div className={Style.Chat_box_send_img}>
                <Image src={images.smile} alt="image" width={50} height={50} />
                <input
                  type="text"
                  placeholder="Type your message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Image src={images.file} alt="image" width={50} height={50} />
                {
                  loading == true ? (
                    <Loader />
                  ) : (
                    <Image
                      src={images.send}
                      alt="image"
                      width={50} height={50}
                      onClick={() => functionName({ msg: message, address: chatData.address })} />
                  )
                }
              </div>
            </div>
          ) : ("")
        }
      </div>
    </div>
  );
};

export default Chat;
