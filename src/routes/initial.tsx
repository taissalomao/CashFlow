/* eslint-disable quotes *//* eslint-disable prettier/prettier */
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen} = createNativeStackNavigator();

import CadastroScreen from "../views/cadastroUser";
import LoginScreen from "../views/login";
import InitialScreen from "../views/paginaInicial";


const InitialRoutes: React.FC = () =>{
    return (
        <Navigator>
            <Screen name="Inicial" component={InitialScreen} options={{ headerShown: false }}/>
            <Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Screen name="CadastroUser" component={CadastroScreen} options={{ headerShown: false }} />
        </Navigator>
    );
};

export {InitialRoutes};
