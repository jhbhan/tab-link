/* global chrome */

import React, { useContext, useEffect, useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { AddLink } from '../components/AddLink';
import '../App.scss';
import { LinkModel } from "../models/Models";
import { Links } from "../components/Links";
import _ from 'underscore';

import { loadLinks, getUserId, updateLink } from '../services/firebaseReadWriteService';
import { fetchAdvice, fetchImage } from "../services/quotesService";
import { AppContext } from './appContext';

export const Home = () => {
  const appContext = useContext(AppContext);
  const [userEmail, setUserEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  const [pic, setPic] = useState<string>("");
  const [linkList, setLinks] = useState<LinkModel[]>([]);

  const [open, setOpen] = React.useState(false);

  const getLinks = (id: string) => {
    loadLinks(id)
    .then((retval: LinkModel[]) => {
      setLinks(retval);
    })
    .catch((err: any) => {
      console.log(err);
    });
  };

  React.useEffect(() => {
    (async () => {
      const [advice, image] = await Promise.all([
        fetchAdvice(),
        fetchImage()
      ]);
      setAdvice(advice);
      setPic(image);
    })();

    chrome.identity.getProfileUserInfo(async (user: chrome.identity.UserInfo) => {
      setUserEmail(user.email);
      getUserId(user.email)
        .then((returnUserId: string) => {
          setUserId(returnUserId);
          getLinks(returnUserId);
        });
    });
  },[]);
  
  const handleAdd = async (url: string[], title: string) => {
    const newLink: LinkModel = {
      urls: url, title: title, groupOnly: false, id: undefined
    };
    updateLink(newLink, userId)
      .then(() => {
        getLinks(userId);
      })
      .catch((error: any) => {
        console.log('error');
        console.log(error);
      });
    setOpen(false);
  };

  const handleChange = () => {
    getLinks(userId);
  }
  const fabStyling = {position: 'absolute', right: '24px', bottom:'24px'};

  return (
    <AppContext.Provider value={{userId:userId, userEmail:userEmail}}>
    {pic && advice &&
      <div className="App fade-in-image" style={{backgroundImage: `url(${pic})`}}>
        <div className="text-container">
          <h1 className="text">
            {advice}
          </h1>
        </div>
        <Links linkList={linkList} handleChange={handleChange}/>
        <AddLink isOpen={open} handleClose={() => {setOpen(false);}} handleAdd={handleAdd} />
          <Fab disabled={_.isEmpty(userEmail)}sx={fabStyling} className="add-button" color="primary" aria-label="add" onClick={()=>{setOpen(true);}}>
            <AddIcon />
          </Fab>
      </div>
    }
    </AppContext.Provider>
  );
}