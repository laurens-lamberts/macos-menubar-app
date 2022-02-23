import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import Button from "./src/app/components/Button";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("idle");
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  const triggerBuild = async () => {
    const appSlug = "cde17a07a29f0b75"; // Landal
    await fetch(`https://api.bitrise.io/v0.1/apps/${appSlug}/builds`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "fXQ584iPQThYt4Ih2HcCbFcbavHl_x3qmvh50lZgrfI4FmZ5zFIG5v8BwFzS7c6UBKC_4qex3QlCPkCYLgfPZQ",
      },
      body: JSON.stringify({
        hook_info: {
          type: "bitrise",
        },
        build_params: {
          branch: "main",
          workflow_id: "LANDAL-ANDROID-ACC",
        },
      }),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "#666",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Landal GreenParks</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {`Press the button to perform\na Bitrise CI build`}
        </Text>
        <Button
          style={{
            height: 42,
            width: 100,
            marginRight: 8,
            marginTop: 20,
          }}
          onPress={async () => {
            await triggerBuild();
            setStatus("build triggered");
          }}
          is3D
        >
          {/* <Icon name="briefcase-download-outline" style={{ marginRight: 8 }} /> */}
          <Button.Text>CI BUILD</Button.Text>
        </Button>
        <Text
          style={{
            marginTop: 12,
            color: status !== "idle" ? "tomato" : undefined,
          }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default App;
