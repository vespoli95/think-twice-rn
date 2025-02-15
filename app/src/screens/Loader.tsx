import React, {useEffect, useRef, useMemo} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();
const {width} = Dimensions.get('window');
const circleSize = width * 0.8;

const Loader = ({navigation}) => {
  const [delay] = useMMKVStorage<string>('delay', storage, '3');
  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const scale3 = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  // Generate random colors for each circle
  const colors = useMemo(
    () => [
      `hsl(${Math.random() * 360}, 70%, 50%)`,
      `hsl(${Math.random() * 360}, 70%, 50%)`,
      `hsl(${Math.random() * 360}, 70%, 50%)`,
    ],
    [],
  );

  useEffect(() => {
    // Animate circles
    const pulseAnimation = (scale: Animated.Value) => {
      return Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.parallel([
        pulseAnimation(scale1),
        Animated.sequence([Animated.delay(666), pulseAnimation(scale2)]),
        Animated.sequence([Animated.delay(1333), pulseAnimation(scale3)]),
      ]),
    ).start();

    // Text fade in/out
    Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Navigate back after delay
    const timer = setTimeout(() => {
      navigation.goBack();
    }, parseInt(delay) * 1000);

    return () => clearTimeout(timer);
  }, [scale1, scale2, scale3, textOpacity, delay, navigation]);

  const Circle = ({scale, color}) => (
    <Animated.View
      style={{
        position: 'absolute',
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: color,
        opacity: 0.2,
        transform: [{scale}],
      }}
    />
  );

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="absolute inset-0 items-center justify-center">
        <Circle scale={scale1} color={colors[0]} />
        <Circle scale={scale2} color={colors[1]} />
        <Circle scale={scale3} color={colors[2]} />
      </View>
      <Animated.Text
        className="text-2xl font-semibold text-gray-800 z-10"
        style={{opacity: textOpacity}}>
        Take a break for {delay} seconds...
      </Animated.Text>
    </View>
  );
};

export default Loader;
