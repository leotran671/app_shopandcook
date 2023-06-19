import React from 'react';
import { View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { authentication } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function BottomTabs() {
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(authentication)
            .then(() => {
                navigation.replace('Login');
            })
            .catch((error) => alert(error.message));
    };

    const handleNavigateHome = () => {
        navigation.navigate('Home');
    };

    const handleNavigateRecipe = () => {
        navigation.navigate('Recipe');
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                margin: 10,
                marginHorizontal: 30,
                justifyContent: 'space-between',
            }}
        >
            <Icon icon="home" onPress={handleNavigateHome} />
            <Icon icon="utensils" onPress={handleNavigateRecipe} />
            <Icon icon="user" />
            <Icon icon="sign-out-alt" onPress={handleSignOut} />
        </View>
    );
}

const Icon = ({ icon, onPress }) => (
    <FontAwesome5
        name={icon}
        size={25}
        style={{
            marginBottom: 3,
            alignSelf: 'center',
        }}
        onPress={onPress}
    />
);
