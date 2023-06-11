import { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "react-native-svg";
import { collection, query, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuthentication } from "../utils/authenticator";

export default function ChartScreen() {
  const [expenseData, setExpenseData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const { user } = useAuthentication();

  const handleDataPointClick = (data, index, isExpense) => {
    console.log(index);
    console.log(data.dataset.data[index]);
    const value = data.dataset.data[index];
    const dataType = isExpense ? "Despesa" : "Receita";
    Alert.alert("Valor", `${dataType}: ${value}`);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userDocRef = doc(db, "user", user?.uid);
        const expensesRef = collection(userDocRef, "despesas");
        const q = query(expensesRef);
        const querySnapshot = await getDocs(q);
        const expenseList = [];
        querySnapshot.forEach((doc) => {
          const expense = { id: doc.id, ...doc.data() };
          expenseList.push(expense);
        });
        setExpenseData(expenseList);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const userDocRef = doc(db, "user", user?.uid);
        const incomesRef = collection(userDocRef, "Receitas");
        const q = query(incomesRef);
        const querySnapshot = await getDocs(q);
        const incomeList = [];
        querySnapshot.forEach((doc) => {
          const income = { id: doc.id, ...doc.data() };
          incomeList.push(income);
        });
        setIncomeData(incomeList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
    fetchIncomes();
  }, [user, user?.uid]);

  const calculateProfitData = () => {
    if (incomeData && expenseData) {
      const profitData = incomeData.map((income, index) => {
        const expense = expenseData[index];
        const profit = income.valor - expense.valor;
        return {
          label: income.label,
          valor: profit,
        };
      });
      return profitData;
    }
    return [];
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#EAF0F7",
          flex: 1,
          paddingTop: 5,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text>Receitas</Text>
            {incomeData && (
              <LineChart
                data={{
                  labels: incomeData.map((income) => income.label),
                  datasets: [
                    {
                      data: incomeData.map((income) => income.valor),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 2} // Multiplica por 2 para que o gráfico seja mais largo que a tela
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#F6F6F6", // Nova cor de fundo do gráfico
                  backgroundGradientFrom: "#F6F6F6", // Nova cor de gradiente de fundo do gráfico
                  backgroundGradientTo: "#F6F6F6", // Nova cor de gradiente de fundo do gráfico
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Azul
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#007AFF", // Azul brilhante
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={({ index }) =>
                  handleDataPointClick(incomeData, index, false)
                }
              />
            )}
            <Text>Despesas</Text>
            {expenseData && (
              <LineChart
                data={{
                  labels: expenseData.map((expense) => expense.label),
                  datasets: [
                    {
                      data: expenseData.map((expense) => expense.valor),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 2} // Multiplica por 2 para que o gráfico seja mais largo que a tela
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#F6F6F6", // Nova cor de fundo do gráfico
                  backgroundGradientFrom: "#F6F6F6", // Nova cor de gradiente de fundo do gráfico
                  backgroundGradientTo: "#F6F6F6", // Nova cor de gradiente de fundo do gráfico
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // Vermelho
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#FF3B30", // Vermelho brilhante
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={({ index }) =>
                  handleDataPointClick(expenseData, index, true)
                }
              />
            )}
            <Text>Lucro</Text>
            {incomeData && expenseData && (
              <LineChart
                data={{
                  labels: incomeData.map((income) => income.label),
                  datasets: [
                    {
                      data: calculateProfitData().map((profit) => profit.valor),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 2} // Multiplica por 2 para que o gráfico seja mais largo que a tela
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#F6F6F6", // Nova cor de fundo do gráfico
                  backgroundGradientFrom: "#F6F6F6", // Nova cor de gradiente de fundo do gráfico
                  backgroundGradientTo: "#F6F6F6", // Nova cor de gradiente de fundo do gráfico
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(40, 167, 69, ${opacity})`, // Verde
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#28A745", // Verde brilhante
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={({ index }) =>
                  handleDataPointClick(calculateProfitData(), index, false)
                }
              />
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}
