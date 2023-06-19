import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import Search from '../components/home/Search';
import Categories from '../components/home/Categories';
import ShopItem from '../components/home/ShopItem';
import { ImageBackground } from 'react-native-web';
import BottomTabs from '../components/home/BottomTabs';
import { Divider } from 'react-native-elements';

export default function HomeScreen() {

    const [selectedCategory, setSelectedCategory] = useState('TOUS');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#F6F5F8", flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ImageBackground
                        source={require('../assets/Fichier 11 1.png')}
                    >
                        <Search />
                    </ImageBackground>
                </View>
                <Categories
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />
                <ShopItem selectedCategory={selectedCategory} />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    );
}
