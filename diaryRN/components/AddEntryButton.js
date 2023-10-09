import { Pressable, Text, StyleSheet } from "react-native";

const AddEntryButton = (props) => {
    return (
        <Pressable style={styles.addEntryButton} onPress={props.handleModal}>
            <Text style={styles.addEntryText}>NEW ENTRY</Text>
        </Pressable>
    );
};

export default AddEntryButton;

const styles = StyleSheet.create({
    addEntryButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        padding: 10,
        marginTop: 40,
        width: "60%",
        borderRadius: 14,
        elevation: 10,
    },
    addEntryText: {
        color: "white",
        fontWeight: "bold"
    },
});