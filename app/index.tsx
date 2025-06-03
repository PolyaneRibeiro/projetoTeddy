import CustomButton from "@/components/CustomButton";
import ScreenContainer from "@/components/ScreenContainer";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

const Index = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Olá, seja bem-vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome:"
        placeholderTextColor="#AAAAAA"
        value={name}
        onChangeText={setName}
      />
      <CustomButton title="Entrar" onPress={()=> router.replace("/clients")} size='lg' disabled={name.trim() === ''} />
    </ScreenContainer>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 24, 
  },
  title: {
    fontSize: 32,
  },
  input: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    padding: 12,
    fontSize: 24,
    width: '100%',
  },
});
