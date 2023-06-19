import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { authentication } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const handleRegister = () => {
        createUserWithEmailAndPassword(authentication, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email);
                alert(user.email + " registered successfully!");
            })
            .catch((error) => alert(error.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(authentication, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email + " signed in!");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>Connexion/Inscription</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Connexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Inscription</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.terms}>En continuant, j'accepte les <Text style={styles.underline}>Conditions Générales d'utilisation</Text> et de la <Text style={styles.underline}>politique de confidentialité</Text></Text>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F6F5F8",
        paddingTop: 50,  // ajoutez un peu de marge en haut
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 40,
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#045E38",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
        width: 300,
    },
    buttonOutline: {
        backgroundColor: "#045E38",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    terms: {
        marginTop: 40,
        textAlign: 'center'
    },
    underline: {
        textDecorationLine: 'underline',
        color: "#045E38",
    }
});