import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import VectorImage from '../assets/Vector.png';

const RecipeDetail = ({ route }) => {
    const { recipe } = route.params;

    const instructions = recipe.instructions ? recipe.instructions.split('.').filter((step) => step.trim() !== '') : [];

    const renderStepItem = ({ item, index }) => (
        <View style={styles.stepItem}>
            <Text style={styles.stepText}>{`${index + 1}. ${item.trim()}`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={VectorImage} style={styles.vectorImage} />
                <Text style={styles.title}>Recette</Text>
            </View>
            <ScrollView>
                <Image source={{ uri: recipe.image_url }} style={styles.image} />
                <Text style={styles.heading}>{recipe.name}</Text>

                <View style={styles.panel}>
                    <Text style={styles.subheading}>Ingrédients du panier</Text>
                    <Text style={styles.text}>{recipe.ingredients}</Text>
                </View>

                <View style={styles.panel}>
                    <Text style={styles.subheading}>Instructions de la recette</Text>
                    <FlatList
                        data={instructions}
                        renderItem={renderStepItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 0,
        padding: 16,
        backgroundColor: '#fff',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    vectorImage: {
        width: 24,
        height: 24,
        marginRight: 8,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    panel: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    stepIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    stepText: {
        flex: 1,
        fontSize: 16,
    },
});

export default RecipeDetail;
