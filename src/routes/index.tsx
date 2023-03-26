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
            <Screen name=" " component={InitialScreen}/>
            <Screen name="Home" component={HomeScreen}/>
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Cadastro" component={CadastroScreen} />
            <Screen name="Cadastro Despesa" component={CadastroDespesaScreen}/>
            <Screen name="Despesas" component={ListagemDespesaScreen}/>
        </Navigator>
    );
};

export {Routes};
