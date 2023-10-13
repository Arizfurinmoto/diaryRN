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

const EntryDisplay = (props) => {
    const [enteredText, setEnteredText] = useState(props.desc);
    const [editModeON, setEditModeON] = useState(false);

    const textInputHandler = (enteredText) => {
        setEnteredText(enteredText);
    };

    const cancelHandler = () => {
        setEditModeON(false);
        props.handleModal();
    };

    const handleEditMode = () => {
        setEditModeON(!editModeON);
    }
    
    return (
        <Modal visible={props.visible} animationType='slide'>
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={styles.descContainer}
            >
                <Text style={styles.textDate}>
                    {props.date + "\n" + props.time}
                </Text>
                <Text
                    style={[
                        styles.textContainer,
                        editModeON ? { display: "none" } : null,
                    ]}
                >
                    {enteredText}
                </Text>

                <TextInput
                    style={[
                        styles.textInput,
                        !editModeON ? { display: "none" } : null,
                    ]}
                    onChangeText={textInputHandler}
                    value={enteredText}
                    multiline={true}
                    textAlign='left'
                    textAlignVertical='top'
                ></TextInput>

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title={editModeON ? "Done" : "Edit Entry"}
                            onPress={handleEditMode}
                            color='black'
                        />
                    </View>
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

export default EntryDisplay;

const styles = StyleSheet.create({
    descContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    textContainer: {
        backgroundColor: "white",
        width: "96%",
        height: "75%",
        textAlignVertical: "top",
        textAlign: "left",
        padding: 10,
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
});
