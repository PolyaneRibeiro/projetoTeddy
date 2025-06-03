import { IClients } from "@/app/(drawer)/types";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatPrice } from "../utils";


interface ICard {
    data: IClients
    onPressMore: () => void
    onPressEdit?: () => void
    onPressRemove?: () => void
    isSelectedScreen?: boolean
    isSelected?: boolean
}

const Card = ({ data, onPressMore, onPressEdit, onPressRemove, isSelectedScreen, isSelected }: ICard) => {
    return (
        <View style={styles.card}>
            <View style={styles.containerText}>
                <Text style={styles.name}>{data.name}</Text>
                <Text>Salário: {formatPrice(data.salary)}</Text>
                <Text>Empresa: {formatPrice(data.companyValuation)}</Text>
            </View>
            {isSelectedScreen ? (
                <View style={styles.iconContainerMinus} testID="icon-container-minus">
                    <TouchableOpacity onPress={onPressMore} testID="more-button">
                        <Image source={require('@/assets/images/minus.png')} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.iconContainer} testID="icon-container">
                    <TouchableOpacity onPress={onPressMore} testID="more-button">
                        <Image
                            source={
                                isSelected
                                    ? require('@/assets/images/minus.png')
                                    : require('@/assets/images/more.png')
                            }
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressEdit} testID="edit-button">
                        <Image source={require('@/assets/images/edit.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressRemove} testID="remove-button">
                        <Image source={require('@/assets/images/trash.png')} />
                    </TouchableOpacity>
                </View>)}

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 4px 0px #0000001A',
        gap: 10,
    },
    containerText: {
        alignItems: 'center',
        gap: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 700,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 12,
        justifyContent: 'space-between'
    },
    iconContainerMinus: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});


export default Card