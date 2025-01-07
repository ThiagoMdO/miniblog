import { db, auth, app } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [sucess, setSucess] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    // const auth = getAuth(app);
    // console.log(getAuth)

    function checkIfIsCancelled() {
        if (cancelled) return;
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);
        setSucess(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log(user);

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false);
            setSucess("Usuario criado com sucesso");
            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) 
                    systemErrorMessage = "A senha precisa conter pelo menos 6 caracters";
            if (error.message.includes("email-already"))
                    systemErrorMessage = "Email já em uso";
            if (error.message.includes("invalid-email"))
                    systemErrorMessage = "Formato de email incorreto"
            
            console.log(systemErrorMessage)
            setError(systemErrorMessage);
        }

        setLoading(false);
    }

    // logout - sign out
    const logout = () => {

        checkIfIsCancelled();

        signOut(auth);

    }

    // login - sign in
    const login = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false);

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("invalid-credential")) {
                systemErrorMessage = "Dados inválidos.";
            } else {
                systemErrorMessage = "Houve um problema na conexão com o servidor, tente mais tarde."
            }

            setError(systemErrorMessage);
        }

        setLoading(false);
    }


    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        sucess,
        loading,
        logout,
        login
    }
}