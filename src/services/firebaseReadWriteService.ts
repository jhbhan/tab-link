import { getDoc, getDocs, query, addDoc, where, updateDoc, collection, doc } from 'firebase/firestore';
import { db } from './firebaseBaseService';
import { LinkModel } from "../models/Models";

export const getUserId = async (userEmail:string) => {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const multiple = await getDocs(q);
    var userId = "";
    multiple.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userId = doc.id
      });
    return userId;
}

export const loadLinks = async (userId:string) => {
    const q = query(collection(db, "users", userId, "links"));
    const multiple = await getDocs(q);

    multiple.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });
}

export const updateLink = async (newLink: LinkModel, userId: string) => {
    if (newLink.id) {
        updateDoc(doc(db, `users/${userId}/links/${newLink.id}`), {
            title: newLink.title,
            url: newLink.url,
        }).then((retval: any) => {
            console.log(retval);
        }).catch((err: any) => {
            console.log(err);
        });
    }
    else {
        addDoc(collection(db, 'users', userId, 'links'), {
            title: newLink.title,
            url: newLink.url,
        }).then((retval: any) => {
            console.log(retval);
        }).catch((err: any) => {
            console.log(err);
        });
    }
}
export const deleteLink = async (newLink: LinkModel, userEmail: string) => {
  return;
}