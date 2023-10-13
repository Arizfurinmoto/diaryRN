import { View } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

const EntryItem = (props) => {
    return (
        <Pressable style={styles.entryContainer} onPress={props.handleModal}>
            <View style={styles.textContainer}>
                <Text style={styles.idContainer}>{props.id}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateTextContainer}>{props.date}</Text>
                <Text style={styles.dateTextContainer}>{props.time}</Text>
            </View>
        </Pressable>
    );
};

export default EntryItem;

const styles = StyleSheet.create({
    entryContainer: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: "white",
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
    dateTextContainer: {
        textAlign: "center",
        fontWeight: "bold",
    },
    textContainer: {
        width: "50%",
        justifyContent: "center",
    },
    dateContainer: {
        width: "50%",
        justifyContent: "space-around",
        flexDirection: "row",
    },
});
