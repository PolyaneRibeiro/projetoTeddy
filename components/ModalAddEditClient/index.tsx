import { IClientCreateOurEdit } from '@/app/(drawer)/types';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../CustomButton';

interface ModalRemoveProps {
    visible: boolean;
    onClose: () => void;
    handleSubmit: () => void;
    clientData: IClientCreateOurEdit
    onChangeField: (field: 'name' | 'salary' | 'companyValuation', value: string) => void;
}

const ModalAddEditClient: React.FC<ModalRemoveProps> = ({ visible, handleSubmit, onClose, clientData, onChangeField }) => {

    const formatCurrencyBRL = (value: string) => {
        const cleaned = value
            .replace(/[^\d]/g, '')
            .replace(/^0+/, '');

        const numberValue = Number(cleaned) / 100;

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numberValue);

    };

    const isFormValid = Boolean(
        clientData.name &&
        clientData.salary &&
        clientData.companyValuation
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <Pressable
                style={styles.overlay}
                onPress={onClose}
            >
                <Pressable
                    style={styles.modalView}
                    onPress={() => { }}
                >
                    <Text style={styles.modalTitle}>
                        {clientData.id ? 'Editar' : 'Criar'} Cliente
                    </Text>

                    <View>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome:"
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'
                            value={clientData?.name}
                            onChangeText={(text) => onChangeField('name', text)}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Salário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o salário:"
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'
                            value={clientData?.salary}
                            onChangeText={(text) => onChangeField('salary', formatCurrencyBRL(text))}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Valor da empresa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o valor da empresa:"
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'
                            value={clientData?.companyValuation}
                            onChangeText={(text) => onChangeField('companyValuation', formatCurrencyBRL(text))}
                        />
                    </View>

                    <CustomButton
                        title={clientData.id ? 'Editar cliente' : 'Criar cliente'}
                        onPress={handleSubmit}
                        disabled={!isFormValid}
                    />
                </Pressable>
            </Pressable>
        </Modal>

    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        backgroundColor: '#7A7A7A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 20,
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: 700,
        color: '#fff',
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 5
    },
    input: {
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: '#fff',
        backgroundColor: 'transparent',
        maxWidth: '100%',
    },

});

export default ModalAddEditClient;
