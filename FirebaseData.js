import { createContext, useEffect, useState } from "react";
import { onSnapshot, collection, doc, } from 'firebase/firestore';
import { db } from './firebase';

export const FirebaseContext = createContext()

export const FirebaseContextProvider = ({ children }) => {

    const [RescuesList, setRescues] = useState([])
    const [NgosList, setNgo] = useState([])

    useEffect(() => {
        return onSnapshot(collection(db, "rescues"), (snapshot) => {
            const list = []
            snapshot.forEach((doc) => {
                const present = RescuesList.find((item) => item.id === doc.data().id)
                if (!present) {
                    list.push(doc.data())
                }
            })
            setRescues(list)
        })
    }, [])

    useEffect(() => {
        return onSnapshot(collection(db, "ngos"), (snapshot) => {
            const list = []
            snapshot.forEach((doc) => {
                const present = NgosList.find((item) => item.id === doc.data().id)
                if (!present) {
                    list.push(doc.data())
                }
            })
            setNgo(list)
        })
    }, [])


    const [tokens, setTokens] = useState([])

    useEffect(() => {
        const token = onSnapshot(doc(db, "notifications", "notifications"), (doc) => {
            doc.exists() && setTokens(doc.data().tokens)
        })
        return () => {
            token()
        }
    }, [])

    return (
        <FirebaseContext.Provider value={{ RescuesList, NgosList, tokens }}>
            {children}
        </FirebaseContext.Provider>
    )
}