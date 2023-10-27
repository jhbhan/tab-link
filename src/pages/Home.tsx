/* global chrome */

import React, { useEffect, useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { AddLink } from '../components/AddLink';
import '../App.scss';
import { LinkModel } from "../models/Models";
import { Links } from "../components/Links";
import _ from 'underscore';

import { loadLinks, getUserId, updateLink } from '../services/firebaseReadWriteService';
import { fetchAdvice, fetchImage } from "../services/quotesService";

export const Home = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  const [pic, setPic] = useState<any>(null);
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
    fetchAdvice()
      .then((ret:any) => {
        setAdvice(ret);
      });
    fetchImage()
      .then((ret:any) => {
        setPic(ret);
      });
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
        <AddLink isOpen={open} handleClose={() => {setOpen(false);}} handleAdd={handleAdd} />
          <Fab disabled={_.isEmpty(userEmail)}sx={fabStyling} className="add-button" color="primary" aria-label="add" onClick={()=>{setOpen(true);}}>
            <AddIcon />
          </Fab>
      </div>
    }
    </>
  );
}