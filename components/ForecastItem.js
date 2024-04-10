import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";

const ForecastItem = ({ item }) => (
  <View style={styles.forecastItem}>
    <Text style={styles.dayText}>
      {new Date(item.dt * 1000).toLocaleDateString()}
    </Text>
    <Text style={styles.timeText}>
      {new Date(item.dt * 1000).toLocaleTimeString()}
    </Text>
    <Text style={styles.tempText}>{item.main.temp}°C</Text>
    <Text style={styles.descText}>{item.weather[0].description}</Text>
    <Image
      style={styles.icon}
      source={{
        uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
      }}
    />
  </View>
);

export default ForecastItem;
