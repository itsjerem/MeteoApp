import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  cityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  forecastList: {
    paddingLeft: 10,
  },
  forecastItem: {
    maxHeight: 200,
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 14,
  },
  tempText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  descText: {
    fontSize: 18,
    marginTop: 10,
  },
  iconText: {
    fontSize: 10,
    color: "#666",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 60 : 0, // Ajoute une marge en haut si iphone
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  h2: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default styles;
