import { getDoc, getDocs, query, addDoc, where, updateDoc, collection, doc } from 'firebase/firestore';
import { db, converter } from './firebaseBaseService';
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
    const q = query(collection(db, "users", userId, "links").withConverter(converter));
    const multiple = await getDocs(q);

    const links:LinkModel[] = [];
    multiple.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const ret = doc.data();
        links.push({id: doc.id, title: ret.title, urls:ret.urls, groupOnly: ret.groupOnly })
      });
    return links;
}

export const updateLink = async (newLink: LinkModel, userId: string) => {
    if (newLink.id) {
        updateDoc(doc(db, `users/${userId}/links/${newLink.id}`), {
            title: newLink.title,
            urls: newLink.urls,
        }).then((retval: any) => {
            console.log(retval);
        }).catch((err: any) => {
            console.log(err);
        });
    }
    else {
        addDoc(collection(db, 'users', userId, 'links'), {
            title: newLink.title,
            urls: newLink.urls,
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