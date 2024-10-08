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
    Image,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import paper from "../assets/paper.jpg";
import * as ImagePicker from "expo-image-picker";

const DESCRIBTION = "DESCRIBTION";
const GALLERY = "GALLERY";

const DiaryEntry = (props) => {
    const [enteredText, setEnteredText] = useState("");
    const [images, setImages] = useState([]);
    const [modalMode, setModalMode] = useState(DESCRIBTION);
    const [idTable, setIdTable] = useState([]);

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
        props.updateEntriesList(
            enteredText,
            currentDate,
            currentTime,
            images,
            idTable
        );
        setEnteredText("");
        setImages([]);
        props.handleModal();
    };

    const cancelHandler = () => {
        console.log(getCurrentDate());
        setEnteredText("");
        setImages([]);
        setModalMode(DESCRIBTION);
        setIdTable([]);
        props.handleModal();
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
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            const updatedImages = result.assets.map((asset) => {
                return {
                    src: asset.uri,
                    id: idHandler(),
                };
            });
            setImages([...images, ...updatedImages]);
        }
    };

    const galleryHandler = () => {
        setModalMode(GALLERY);
    };

    const descriptionHandler = () => {
        setModalMode(DESCRIBTION);
    };

    const deleteEntryHandler = (id) => {
        setImages((currentImages) => {
            return currentImages.filter((img) => img.id !== id);
        });
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={[
                    styles.inputContainer,
                    modalMode == DESCRIBTION ? null : { display: "none" },
                ]}
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
                            title='Gallery'
                            onPress={galleryHandler}
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

            <ImageBackground
                source={paper}
                resizeMode='cover'
                style={[
                    styles.inputContainer,
                    modalMode == GALLERY ? null : { display: "none" },
                ]}
            >
                <Text style={styles.textDate}>{currentDate}</Text>

                {images.length > 0 ? (
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <View>
                                <Image
                                    style={styles.imageStyle}
                                    source={{ uri: item.src }}
                                    resizeMode='cover'
                                ></Image>
                                <View style={styles.imageInsideContainer}>
                                    <Icon
                                        name='delete-circle-outline'
                                        size={50}
                                        color={"red"}
                                        onPress={deleteEntryHandler.bind(
                                            this,
                                            item.id
                                        )}
                                    />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        style={{ width: "100%" }}
                        contentContainerStyle={{ alignItems: "center" }}
                    />
                ) : (
                    <Text
                        style={{
                            height: "80%",
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                    >
                        This gallery is empty.
                    </Text>
                )}

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Back'
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
    imageInsideContainer: {
        position: "absolute",
        top: "0%",
        right: "0%",
        transform: [{ translateX: 15 }, { translateY: -5 }],
    },
    imageStyle: {
        position: "relative",
        height: 220,
        width: 330,
        marginVertical: 10,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 3,
    },
});
