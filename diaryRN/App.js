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
import EntryDisplay from "./components/EntryDisplay";

export default function App() {
    const [modalNewEntryVisible, setModalNewEntryVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [entriesList, setEntriesList] = useState([]);
    const [counterID, setCounterID] = useState(1);

    const handleNewEntryModal = () => {
        console.log("Modal state changed to " + !modalNewEntryVisible);
        setModalNewEntryVisible(!modalNewEntryVisible);
    };

    const handleInfoModal = () => {
        console.log("Modal Info state changed to " + !modalInfoVisible);
        setModalInfoVisible(!modalInfoVisible);
    };

    const updateEntriesList = (desc, curDate) => {
        setEntriesList((currentEntry) => [
            ...currentEntry,
            { text: desc, date: curDate, id: counterID.toString() },
        ]);
        setCounterID(counterID + 1);
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <DiaryEntry
                visible={modalNewEntryVisible}
                handleModal={handleNewEntryModal}
                updateEntriesList={updateEntriesList}
            />
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={styles.backgroundImage}
            >
                <AddEntryButton handleModal={handleNewEntryModal} />

                <View style={styles.entriesContainer}>
                    <Text style={{ textAlign: "center" }}>
                        {counterID == 1
                            ? "There's nothing to display.\n Add new entry!"
                            : ""}
                    </Text>
                    <FlatList
                        data={entriesList}
                        renderItem={(itemData) => {
                            itemData.index;
                            return (
                                <EntryItem
                                    visible={modalInfoVisible}
                                    id={itemData.item.id}
                                    date={itemData.item.date}
                                    text={itemData.item.text}
                                    handleModal={handleInfoModal}
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
