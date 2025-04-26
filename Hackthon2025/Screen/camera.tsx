import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function CameraApp() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPerm, requestMediaPerm] = MediaLibrary.usePermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    requestPermission();
    requestMediaPerm();
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need camera permission to continue
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri ?? null);
  };

  const savePicture = async () => {
    if (!uri) return;
    await MediaLibrary.createAssetAsync(uri);
    setUri(null);
  };

  // -- After capture: show preview + Save/Retake bar --
  if (uri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.camera} />

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={savePicture}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.retakeButton]}
            onPress={() => setUri(null)}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // -- Live camera preview: Flip + Capture buttons --
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
        >
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.innerCircle} />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  message: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 20,
    color: "#fff",
  },
  camera: {
    flex: 1,
  },

  flipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 24,
  },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: BUTTON_SIZE - 20,
    height: BUTTON_SIZE - 20,
    borderRadius: (BUTTON_SIZE - 20) / 2,
    backgroundColor: "#fff",
  },

  actionButtons: {
    position: "absolute",
    bottom: 40,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  retakeButton: {
    backgroundColor: "#F44336",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
