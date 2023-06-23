import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const categories = ["DLC/12H", "DLC/24H", "DLC/48H", "DLC/72H", "TOUS"];

export default function Categories({ selectedCategory, onCategorySelect }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                Limite le gaspillage & économise
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
                Plus la DLC sera courte, plus les offres sont avantageuses !
            </Text>
            <ScrollView horizontal>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.categoryContainer,
                            selectedCategory === category && styles.selectedCategory
                        ]}
                        onPress={() => onCategorySelect(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category && styles.selectedCategoryText
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        alignItems: 'center',
    },
    categoryContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        margin: 3,
        padding: 3,
        backgroundColor: '#fff',
    },
    selectedCategory: {
        borderColor: '#045E38',
    },
    categoryText: {
        fontSize: 16,
    },
    selectedCategoryText: {
        color: '#045E38',
        fontWeight: 'bold',
    },
});
