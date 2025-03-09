import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 16,
        color: "#333333",
    },
    listContent: {
        paddingBottom: 20,
    },
    sectionHeader: {
        backgroundColor: "#f8f8f8",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#007aff",
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    avatarText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#333333",
    },
    contactPhone: {
        fontSize: 14,
        color: "#666666",
        marginBottom: 2,
    },
    contactEmail: {
        fontSize: 14,
        color: "#666666",
        fontStyle: "italic",
    },
    iconButton: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#ff3b30",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333333",
        marginTop: 16,
        textAlign: "center",
    },
    emptySubText: {
        fontSize: 14,
        color: "#666666",
        marginTop: 8,
        textAlign: "center",
    },
});