/* eslint-disable quotes *//* eslint-disable prettier/prettier */
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen} = createNativeStackNavigator();

import CadastroDespesaScreen from "../views/cadastroDespesa";
import InitialScreen from "../views/paginaInicial";
import HomeScreen from "../views/home";
import ListagemDespesaScreen from "../views/listaDespesas";
import CadastroReceitaScreen from "../views/cadastroReceita";
import ListagemReceitaScreen from "../views/listaReceitas";
import ChartScreen from "../views/charts";
//import LoginScreen from "../views/login";
//import CadastroScreen from "../views/cadastroUser";
import PerfilScreen from "../views/meuPerfil";
import DetalheDespesaScreen from "../views/detalheDespesa";


const AuthRoutes: React.FC = () =>{
    return (
        <Navigator>
            <Screen name="Inicial" component={InitialScreen} options={{ headerShown: false }}/>
            <Screen name="Home" component= {HomeScreen} options={{ headerShown: false }}/>
            <Screen name="CadastroDespesa" component={CadastroDespesaScreen} options={{ headerShown: false }}/>
            <Screen name="CadastroReceita" component={CadastroReceitaScreen} options={{ headerShown: false }}/>
            <Screen name="Despesas" component={ListagemDespesaScreen} options={{ headerShown: false }}/>
            <Screen name="Receitas" component={ListagemReceitaScreen} options={{ headerShown: false }}/>
            <Screen name="Charts" component={ChartScreen} options={{ headerShown:false }} />
            <Screen name="Perfil" component={PerfilScreen} options={{ headerShown:false }} />
            <Screen name="DetalheDespesa" component={DetalheDespesaScreen} options={{ headerShown:false }} />
        </Navigator>
    );
};

export {AuthRoutes};
