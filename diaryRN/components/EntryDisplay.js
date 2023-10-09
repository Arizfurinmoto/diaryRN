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
    const cancelHandler = () => {
        props.handleModal();
    };
    return (
        <Modal visible={props.visible} animationType='slide'>
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={styles.descContainer}
            >
                <Text style={styles.textDate}>{props.date}</Text>
                <Text style={styles.textContainer}>{props.desc}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Edit Entry'
                            // onPress={}
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
});
