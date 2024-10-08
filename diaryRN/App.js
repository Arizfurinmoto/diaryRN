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
    const [selectedEntry, setSelectedEntry] = useState(null);

    const handleNewEntryModal = () => {
        setModalNewEntryVisible(!modalNewEntryVisible);
    };

    const handleInfoModal = () => {
        setModalInfoVisible(!modalInfoVisible);
    };

    function deleteEntryHandler(id) {
        setEntriesList((currentEntries) => {
            return currentEntries.filter((entry) => entry.id !== id);
        });
    }

    const updateEntriesList = (desc, curDate, curTime, images, idTable) => {
        setEntriesList((currentEntry) => [
            ...currentEntry,
            {
                text: desc,
                date: curDate,
                id: counterID.toString(),
                time: curTime,
                images: images,
                idTable: idTable,
            },
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
                        {entriesList.length <= 0
                            ? "There's nothing to display.\n Add a new entry!"
                            : ""}
                    </Text>
                    <FlatList
                        data={entriesList}
                        renderItem={({ item }) => (
                            <>
                                <EntryItem
                                    id={item.id}
                                    date={item.date}
                                    time={item.time}
                                    handleModal={() => setSelectedEntry(item)}
                                    onDeleteItem={deleteEntryHandler}
                                />
                                <EntryDisplay
                                    visible={
                                        selectedEntry &&
                                        selectedEntry.id === item.id
                                    }
                                    date={item.date}
                                    desc={item.text}
                                    time={item.time}
                                    handleModal={() => setSelectedEntry(null)}
                                    images={item.images}
                                    idTable={item.idTable}
                                />
                            </>
                        )}
                        keyExtractor={(item) => item.id}
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
        height: "85%",
    },
});
