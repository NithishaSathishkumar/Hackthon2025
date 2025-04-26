import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Button, Image } from "react-native";
import React, { useState, useRef } from "react";
import dayjs from "dayjs";

const todayDate = dayjs().format('YYYY-MM-DD');

// Start data
const habitsData = [
  { id: "1", title: "LeetCode", days: 7, startDate: todayDate },
  { id: "2", title: "Study Interview", days: 5, startDate: todayDate },
  { id: "3", title: "Code 1 Hour", days: 50, startDate: todayDate },
];

export default function MyTasks({navigation}) {
  const [expandedId, setExpandedId] = useState(null);
  const [habitProgress, setHabitProgress] = useState({});
  const [useRef, setUseRef] = useState(null);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMarkToday = (habitId, who, status) => {
    const today = dayjs().format('YYYY-MM-DD');
    const updated = { ...habitProgress };

    if (!updated[habitId]) {
      updated[habitId] = { me: [], partner: [] };
    }

    const index = updated[habitId][who].findIndex(item => item.date === today);

    if (index !== -1) {
      updated[habitId][who][index].status = status;
    } else {
      updated[habitId][who].push({ date: today, status: status });
    }

    setHabitProgress(updated);
  };

  const renderHabit = ({ item }) => {
    const myProgress = habitProgress[item.id]?.me || [];
    const partnerProgress = habitProgress[item.id]?.partner || [];
    const startDate = dayjs(item.startDate);

    const calculateStreak = (progress) => {
      let streak = 0;
      const today = dayjs();

      for (let i = 0; i < item.days; i++) {
        const date = startDate.add(i, 'day').format('YYYY-MM-DD');
        const found = progress.find(p => p.date === date);

        if (found?.status === "done") {
          streak++;
        } else if (dayjs(date).isBefore(today)) {
          streak = 0;
        }
      }
      return streak;
    };

    const myStreak = calculateStreak(myProgress);
    const partnerStreak = calculateStreak(partnerProgress);

    return (
      <View style={styles.habitCard}>
        <TouchableOpacity onPress={() => handleExpand(item.id)}>
          <Text style={styles.habitTitle}>{item.title}</Text>
        </TouchableOpacity>

        {expandedId === item.id && (
          <>
            {/* Two columns for me and partner */}
            <View style={styles.twoColumnContainer}>
              <View style={styles.column}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileCircle}>
                    <Text style={styles.profileInitials}>Me</Text>
                  </View>
                  <Text style={styles.streakText}>{myStreak}🔥</Text>
                </View>

                <View style={styles.grid}>
                  {Array.from({ length: item.days }).map((_, index) => {
                    const date = startDate.add(index, 'day').format('YYYY-MM-DD');
                    const found = myProgress.find(p => p.date === date);
                    let color = "lightgray";

                    if (found) {
                      color = found.status === "done" ? "green" : "red";
                    }

                    return (
                      <View
                        key={index}
                        style={[styles.dayBox, { backgroundColor: color }]}
                      />
                    );
                  })}
                </View>
              </View>

              {/* VS Text */}
              <View style={styles.vsContainer}>
                <Text style={styles.vsText}>VS</Text>
              </View>

              <View style={styles.column}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileCircle}>
                    <Text style={styles.profileInitials}>P</Text>
                  </View>
                  <Text style={styles.streakText}>{partnerStreak}🔥</Text>
                </View>

                <View style={styles.grid}>
                  {Array.from({ length: item.days }).map((_, index) => {
                    const date = startDate.add(index, 'day').format('YYYY-MM-DD');
                    const found = partnerProgress.find(p => p.date === date);
                    let color = "lightgray";

                    if (found) {
                      color = found.status === "done" ? "green" : "red";
                    }

                    return (
                      <View
                        key={index}
                        style={[styles.dayBox, { backgroundColor: color }]}
                      />
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Static Info */}
            {/* <View style={{ marginTop: 10 }}>
              <Text>Users Competitor: "Users Name From Database"</Text>
              <Text>Stake: "$50 or a dare"</Text>
              <Text>Start Date: {item.startDate}</Text>
              <Text>End Date: {dayjs(item.startDate).add(item.days - 1, 'day').format('YYYY-MM-DD')}</Text>
            </View> */}

            {/* Buttons */}
            {/* <View style={styles.buttonRow}>
              <Button title="Mark My Today Done ✅" onPress={() => handleMarkToday(item.id, "me", "done")} />
              <Button title="Mark My Today Missed ❌" onPress={() => handleMarkToday(item.id, "me", "missed")} />
            </View> */}

            {/* Buttons */}
            <View style={{ marginTop: 10 }}>
              <Button title="View Partners Photo" onPress={() => console.log("View Partner Photo Pressed")} />
            </View>

            <View style={{ marginTop: 5 }}>
              <Button title="📷 Take a Photo" onPress={() => navigation.navigate("Camera")} />
            </View>

            <View style={styles.buttonRow}>
              <Button title="View Insights" />
              <Button title="View Results" />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Habit Battles</Text>

      <FlatList
        data={habitsData}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  habitCard: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  habitTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#415AAB",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  streakText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  vsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  vsText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dayBox: {
    width: 24,
    height: 24,
    margin: 4,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});