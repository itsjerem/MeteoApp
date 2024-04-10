import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";

const WeatherDetails = ({ data, isForecast }) => (
  <View style={styles.weatherContainer}>
    <Text style={styles.cityText}>
      {data.name || new Date(data.dt * 1000).toLocaleDateString()}
    </Text>
    <Text style={styles.tempText}>{data.main.temp}°C</Text>
    <Text style={styles.descText}>{data.weather[0].description}</Text>
    <Image
      style={styles.icon}
      source={{
        uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      }}
    />
    {isForecast && (
      <Text style={styles.timeText}>
        {new Date(data.dt * 1000).toLocaleTimeString()}
      </Text>
    )}
  </View>
);

export default WeatherDetails;
