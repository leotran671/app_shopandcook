import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function About({ product }) {
    const { Catégorie, image_url, DLC, prix_orig, prix_red, nom, description } = product;

    const formatDLC = (dlc) => {
        return `DLC/${dlc}h`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.category}>{Catégorie}</Text>
            <Image source={{ uri: image_url }} style={styles.image} />
            <View style={styles.dlcContainer}>
                <Text style={styles.dlcText}>{formatDLC(DLC)}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{`${prix_orig}€`}</Text>
                <Text style={styles.priceReduced}>{`${prix_red}€`}</Text>
            </View>
            <Text style={styles.name}>{nom}</Text>
            <Text style={styles.info}>Information essentielles</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    category: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: 400,
        height: 250,
        marginBottom: 10,
        alignSelf: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    dlcContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    dlcText: {
        fontSize: 14,
        color: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#2B2B2B',
        borderWidth: 0.785714,
        borderColor: '#2B2B2B',
        borderRadius: 9.42857,
        boxSizing: 'border-box',
    },
    price: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#888',
        marginBottom: 5,
    },
    priceReduced: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left'
    },
    info: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
    },
});

