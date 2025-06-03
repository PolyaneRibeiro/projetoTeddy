import Card from "@/components/Card";
import CustomButton from "@/components/CustomButton";
import Loading from "@/components/Loading";
import ScreenContainer from "@/components/ScreenContainer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import { IClients } from "./types";

const ClientsSelected = () => {
  const [listClients, setListClients] = useState<IClients[]>()


  const loadSavedClients = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedClients');
      if (jsonValue) {
        const parsed = JSON.parse(jsonValue);
        setListClients(parsed);
      } else {
        setListClients([]);
      }
    } catch (err) {
      console.error('Erro ao carregar clientes salvos:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedClients();
    }, [])
  );


  const removeClientFromStorage = async (id: number) => {
    try {
      const saved = await AsyncStorage.getItem('savedClients');
      const clients: IClients[] = saved ? JSON.parse(saved) : [];

      const filteredClients = clients.filter(client => client.id !== id);

      await AsyncStorage.setItem('savedClients', JSON.stringify(filteredClients));
      setListClients(filteredClients);

      Toast.show({
        type: 'success',
        text1: 'Cliente deselecionado com sucesso',
        position: 'top',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao deselecionar cliente',
      });
    }
  };


  return (
    <ScrollView>
      {listClients ? (
        <ScreenContainer>
          <Text style={styles.title}>Clientes selecionados:</Text>
          {listClients?.map(item => {
            return (
              <Card
                data={item}
                key={item.id}
                onPressMore={() => removeClientFromStorage(item.id)}
                isSelectedScreen
              />
            )
          })}
          <CustomButton
            variant='outline'
            size='sm'
            title='Limpar clientes selecionados'
            onPress={async () => {
              try {
                await AsyncStorage.removeItem('savedClients');
                Toast.show({
                  type: 'success',
                  text1: 'Clientes selecionados limpos com sucesso',
                  position: 'top',
                });
                setListClients([])
              } catch (err) {
                Toast.show({
                  type: 'error',
                  text1: 'Erro ao limpar clientes selecionados',
                  position: 'top',
                });
              }
            }} />
        </ScreenContainer>

      ) : <Loading/>}
    </ScrollView>
  );
};

export default ClientsSelected;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 700
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
