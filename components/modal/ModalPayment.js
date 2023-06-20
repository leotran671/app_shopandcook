import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const ModalPayment = ({ onClose, amountToPay }) => {
    const handlePayment = () => {
        console.log('Paiement effectué !');
        onClose();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose} style={styles.goBackButton}>
                <FontAwesome name="arrow-left" size={16} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Carte bancaire</Text>
            <TextInput style={styles.input} placeholder="Numéro de la carte" />
            <TextInput style={styles.input} placeholder="Date d'expiration (MM/AA)" />
            <TextInput style={styles.input} placeholder="CVC/CVV (3 chiffres)" />
            <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
                <Text style={styles.paymentButtonText}>Payer {amountToPay}€</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    goBackButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    paymentButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    paymentButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalPayment;
