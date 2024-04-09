import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, FlatList, View, Text, StyleSheet } from "react-native";
import { getLocation } from "./components/getLocation";
import { getWeather, getForecast } from "./components/getWeather";

export default function App() {
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");

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
        if (prevMessage === "" || prevMessage.endsWith("...")) {
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

  useEffect(() => {
    (async () => {
      const currentLocation = await getLocation();
      setLocation(currentLocation);

      if (currentLocation) {
        const currentWeather = await getWeather(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        setWeather(currentWeather);

        const weatherForecast = await getForecast(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        setForecast(weatherForecast);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <Text style={styles.title}>Météo du jour:</Text>
          <View style={styles.weatherContainer}>
            <Text style={styles.cityText}>{weather.name}</Text>
            <Text style={styles.tempText}>{weather.main.temp}°C</Text>
            <Text style={styles.descText}>
              {weather.weather[0].description}
            </Text>
            <Text style={styles.iconText}>
              {weather.weather[0].icon} (icon)
            </Text>
          </View>
          <FlatList
            horizontal
            data={forecast}
            keyExtractor={(item) => item.dt.toString()}
            renderItem={({ item }) => (
              <View style={styles.forecastItem}>
                <Text style={styles.dayText}>
                  {new Date(item.dt * 1000).toLocaleDateString()}
                </Text>
                <Text style={styles.timeText}>
                  {new Date(item.dt * 1000).toLocaleTimeString()}
                </Text>
                <Text style={styles.tempText}>{item.main.temp}°C</Text>
                <Text style={styles.descText}>
                  {item.weather[0].description}
                </Text>
                <Text style={styles.iconText}>
                  {item.weather[0].icon} (icon)
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.title}>{loadingMessage}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  cityText: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginTop: Platform.OS === "ios" ? 50 : 0, // Ajoute une marge en haut si iphone
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
