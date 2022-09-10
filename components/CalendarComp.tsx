import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CalendarDataTypes, Dates } from "../App";

const emotionsIcon = {
  happy: "😄",
  sad: "😡",
  fair: "😐",
};

/*
needs two string arrays: one to store the names of the months
and one to store the names of the days of the week.
*/
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Then, we’ll need an array that stores the number of days each month has.
// So, for February, let the number be 28. We’ll write the code to handle leap years later.
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const CalendarComp = ({ data }: { data: CalendarDataTypes }) => {
  const [activeDate, setActiveDate] = useState(
    new Date(data.year, data.month, data.day)
  );

  const generateMatrix = () => {
    var matrix = [];
    // The following code creates the header
    matrix[0] = weekDays;

    // get the year and month of the Date object stored in the state.
    // Then create a new Date object using those values and 1, the first day of the month.
    // By calling the getDay() method of this new object, you should obviously get the first day of the month.
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    //we can’t directly use the nDays array to determine
    // the number of days the current month has on the calendar component.
    // If the month’s February, we need to manually add an extra day while dealing with leap years.
    // So here’s how:
    let maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        // @ts-ignore
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          // @ts-ignore
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          // @ts-ignore
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };

  const _onPress = (item: any) => {
    if (!item.match && item != -1) {
      activeDate.setDate(item);
      setActiveDate(new Date(activeDate));
    }
  };

  const matrix = generateMatrix();

  let rows = [];
  rows = matrix.map((row: any[], rowIndex: number) => {
    let rowItems = row.map((item: number, colIndex: number) => {
      let _date: Dates[] = data.dates.filter((d: Dates) => d.date === item);

      // If any date object appears twice with the same date
      // the last date is used.
      let predate = _date[_date.length - 1];

      return (
        <Text
          key={colIndex}
          //  @ts-ignore
          style={{
            flex: 1,
            height: 18,
            textAlign: "center",
            marginRight: "16px",
            // Highlight Sundays
            color: colIndex == 0 ? "#a00" : "#000",
            // Highlight current date
            fontWeight: item == activeDate.getDate() ? "bold" : "",
          }}
          onPress={() => _onPress(item)}
        >
          {/* @ts-ignore */}
          {rowIndex !== 0 && item != -1 && emotionsIcon[predate?.mood]}
          <br />
          {item != -1 ? item : ""}
        </Text>
      );
    });

    return (
      <View
        key={rowIndex}
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {rowItems}
      </View>
    );
  });

  return (
    <View>
      <Text style={{ marginBottom: "10px" }}>Calendar Component</Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {months[activeDate.getMonth()]} {activeDate.getFullYear()}
      </Text>
      {rows}
    </View>
  );
};

export default CalendarComp;
