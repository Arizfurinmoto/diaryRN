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
import EntryItem from "./components/EntryItem";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [entriesList, setEntriesList] = useState([]);
    const [counterID, setCounterID] = useState(0);

    const handleModal = () => {
        console.log("Modal state changed to " + !modalVisible);
        setModalVisible(!modalVisible);
    };

    const updateEntriesList = (desc, curDate) => {
        setCounterID(counterID + 1);
        setEntriesList((currentEntry) => [
            ...currentEntry,
            { text: desc, date: curDate, id: counterID.toString() },
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
                    <Text>
                        {counterID == 0
                            ? "There's nothing to display. Add new entry!"
                            : ""}
                    </Text>
                    <FlatList
                        data={entriesList}
                        renderItem={(itemData) => {
                            itemData.index;
                            return (
                                <EntryItem
                                    id={itemData.item.id}
                                    date={itemData.item.date}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                        style={{ width: "100%" }}
                        contentContainerStyle={{ alignItems: "center" }}
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
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "90%",
    },
});
