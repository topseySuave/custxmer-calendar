import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import CalendarComp from "./components/CalendarComp";

export type Dates = { date: number; mood: string };

export type CalendarDataTypes = {
  dates: Dates[];
  day: number;
  month: number;
  year: number;
};

const data: CalendarDataTypes = {
  dates: [
    {
      date: 4,
      mood: "sad",
    },
    {
      date: 1,
      mood: "sad",
    },
    {
      date: 4,
      mood: "happy",
    },
    {
      date: 6,
      mood: "fair",
    },
    {
      date: 27,
      mood: "sad",
    },
    {
      date: 9,
      mood: "fair",
    },
  ],
  day: 10,
  month: 8,
  year: 2022,
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CalendarComp data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
