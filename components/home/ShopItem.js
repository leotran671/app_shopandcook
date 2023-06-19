import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from './../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function ShopItem({ selectedCategory }) {
    const [offres, setOffres] = useState([]);

    useEffect(() => {
        const offresRef = collection(db, 'offres');
        let q = query(offresRef);

        if (selectedCategory && selectedCategory !== 'TOUS') {
            const dlcValue = parseInt(selectedCategory.split("/")[1]);
            q = query(offresRef, where('DLC', '==', dlcValue));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newOffres = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setOffres(newOffres);
        });

        return () => unsubscribe();
    }, [selectedCategory]);

    const navigation = useNavigation();

    const handlePress = (offre) => {
        navigation.navigate('ShopDetail', {
            product: offre
        });
    };

    const formatDLC = (dlc) => {
        return `DLC/${dlc}h`;
    };

    return (
        <View>
            {offres.map((offre) => (
                <TouchableOpacity key={offre.id} onPress={() => handlePress(offre)}>
                    <View style={styles.shopItem}>
                        <ShopImage image={offre.image_url} />
                        <Text style={styles.name}>{offre.nom}</Text>
                        <View style={styles.container}>
                            <View style={styles.dlcNoteContainer}>
                                <Text style={styles.dlcText}>{formatDLC(offre.DLC)}</Text>
                                <Text style={styles.note}>4.1/5</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>{offre.prix_orig}€</Text>
                                <Text style={styles.priceReduced}>{offre.prix_red}€</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const ShopImage = ({ image }) => (
    <>
        <Image source={{ uri: image }} style={{ width: '100%', height: 180 }} />
        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}>
            <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
        </TouchableOpacity>
    </>
);

const styles = StyleSheet.create({
    shopItem: {
        marginTop: 10,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 14.5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dlcNoteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dlcText: {
        fontSize: 14,
        color: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#2A684D',
        borderWidth: 0.785714,
        borderColor: '#2B2B2B',
        borderRadius: 9.42857,
        boxSizing: 'border-box',
        marginRight: 10,
    },
    note: {
        fontSize: 14,
        color: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 0.785714,
        borderColor: '#2B2B2B',
        borderRadius: 9.42857,
        boxSizing: 'border-box',
        marginRight: 10,
    },
    priceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end', // Alignement à droite
    },
    price: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#888',
        marginLeft: 10,
    },
    priceReduced: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2A684D'
    },
});
