import { useState } from "react";
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Modal,
    ImageBackground,
    Text,
} from "react-native";
import paper from "../assets/paper.jpg";

const DiaryEntry = (props) => {
    const [enteredText, setEnteredText] = useState("");

    const textInputHandler = (enteredText) => {
        setEnteredText(enteredText);
    };

    const getCurrentDate = () => {
        let day;
        let month;
        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();

        if (d.toString().length < 2) {
            day = "0" + d.toString();
        } else {
            day = d.toString();
        }
        if (m.toString().length < 2) {
            month = "0" + m.toString();
        } else {
            month = m.toString();
        }
        return (
            day +
            "." +
            month +
            "." +
            y.toString()
        );
    };

    const getCurrentTime = () => {
        const time = new Date();

        const hours = time.getHours();
        const minutes = time.getMinutes();

        return hours.toString() + ":" + minutes.toString();
    };

    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    const addEntryHandler = () => {
        console.log("Entry added!");
        props.updateEntriesList(enteredText, currentDate, currentTime);
        setEnteredText("");
        props.handleModal();
    };

    const cancelHandler = () => {
        console.log(getCurrentDate());
        setEnteredText("");
        props.handleModal();
    };

    const addPhotoHandler = () => {
        console.log("Photo added!");
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={styles.inputContainer}
            >
                <Text style={styles.textDate}>{currentDate}</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={"What's up?"}
                    onChangeText={textInputHandler}
                    value={enteredText}
                    multiline={true}
                    textAlign='left'
                    textAlignVertical='top'
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Add Entry'
                            onPress={addEntryHandler}
                            color='black'
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title='Add Photo'
                            onPress={addPhotoHandler}
                            color='black'
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Cancel'
                            onPress={cancelHandler}
                            color='red'
                        />
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default DiaryEntry;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#bbc",
        backgroundColor: "#fff",
        color: "#000123",
        borderRadius: 8,
        width: "96%",
        height: "75%",
        padding: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    button: {
        width: "30%",
        marginHorizontal: 10,
    },
    textDate: {
        backgroundColor: "#fffddd",
        width: "30%",
        textAlign: "center",
        padding: 5,
        borderRadius: 5,
        fontWeight: "bold",
        marginBottom: 5,
    },
});
