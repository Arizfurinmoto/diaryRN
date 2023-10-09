import { View } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";
import EntryDisplay from "./EntryDisplay";


const EntryItem = (props) => {
    return (
        <>
            <EntryDisplay
                visible={props.visible}
                date={props.date}
                desc={props.text}
                handleModal={props.handleModal}
            />
            <Pressable
                style={styles.entryContainer}
                onPress={props.handleModal}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.idContainer}>{props.id}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.dateContainer}>{props.date}</Text>
                </View>
            </Pressable>
        </>
    );
}

export default EntryItem;

const styles = StyleSheet.create({
    entryContainer: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: "white", //#bbbccc
        borderRadius: 15,
        elevation: 5,
        marginVertical: 4,
    },
    idContainer: {
        backgroundColor: "black",
        borderRadius: 30,
        width: 20,
        height: 20,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    dateContainer: {
        textAlign: "center",
        fontWeight: "bold",
    },
    textContainer: {
        width: "50%",
        justifyContent: "center"
    },
});