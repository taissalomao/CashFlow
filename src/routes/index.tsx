/* eslint-disable prettier/prettier */
import React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen} = createNativeStackNavigator();

import CadastroScreen from "../views/cadastroUser";
import LoginScreen from "../views/login";
import CadastroDespesaScreen from "../views/cadastroDespesa";

const Routes: React.FC = () =>{
    return(
        <Navigator initialRouteName="Login">
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Cadastro" component={CadastroScreen} />
            <Screen name="CadastroDespesa" component={CadastroDespesaScreen}/>
        </Navigator>
    )
}

export {Routes}