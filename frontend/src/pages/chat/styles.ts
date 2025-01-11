import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    header: {
        marginTop:-25,
        marginBottom: 20,
    },
    headerTitulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1B5E20",
        marginBottom: 8,
    },
    headerSubTitulo: {
        fontSize: 18,
        color: "#388E3C",
    },
    containerMensagem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        maxWidth: "80%",
    },
    mensagemPropria: {
        alignSelf: "flex-end",
        backgroundColor: "#A5D6A7",
    },
    mensagemOutros: {
        alignSelf: "flex-start",
        backgroundColor: "#E8F5E9",
    },
    remetenteTexto: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1B5E20",
        marginBottom: 5,
    },
    textoMensagem: {
        fontSize: 16,
        color: "#1B5E20",
    },
    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#A5D6A7",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: "#1B5E20",
    },
    botaoEnviar: {
        marginLeft: 10,
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
    },
    textoBotaoEnviar: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
