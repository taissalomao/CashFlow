/* eslint-disable quotes *//* eslint-disable prettier/prettier */
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen} = createNativeStackNavigator();

import CadastroScreen from "../views/cadastroUser";
import LoginScreen from "../views/login";
import CadastroDespesaScreen from "../views/cadastroDespesa";
import InitialScreen from "../views/paginaInicial";
import HomeScreen from "../views/home";
import ListagemDespesaScreen from "../views/listaDespesas";

const Routes: React.FC = () =>{
    return (
        <Navigator initialRouteName="Inicial">
            <Screen name=" " component={InitialScreen} options={{ headerShown: false }}/>
            <Screen name="Home" component= {HomeScreen} options={{ headerShown: false }}/>
            <Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
            <Screen name="CadastroDespesa" component={CadastroDespesaScreen} options={{ headerShown: false }}/>
            <Screen name="Despesas" component={ListagemDespesaScreen} options={{ headerShown: false }}/>
        </Navigator>
    );
};

export {Routes};
