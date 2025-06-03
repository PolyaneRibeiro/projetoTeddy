import { IClientRemove } from '@/app/(drawer)/types';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalRemoveProps {
  visible: boolean;
  onClose: () => void;
  handleDelete: () => void;
  clientRemove: IClientRemove | undefined
}

const ModalRemove: React.FC<ModalRemoveProps> = ({ visible, handleDelete, onClose, clientRemove }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.containerText}>
              <Text style={styles.modalTitle}>Excluir cliente:</Text>
              <Text style={styles.modalText}>Tem certeza que deseja excluir o cliente {clientRemove?.name}?</Text>
            </View>
            <TouchableOpacity onPress={handleDelete} style={styles.confirm}>
              <Text style={styles.textConfirm}>Excluir cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.textCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#353535',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
  },
  containerText: {
    paddingHorizontal: 35,
    paddingTop: 25,
  },
  cancel: {
    paddingBottom: 25,

  },
  textCancel: {
    color: '#0A84FF',
    fontWeight: 400,
    fontSize: 17
  },
  confirm: {
    borderWidth: 1,
    borderColor: '#565555',
    minWidth: '100%',
    padding: 12,
    marginBottom: 12
  },
  textConfirm: {
    color: '#0A84FF',
    fontWeight: 600,
    fontSize: 17,
    textAlign: 'center'
  }
});

export default ModalRemove;
