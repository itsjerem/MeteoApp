import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { getLocation } from "./api/getLocation";
import WeatherDetails from "./components/WeatherDetails";
import { getWeather, getForecast } from "./api/getWeather";
import styles from "./styles";

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

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {weather ? (
          <>
            <Text style={styles.title}>Météo du jour:</Text>
            <WeatherDetails data={weather} />
            <Text style={styles.h2}>Prévisions:</Text>
            <FlatList
              style={styles.forecastList}
              horizontal
              data={forecast}
              keyExtractor={(item) => item.dt.toString()}
              renderItem={({ item }) => (
                <WeatherDetails data={item} isForecast />
              )}
            />
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.title}>{loadingMessage}</Text>
          </>
        )}
        <StatusBar style="auto" />
        {/* <Button title="Actualiser" onPress={fetchData} /> */}
      </View>
    </View>
  );
}
