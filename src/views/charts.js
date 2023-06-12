import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Chart, VerticalAxis, HorizontalAxis, Line } from "react-native-responsive-linechart";
import { doc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuthentication } from "../utils/authenticator";
import { Text } from "native-base";

export default function ChartScreen() {
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const { user } = useAuthentication();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (!user) {
          return; // Exit early if user is undefined
        }
        
        const userDocRef = doc(db, "user", user.uid);
        const expensesRef = collection(userDocRef, "despesas");
        const q = query(expensesRef);
        const querySnapshot = await getDocs(q);

        var array = [];
        querySnapshot.forEach((doc) => {
          const expense = doc.data();
          array.push(expense);
        });
        setExpenseData(array);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRevenues = async () => {
      try {
        if (!user) {
          return; // Exit early if user is undefined
        }
        
        const userDocRef = doc(db, "user", user.uid);
        const revenuesRef = collection(userDocRef, "receitas");
        const revenuesQuerySnapshot = await getDocs(revenuesRef);
        const revenuesArray = revenuesQuerySnapshot.docs.map((doc) => doc.data());
        setRevenueData(revenuesArray);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(() => {
      fetchExpenses();
      fetchRevenues();
    }, 1000); // Chama as funções fetchExpenses e fetchRevenues a cada 1 segundo

    return () => {
      clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    };
  }, [user]); // Dependência adicionada para o useEffect

  return (
    <View style={{ flex: 1 }}>
      {expenseData.length === 0 ? (
        <Text>Nenhum dado de despesa disponível para exibir</Text>
      ) : (
        <React.Fragment>
          <Text>Gráfico de Despesas</Text>
          <Chart
            style={{ height: 200, width: 400 }}
            data={expenseData.map((valor, index) => ({ x: index, y: valor.valor }))}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          >
            <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
            <HorizontalAxis tickCount={3} />
  
            <Line
              theme={{
                stroke: { color: 'red', width: 2 },
              }}
              smoothing="cubic-spline"
            />
          </Chart>
        </React.Fragment>
      )}
      {revenueData.length === 0 ? (
        <Text>Nenhum dado de receita disponível para exibir</Text>
      ) : (
        <React.Fragment>
          <Text>Gráfico de Receitas</Text>
          <Chart
            style={{ height: 200, width: 400 }}
            data={revenueData.map((valor, index) => ({ x: index, y: valor.valor }))}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          >
            <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
            <HorizontalAxis tickCount={3} />
  
            <Line
              theme={{
                stroke: { color: 'green', width: 2 },
              }}
              smoothing="cubic-spline"
            />
          </Chart>
        </React.Fragment>
      )}
    </View>
  );
}
