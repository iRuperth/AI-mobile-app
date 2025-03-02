import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import mmLogo from "../../assets/images/mmLogo.png";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [opacity] = useState(new Animated.Value(1));

  const handleTouch = async () => {
    if (!appReady) {
      setAppReady(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Asset.fromModule(mmLogo).downloadAsync();

        const timeout = setTimeout(async () => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }).start();
          setAppReady(true);
          await SplashScreen.hideAsync();
        }, 4000);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.warn("Error loading assets", error);
      }
    };

    loadAssets();
  }, [opacity]);

  if (!appReady) {
    return (
      <TouchableWithoutFeedback onPress={handleTouch}>
        <View style={styles.container}>
          <Animated.Image source={mmLogo} style={[styles.image, { opacity }]} />
          <Text style={styles.text}>mmLawyer</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hemos entrado</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
