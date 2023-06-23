import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const ModalPayment = ({ onClose, amountToPay }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expirationDateError, setExpirationDateError] = useState('');
    const [cvcError, setCvcError] = useState('');

    const handlePayment = () => {
        console.log('Paiement effectué !');
        onClose();
    };

    const validateCardNumber = () => {
        // Vérifier le format de la carte (exemple : xxxx xxxx xxxx xxxx)
        const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        if (!cardNumberRegex.test(cardNumber)) {
            setCardNumberError('Numéro de carte invalide');
        } else {
            setCardNumberError('');
        }
    };

    const validateExpirationDate = () => {
        // Vérifier le format de la date d'expiration (exemple : MM/AA)
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expirationDateRegex.test(expirationDate)) {
            setExpirationDateError('Date d\'expiration invalide');
        } else {
            setExpirationDateError('');
        }
    };

    const validateCvc = () => {
        // Vérifier le format du CVC (exemple : 3 chiffres)
        const cvcRegex = /^\d{3}$/;
        if (!cvcRegex.test(cvc)) {
            setCvcError('CVC invalide');
        } else {
            setCvcError('');
        }
    };

    const isFormValid = cardNumber && expirationDate && cvc && !cardNumberError && !expirationDateError && !cvcError;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.goBackButton}>
                    <FontAwesome name="arrow-left" size={16} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Carte bancaire</Text>
            </View>
            <Text style={styles.textDivider}></Text>
            <TextInput
                style={[styles.input, cardNumberError && styles.inputError]}
                placeholder="Numéro de la carte"
                value={cardNumber}
                onChangeText={setCardNumber}
                onBlur={validateCardNumber}
            />
            {cardNumberError ? <Text style={styles.errorText}>{cardNumberError}</Text> : null}
            <TextInput
                style={[styles.input, expirationDateError && styles.inputError]}
                placeholder="Date d'expiration (MM/AA)"
                value={expirationDate}
                onChangeText={setExpirationDate}
                onBlur={validateExpirationDate}
            />
            {expirationDateError ? <Text style={styles.errorText}>{expirationDateError}</Text> : null}
            <TextInput
                style={[styles.input, cvcError && styles.inputError]}
                placeholder="CVC/CVV (3 chiffres)"
                value={cvc}
                onChangeText={setCvc}
                onBlur={validateCvc}
            />
            {cvcError ? <Text style={styles.errorText}>{cvcError}</Text> : null}
            <TouchableOpacity
                onPress={handlePayment}
                style={[styles.paymentButton, !isFormValid && styles.disabledButton]}
                disabled={!isFormValid}
            >
                <Text style={styles.paymentButtonText}>Payer</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBackButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
    paymentButton: {
        backgroundColor: '#045E38',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 250,
    },
    disabledButton: {
        opacity: 0.5,
    },
    paymentButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default ModalPayment;
