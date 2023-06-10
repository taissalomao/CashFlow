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
  const { user } = useAuthentication();

  const handleDataPointClick = (data, index) => {
    console.log(index)
    console.log(data.dataset.data[0])
    const value = data.dataset.data[index];
    Alert.alert("Valor", `Valor: ${value}`);
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

    fetchExpenses();
  }, [user, user?.uid]);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#EAF0F7",
          flex: 1,
          paddingTop: 5,
        }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        horizontal
      >
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
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            onDataPointClick={({ index }) => handleDataPointClick(expenseData, index)}
          />
        )}
      </ScrollView>
    </>
  );
}
