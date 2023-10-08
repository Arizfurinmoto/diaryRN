import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    StatusBar,
    FlatList,
} from "react-native";
import { useState } from "react";
import paper from "./assets/paper.jpg";
import AddEntryButton from "./components/AddEntryButton";
import DiaryEntry from "./components/DiaryEntry.js";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [entriesList, setEntriesList] = useState([]);

    const handleModal = () => {
        console.log("Modal state changed to " + modalVisible);
        setModalVisible(!modalVisible);
    };

    const updateEntriesList = (desc, curDate) => {
        setEntriesList((currentEntry) => [
            ...currentEntry,
            { text: desc, date: curDate, id: Math.random().toString() },
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <DiaryEntry
                visible={modalVisible}
                handleModal={handleModal}
                updateEntriesList={updateEntriesList}
            />
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={styles.backgroundImage}
            >
                <AddEntryButton handleModal={handleModal} />
                <View style={styles.entriesContainer}>
                    <Text>Let's make this diary!</Text>
                    <FlatList
                        data={entriesList}
                        renderItem={(itemData) => {
                            itemData.index;
                            return (
                                <View
                                    style={{ flexDirection: "row", padding: 5 }}
                                >
                                    <Text>{itemData.item.text}</Text>
                                    <Text>{itemData.item.date}</Text>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                    />
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
