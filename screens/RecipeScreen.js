import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import BottomTabs from '../components/home/BottomTabs';
import { Divider } from 'react-native-elements';

export default function RecipeScreen({ navigation }) {
    const [enteredIngredients, setEnteredIngredients] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchDefaultRecipes();
    }, []);

    const fetchDefaultRecipes = async () => {
        const recipesRef = collection(db, 'recette');
        const querySnapshot = await getDocs(recipesRef);
        const defaultRecipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setSearchResults(defaultRecipes);
    };

    const handleSearch = async () => {
        if (!enteredIngredients) {
            fetchDefaultRecipes();
            return;
        }

        const selectedIngredients = normalize(enteredIngredients)
            .split(',')
            .map((ingredient) => ingredient.trim().toLowerCase());

        const recipesRef = collection(db, 'recette');
        const querySnapshot = await getDocs(recipesRef);

        const matchingRecipes = querySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter((recipe) => {
                const recipeIngredients = recipe.ingredients
                    .split(',')
                    .map((ingredient) => normalize(ingredient.trim().toLowerCase()));
                return selectedIngredients.every((ingredient) =>
                    recipeIngredients.some((recipeIngredient) =>
                        recipeIngredient.includes(ingredient)
                    )
                );
            });

        setSearchResults(matchingRecipes);
    };

    const handleRecipeSelect = (recipe) => {
        navigation.navigate('RecipeDetail', { recipe });
    };

    const normalize = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.textAccroche}>
                    <Text style={styles.boldText}>Dites nous ce que vous avez...</Text>
                    On vous proposera les aliments qui vous manquent !
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez les ingrédients séparés par des virgules"
                    onChangeText={(text) => setEnteredIngredients(text)}
                    value={enteredIngredients}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Générer la recette</Text>
                </TouchableOpacity>

                <Text style={styles.heading}>Idées recettes:</Text>
                {searchResults.map((recipe) => (
                    <TouchableOpacity
                        key={recipe.id}
                        style={styles.recipePanel}
                        onPress={() => handleRecipeSelect(recipe)}
                    >
                        <Image source={{ uri: recipe.image_url }} style={styles.recipeImage} />
                        <Text style={styles.recipeName}>{recipe.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    textAccroche: {
        marginBottom: '2rem'
    },
    boldText: {
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 15,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#045E38',
        borderRadius: 20,
        padding: 10,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    recipePanel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
    },
    recipeImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
        marginRight: 16,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});
