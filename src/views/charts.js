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
    console.log(data[index]);
    const value = data[index];
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

  const formatDate = (dateString) => {
    const day = dateString.substr(0, 2);
    const month = dateString.substr(2, 2);
    const year = dateString.substr(4, 4);
    return `${day}/${month}/${year}`;
  };

  const calculateProfitData = () => {
    if (incomeData && expenseData) {
      const profitData = incomeData.map((income, index) => {
        const expense = expenseData[index];
        const profit = income.valor - expense.valor;
        return {
          label: formatDate(income.data? income.data : ""),
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "column" }}>
            <Text>Receitas</Text>
            {incomeData && (
              <LineChart
                data={{
                  labels: incomeData.map((income) => formatDate(income.data)),
                  datasets: [
                    {
                      data: incomeData.map((income) => income.valor),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 2}
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#F6F6F6",
                  backgroundGradientFrom: "#F6F6F6",
                  backgroundGradientTo: "#F6F6F6",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#007AFF",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={({ index }) =>
                  handleDataPointClick(incomeData.map((income) => income.valor), index, false)
                }
              />
            )}
            <Text>Despesas</Text>
            {expenseData && (
              <LineChart
                data={{
                  labels: expenseData.map((expense) => formatDate(expense.data)),
                  datasets: [
                    {
                      data: expenseData.map((expense) => expense.valor),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 2}
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#F6F6F6",
                  backgroundGradientFrom: "#F6F6F6",
                  backgroundGradientTo: "#F6F6F6",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#FF3B30",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={({ index }) =>
                  handleDataPointClick(expenseData.map((expense) => expense.valor), index, true)
                }
              />
            )}
            <Text>Lucro</Text>
            {incomeData && expenseData && (
              <LineChart
                data={{
                  labels: incomeData.map((income) => formatDate(income.data)),
                  datasets: [
                    {
                      data: calculateProfitData().map((profit) => profit.valor),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 2}
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#F6F6F6",
                  backgroundGradientFrom: "#F6F6F6",
                  backgroundGradientTo: "#F6F6F6",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(40, 167, 69, ${opacity})`,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#28A745",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={({ index }) =>
                  handleDataPointClick(calculateProfitData().map((profit) => profit.valor), index, false)
                }
              />
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}
