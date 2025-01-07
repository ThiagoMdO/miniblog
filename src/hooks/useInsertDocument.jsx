import { useState, useEffect, useReducer } from "react";

import { db } from '../firebase/config';

import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
    sucess: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null, sucess: null}
        case "INSETED_DOC":
            return {loading: false, error: null, sucess: null}
        case "ERROR":
            return {loading: false, error: action.payload, sucess: null}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) => {

    // console.log(docCollection);
    const [response, dispach] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) dispach(action);
    }

    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });

        try {
            const newDocument = {...document, createAt: Timestamp.now()}

            console.log(db);

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                    newDocument
            );

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
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

    return { insertDocument, response}
}