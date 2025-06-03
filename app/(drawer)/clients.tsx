import Card from "@/components/Card";
import CustomButton from "@/components/CustomButton";
import ModalAddEditClient from "@/components/ModalAddEditClient";
import ModalRemove from "@/components/ModalRemove";
import Pagination from "@/components/Pagination";
import ScreenContainer from "@/components/ScreenContainer";
import { formatPrice } from "@/components/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { IClientCreateOurEdit, IClientRemove, IClients } from "./types";

interface IListClients {
  clients: IClients[]
  currentPage: number
  totalPages: number
}

const Clients = () => {
  const [listClients, setListClients] = useState<IListClients>()
  const [limitPage, setLimitPage] = useState(5)
  const [showAddClient, setShowAddClient] = useState(false)
  const [showRemoveClient, setShowRemoveClient] = useState(false)
  const [page, setPage] = useState(1)
  const [clientRemove, setClientRemove] = useState<IClientRemove>()
  const [clientData, setClientData] = useState<IClientCreateOurEdit>({
    name: '',
    salary: '',
    companyValuation: '',
  })
  const [selectedClients, setSelectedClients] = useState<IClients[]>([]);


  const fetchClients = async () => {
    try {
      const response = await axios.get(`https://boasorte.teddybackoffice.com.br/users?page=${page}&limit=${limitPage}`);
      setListClients(response.data);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar listagem de clientes',
        position: 'top',
      });;
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, limitPage]);

  const loadSelected = async () => {
    const saved = await AsyncStorage.getItem('savedClients');
    setSelectedClients(saved ? JSON.parse(saved) : []);
  };

  useFocusEffect(
    useCallback(() => {
      loadSelected();
    }, [])
  );

  const handleDelete = async () => {
    try {
      await axios.delete(`https://boasorte.teddybackoffice.com.br/users/${clientRemove?.id}`);
      setClientRemove(undefined)
      setShowRemoveClient(false)
      Toast.show({
        type: 'success',
        text1: 'Cliente deletado com sucesso',
        position: 'top',
      });
      fetchClients()
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao deletar cliente',
        position: 'top',
      });
    }
  };

  const handleCreate = async () => {
    if (!clientData) return;

    function parseCurrency(value: string | number): number {
      if (typeof value === 'number') return value;

      const cleaned = value
        .replace(/[^\d,.-]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

      return Number(cleaned);
    }

    try {
      const { id, ...rest } = clientData;
      const preparedData = {
        ...rest,
        salary: parseCurrency(clientData.salary),
        companyValuation: parseCurrency(clientData.companyValuation),
      };

      if (clientData.id) {
        await axios.patch(`https://boasorte.teddybackoffice.com.br/users/${clientData.id}`, preparedData);

        Toast.show({
          type: 'success',
          text1: 'Cliente editado com sucesso',
          position: 'top',
        });
      } else {
        await axios.post(`https://boasorte.teddybackoffice.com.br/users`, preparedData);

        Toast.show({
          type: 'success',
          text1: 'Cliente criado com sucesso',
          position: 'top',
        });
      }

      setShowAddClient(false);
      fetchClients();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar/editar cliente',
        position: 'top',
      });
    }
  };

  const handleChange = (field: 'name' | 'salary' | 'companyValuation', value: string) => {
    setClientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onPressMore = async (client: IClients) => {
    try {
      const saved = await AsyncStorage.getItem('savedClients');
      let parsed: IClients[] = saved ? JSON.parse(saved) : [];

      const exists = parsed.some((c) => c.id === client.id);

      if (exists) {
        parsed = parsed.filter((c) => c.id !== client.id);

        Toast.show({
          type: 'info',
          text1: 'Cliente deselecionado com sucesso',
          position: 'top',
        });
      } else {
        parsed.push(client);

        Toast.show({
          type: 'success',
          text1: 'Cliente selecionado com sucesso',
          position: 'top',
        });
      }

      await AsyncStorage.setItem('savedClients', JSON.stringify(parsed));
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao selecionar/deselecionar cliente',
        position: 'top',
      });
    }
    loadSelected()
  };

  return (
    <ScrollView>
      {listClients ? (
        <ScreenContainer>
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: "bold" }}>
              {listClients?.clients.length}
            </Text>{' '}
            clientes encontrados nessa página:
          </Text>
          <View style={styles.containerSelect}>
            <Text style={{ fontSize: 18 }}>Clientes por página:</Text>
            <Picker
              selectedValue={limitPage}
              onValueChange={(itemValue) => setLimitPage(itemValue)}
              style={styles.select}
            >
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="20" value={20} />
              <Picker.Item label="50" value={50} />
            </Picker>
          </View>
          {listClients?.clients.map(item => {
            return (
              <Card
                data={item}
                key={item.id}
                onPressEdit={() => {
                  setClientData({
                    id: item.id,
                    name: item.name,
                    salary: formatPrice(item.salary),
                    companyValuation: formatPrice(item.companyValuation)
                  })
                  setShowAddClient(true)
                }}
                onPressMore={() => onPressMore(item)}
                onPressRemove={() => {
                  setClientRemove({ id: item.id, name: item.name })
                  setShowRemoveClient(true)
                }}
                isSelected={selectedClients.some(sc => sc.id === item.id)}
              />
            )
          })}
          <CustomButton
            variant='outline'
            size='sm'
            title='Criar cliente'
            onPress={() => {
              setShowAddClient(true)
              setClientData({
                id: undefined,
                name: '',
                salary: '',
                companyValuation: ''
              })
            }} />
          {listClients.totalPages > 1 &&
            <Pagination
              currentPage={listClients.currentPage}
              totalPages={listClients.totalPages}
              onPageChange={(page) => setPage(page)}
            />
          }
          <ModalRemove
            visible={showRemoveClient}
            onClose={() => {
              setShowRemoveClient(false)
              setClientRemove(undefined)
            }}
            handleDelete={handleDelete}
            clientRemove={clientRemove}
          />
          <ModalAddEditClient
            visible={showAddClient}
            onClose={() => setShowAddClient(false)}
            handleSubmit={handleCreate}
            clientData={clientData}
            onChangeField={handleChange}
          />

        </ScreenContainer>

      ) : <Text>Carregando</Text>}
    </ScrollView>
  );
};

export default Clients;

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
  select: {
    height: 30,
    width: 50,
    backgroundColor: '#f0f0f0',
    color: '#333',
    borderRadius: 8,
    marginTop: 8,
    borderColor: '#D9D9D9',
    borderWidth: 2,
  },
  containerSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});
