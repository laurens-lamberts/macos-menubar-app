import React, { useRef } from "react";
import {
  TextProps,
  TouchableOpacityProps,
  View,
  ViewProps,
  Animated,
  Easing,
  Pressable,
  Text,
} from "react-native";

interface Props extends ViewProps, TouchableOpacityProps {
  backgroundColor?: string;
  is3D?: boolean;
}

const BUTTON_HEIGHT = 6;
const BUTTON_RADIUS = 6;

export default function Button({
  children,
  style,
  backgroundColor,
  is3D,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: Props) {
  const pressAnim = useRef(new Animated.Value(-BUTTON_HEIGHT)).current;
  const backgroundColorToUse = "rgba(20,220,20,1)";

  return (
    <View style={style} {...props}>
      {is3D && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20,220,20,0.4)",
            borderRadius: BUTTON_RADIUS,
          }}
        />
      )}
      <Animated.View
        style={{
          flex: 1,
          top: is3D ? pressAnim : undefined,
        }}
      >
        <Pressable
          style={{
            backgroundColor: backgroundColorToUse,
            borderColor: "rgba(20,220,20,0.5)",
            borderWidth: 1,
            borderRadius: BUTTON_RADIUS,
            paddingHorizontal: 12,
            paddingVertical: 4,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
          }}
          onPress={onPress}
          onPressIn={(event) => {
            if (is3D) {
              Animated.timing(pressAnim, {
                toValue: -2,
                duration: 40,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start();
            }
            onPressIn?.(event);
          }}
          onPressOut={(event) => {
            if (is3D) {
              Animated.sequence([
                Animated.timing(pressAnim, {
                  toValue: -BUTTON_HEIGHT - 1,
                  duration: 140,
                  easing: Easing.ease,
                  useNativeDriver: false,
                }),
                Animated.timing(pressAnim, {
                  toValue: -BUTTON_HEIGHT,
                  duration: 140,
                  easing: Easing.ease,
                  useNativeDriver: false,
                }),
              ]).start();
            }
            onPressOut?.(event);
          }}
        >
          {children}
        </Pressable>
      </Animated.View>
    </View>
  );
}

function ButtonText({ children, style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          textAlign: "center",
          color: "black",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

Button.Text = ButtonText;
