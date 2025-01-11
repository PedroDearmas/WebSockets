import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { style } from "./styles";
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.2:3000";


const socket = io(SOCKET_URL);

export default function Chat() {
  const route = useRoute();
  const { name, selectedValue: room } = route.params as { name: string; selectedValue: string };

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ remetente: string; text: string }[]>([]);

  useEffect(() => {
    socket.emit("entraSala", { room, name });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.emit("sairSala", { room, name });
      socket.off("message");
  };
  }, [room, name]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("enviaMsg", { room, message: message.trim(), remetente: name });
      setMessage("");
    }
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerTitulo}>Olá, {name}</Text>
        <Text style={style.headerSubTitulo}>Você está na sala: {room}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              style.containerMensagem,
              item.remetente === name ? style.mensagemPropria : style.mensagemOutros,
            ]}
          >
            <Text style={style.remetenteTexto}>{item.remetente}</Text>
            <Text style={style.textoMensagem}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={style.containerInput}
      >
        <TextInput
          style={style.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={style.botaoEnviar} onPress={sendMessage}>
          <Text style={style.textoBotaoEnviar}>Enviar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
