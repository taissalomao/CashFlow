/* eslint-disable quotes *//* eslint-disable prettier/prettier */
import React from "react";

/* import { createNativeStackNavigator } from "@react-navigation/native-stack"; */

/* const {Screen} = createNativeStackNavigator(); */


import { useAuthentication } from "../utils/authenticator";
import { AuthRoutes } from "./auth";
import { InitialRoutes } from "./initial";

const Routes: React.FC = () =>{
    const { user } = useAuthentication();

    return user ? <AuthRoutes /> : <InitialRoutes />;
};

export {Routes};
