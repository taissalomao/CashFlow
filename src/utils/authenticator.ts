/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/func-call-spacing */
/* eslint-disable prettier/prettier */
import { getAuth, onAuthStateChanged, User } from 'firebase/auth/react-native';
import React from 'react';
const auth = getAuth();
export function useAuthentication() {
    const [user, setUser] = React.useState < User > ();
    React.useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        return unsubscribeFromAuthStatuChanged;
    }, []);
    return {
        user,
    };
}
