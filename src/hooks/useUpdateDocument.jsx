import { useState, useEffect, useReducer } from "react";

import { db } from '../firebase/config';

import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
    sucess: null
}

const updateReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null, sucess: null}
        case "UPDATED_DOC":
            return {loading: false, error: null, sucess: null}
        case "ERROR":
            return {loading: false, error: action.payload, sucess: null}
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection) => {

    // console.log(docCollection);
    const [response, dispach] = useReducer(updateReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) dispach(action);
    }

    const updateDocument = async (uid, data) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });

        try {
            const docRef = await doc(db, docCollection, uid);

            const updatedDocument = await updateDoc(docRef, data);

            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updatedDocument
            });

        } catch(error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            });
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return { updateDocument, response}
}