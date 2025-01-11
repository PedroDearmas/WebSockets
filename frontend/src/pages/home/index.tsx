import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "./styles";

export default function Home() {
    const [selectedValue, setSelectedValue] = useState("");
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [name, setName] = useState("");
    const navigation = useNavigation();

    const salas = [
        { id: "1", label: "Futebol" },
        { id: "2", label: "Beisebol" },
        { id: "3", label: "Tênis" },
        { id: "4", label: " Basquete" },
    ];

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.title}>Mensageria sobre esportes</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>
                    Selecione a sala que deseja entrar:{" "}
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                        {selectedValue || "Nenhuma sala selecionada"}
                    </Text>
                </Text>
                <TouchableOpacity
                    style={style.boxInput}
                    onPress={() => setPickerVisible(true)}
                >
                    <Text
                        style={{
                            marginLeft: 10,
                            marginTop: 8,
                            color: selectedValue ? "black" : "gray",
                        }}
                    >
                        {selectedValue || "Selecione uma sala..."}
                    </Text>
                </TouchableOpacity>

                <Modal
                    visible={isPickerVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={style.modalContainer}>
                        <View style={style.modalContent}>
                            <Text style={style.modalTitle}>Selecione uma sala:</Text>
                            <FlatList
                                data={salas}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={style.listItem}
                                        onPress={() => {
                                            setSelectedValue(item.label);
                                            setPickerVisible(false);
                                        }}
                                    >
                                        <Text style={style.listItemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                onPress={() => setPickerVisible(false)}
                                style={style.modalCloseButton}
                            >
                                <Text style={style.modalCloseText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Text style={style.titleInput}>Digite seu nome:</Text>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Seu nome"
                    />
                </View>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => {
                        if (!selectedValue || !name) {
                            alert("Por favor, preencha todos os campos.");
                            return;
                        }
                        navigation.navigate("Chat", { name, selectedValue });
                    }}
                >
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
