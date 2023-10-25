/* global chrome */

import React, { useEffect, useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { AddLink } from '../components/AddLink';
import '../App.css';
import { LinkModel } from "../models/Models";
import { Links } from "../components/Links";
import _ from 'underscore';

import { loadLinks, getUserId, updateLink } from '../services/firebaseReadWriteService';

export const Home = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  const [pic, setPic] = useState<any>(null);
  const [linkList, setLinks] = useState<LinkModel[]>([]);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    chrome.identity.getProfileUserInfo(async (user: chrome.identity.UserInfo) => {
      setUserEmail(user.email);
      getUserId(user.email)
        .then((returnUserId: string) => {
          setUserId(returnUserId);
          loadLinks(returnUserId)
            .then((retval: any) => {
              console.log(retval);
            })
            .catch((err: any) => {
              console.log(err);
            });
        });
    });
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleAdd = async (url: string, title: string) => {
    const newLink: LinkModel = {
      url: url, title: title, groupOnly: false, id: undefined
    };
    updateLink(newLink, userId)
      .then((retval: any) => {
        console.log('success!');
        console.log(retval);
      })
      .catch((error: any) => {
        console.log('error');
        console.log(error);
      });
    setOpen(false);
  };

  const fetchImage = async () => {
    const unsplashKey = "UVrem5z1U-JBNJ2UPNpZk0HuTLUpWbIG2O8KAtgrkwA";
    const collectionId = 4809869;
    const data = await fetch(
      `https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${unsplashKey}&w=1920&h=1080&crop=entropy&fit=crop&auto=format&q=70&fm=jpg`
    );
    const dataJ = await data.json();
    setPic(dataJ);
  };
  
  const adviceUrl = "https://api.adviceslip.com/advice";

  const fetchAdvice = async () => {
    try {
      const response = await fetch(adviceUrl);
      const json = await response.json();
      setAdvice(json.slip.advice);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fabStyling = {position: 'absolute', right: '24px', bottom:'24px'};

  useEffect(() => {
    fetchImage();
    fetchAdvice();
  }, []);

  return (
    <>
    {pic && advice &&
      <div className="App fade-in-image" style={{backgroundImage: `url(${pic.urls.full})`}}>
        <div className="text-container">
          <h1 className="text">
            {advice}
          </h1>
        </div>
        <Links linkList={linkList} />
        <AddLink isOpen={open} handleClose={handleClose} handleAdd={handleAdd} />
          <Fab disabled={_.isEmpty(userEmail)}sx={fabStyling} className="add-button" color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
      </div>
    }
    </>
  );
}