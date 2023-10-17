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
import * as ImagePicker from "expo-image-picker";

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
        return day + "." + month + "." + y.toString();
    };

    const getCurrentTime = () => {
        let hour;
        let minutes;
        const time = new Date();

        const h = time.getHours();
        const m = time.getMinutes();

        if (m.toString().length < 2) {
            minutes = "0" + m.toString();
        } else {
            minutes = m.toString();
        }

        if (h.toString().length < 2) {
            hour = "0" + h.toString();
        } else {
            hour = h.toString();
        }

        return hour + ":" + minutes;
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

    const [images, setImages] = useState([]);

    const addPhotoHandler = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        console.log(result);

        if (!result.canceled) {
            console.log("Dlugosc: " + result.assets.length);

            for(let i = 0; i<result.assets.length; i++){
                // setImages(result.assets[i].uri);
                setImages((currentImages) => [
                    ...currentImages,
                    result.assets[i].uri,
                ]);
            }
            // setImages(result.assets[0].uri);
            
            // setImage(result.assets.uri);
        }
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <ImageBackground
                source={images.length<=0 ? paper : {uri:images[1]}}
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
                    <View style={styles.button}>
                        <Button
                            title='Add Photo check'
                            onPress={()=>{console.log(images)}}
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
