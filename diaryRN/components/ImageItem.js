import { View, Image, Pressable, StyleSheet } from "react-native";
import ImageView from "react-native-image-viewing";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
const ImageItem = (props) => {
    const [imgPressed, setImgPressed] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);

    const imagePressedHandle = () => {
        setImgPressed(!imgPressed);
    };

    const zoomHandle = () => {
        setImageVisible(true);
    };

    const zoomCloseHandle = () => {
        setImageVisible(false);
        setImgPressed(false);
    }

    return (
        <>
            <ImageView
                images={[props.uri]}
                imageIndex={0}
                visible={imageVisible}
                onRequestClose={zoomCloseHandle}
            />

            <Pressable onPress={imagePressedHandle}>
                <Image
                    style={styles.imageStyle}
                    source={props.uri}
                    resizeMode='cover'
                ></Image>
                <View
                    style={[
                        styles.imageStylePressed,
                        imgPressed ? null : { display: "none" },
                    ]}
                >
                    <Icon
                        name='eye-circle'
                        size={50}
                        color={"black"}
                        onPress={zoomHandle}
                    />
                    <Icon
                        name='delete-circle'
                        size={50}
                        color={"red"}
                        onPress={props.deleteEntryHandler.bind(this, props.id)}
                    />
                </View>
            </Pressable>
        </>
    );
};

export default ImageItem;

const styles = StyleSheet.create({
    imageStyle: {
        position: "relative",
        height: 220,
        width: 330,
        marginVertical: 10,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 3,
    },
    imageStylePressed: {
        position: "absolute",
        height: "25%",
        width: "100%",
        top: "38.5%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffffffb7",
        alignItems: "center",
    },
});
