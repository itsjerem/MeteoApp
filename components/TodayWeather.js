import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";

const WeatherToday = ({ weather }) => (
  <View style={styles.weatherContainer}>
    <Text style={styles.cityText}>{weather.name}</Text>
    <Text style={styles.tempText}>{weather.main.temp}°C</Text>
    <Text style={styles.descText}>{weather.weather[0].description}</Text>
    <Image
      style={styles.icon}
      source={{
        uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
      }}
    />
  </View>
);

export default WeatherToday;
