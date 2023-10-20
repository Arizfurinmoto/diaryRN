import { useState } from "react";
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Modal,
    ImageBackground,
    Text,
    FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import paper from "../assets/paper.jpg";
import ImageItem from "./ImageItem";

const DESCRIBTION = "DESCRIBTION";
const GALLERY = "GALLERY";

const EntryDisplay = (props) => {
    const [enteredText, setEnteredText] = useState(props.desc);
    const [editModeON, setEditModeON] = useState(false);
    const [modalMode, setModalMode] = useState(DESCRIBTION);
    const [images, setImages] = useState(props.images);
    const [idTable, setIdTable] = useState(props.idTable);

    const deleteEntryHandler = (id) => {
        setImages((currentImages) => {
            return currentImages.filter((img) => img.id !== id);
        });
    };

    const textInputHandler = (enteredText) => {
        setEnteredText(enteredText);
    };

    const cancelHandler = () => {
        setEditModeON(false);
        descriptionHandler();
        props.handleModal();
    };

    const handleEditMode = () => {
        if (editModeON == true) {
            setEditModeON(false);
        } else {
            setEditModeON(true);
        }
    };

    const galleryHandler = () => {
        if (editModeON == true) {
            handleEditMode();
        }
        setModalMode(GALLERY);
    };

    const descriptionHandler = () => {
        setModalMode(DESCRIBTION);
    };

    const idHandler = () => {
        let check = false;
        let num;
        do {
            num = Math.random();
            check = false;
            for (const id of idTable) {
                if (num == id) {
                    check = true;
                    console.log(`${num} == ${id}`);
                    break;
                }
            }
        } while (check);
        console.log(num);
        setIdTable([...idTable, num]);
        return num;
    };

    const addImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            const updatedImages = result.assets.map((asset) => ({
                src: asset.uri,
                id: idHandler(),
            }));
            setImages([...images, ...updatedImages]);
        }
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={[
                    styles.descContainer,
                    modalMode == DESCRIBTION ? null : { display: "none" },
                ]}
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
                    <View
                        style={[
                            styles.button,
                            editModeON ? { display: "none" } : null,
                        ]}
                    >
                        <Button
                            title='Gallery'
                            onPress={galleryHandler}
                            color='black'
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View
                        style={[
                            styles.button,
                            editModeON ? { display: "none" } : null,
                        ]}
                    >
                        <Button
                            title='Close'
                            onPress={cancelHandler}
                            color='red'
                        />
                    </View>
                </View>
            </ImageBackground>

            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={[
                    styles.descContainer,
                    modalMode == GALLERY ? null : { display: "none" },
                ]}
            >
                <Text style={styles.textDate}>
                    {props.date + "\n" + props.time}
                </Text>

                <FlatList
                    data={images}
                    renderItem={({ item }) => (
                            <ImageItem
                                uri={{ uri: item.src }}
                                deleteEntryHandler={deleteEntryHandler}
                                id={item.id}
                            />
                    )}
                    keyExtractor={(item) => item.id}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: "center" }}
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Description'
                            onPress={descriptionHandler}
                            color='black'
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title='Add Image'
                            onPress={addImageHandler}
                            color='black'
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Close'
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
        marginTop: 5,
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
