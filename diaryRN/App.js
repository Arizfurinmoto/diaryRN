import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    StatusBar,
} from "react-native";
import paper from "./assets/paper.jpg";
import AddEntryButton from "./components/AddEntryButton";
import { useState } from "react";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleModal = () => {
        console.log("Modal state changed to " + modalVisible);
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={styles.backgroundImage}
            >
                <AddEntryButton handleModal={handleModal} />
                <View style={styles.entriesContainer}>
                    <Text>Let's make this diary!</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    entriesContainer: {
        padding: 15,
    },
});
