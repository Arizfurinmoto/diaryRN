import { View } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";
import  Icon  from "@expo/vector-icons/MaterialCommunityIcons";

const EntryItem = (props) => {
    return (
        <Pressable style={styles.entryContainer} onPress={props.handleModal}>
            {/* <View style={styles.idContainer}>
                <Text style={styles.id}>{props.id}</Text>
            </View> */}
            <View style={styles.dateContainer}>
                <Text style={styles.dateTextContainer}>{props.date}</Text>
                <Text style={styles.dateTextContainer}>{props.time}</Text>
            </View>
            <Icon
                name='delete-circle'
                size={30}
                color={"#000"}
                onPress={props.onDeleteItem.bind(this, props.id)}
            />
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
    id: {
        backgroundColor: "black",
        borderRadius: 30,
        width: 25,
        height: 25,
        color: "white",
        textAlign: "center",
        textAlignVertical:"center",
        fontWeight: "bold",
    },
    dateTextContainer: {
        textAlign: "center",
        fontWeight: "bold",
    },
    idContainer: {
        width: 30,
        height: 30,
        justifyContent: "center",
        // backgroundColor: "red",
    },
    dateContainer: {
        width: "90%",
        justifyContent: "space-around",
        flexDirection: "row",
        // backgroundColor: "blue",
    },
});
