import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { getLocation } from "./components/getLocation";
import { getWeather } from "./components/getWeather";

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(
    "Récupération des données météorologiques"
  );

  useEffect(() => {
    (async () => {
      const currentLocation = await getLocation();
      // console.log(currentLocation);
      setLocation(currentLocation);

      if (currentLocation) {
        const currentWeather = await getWeather(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        setWeather(currentWeather);
      }
    })();
  }, []);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        if (prevMessage.endsWith("...")) {
          return "Récupération des données météorologiques";
        } else {
          return prevMessage + ".";
        }
      });
    }, 500);

    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <Text style={styles.title}>Météo du jour:</Text>
          <View style={styles.weatherContainer}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Ville:</Text> {weather.name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Température:</Text>{" "}
              {weather.main.temp}°C
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Description du temps:</Text>{" "}
              {weather.weather[0].description}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Icon:</Text>{" "}
              {weather.weather[0].icon}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.title}>{loadingMessage}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  weatherContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
