import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import About from '../components/shopDetail/About';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';

export default function ShopDetail({ route }) {
    const { product } = route.params;
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate('Home');
    };

    const handleBuy = () => {
        console.log('Achat effectué !');
    };

    return (
        <View>
            <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                <FontAwesome name="arrow-left" size={16} color="#fff" style={styles.buttonIcon} />
            </TouchableOpacity>
            <About product={product} />
            <TouchableOpacity onPress={handleBuy} style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Acheter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonIcon: {
        alignSelf: 'center',
    },
    buyButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    buyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
