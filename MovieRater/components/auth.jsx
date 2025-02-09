import { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [regView, setRegView] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('MR_Token');
            if (token && token.trim() !== "") {
                props.navigation.replace("List of Movies");
            } else {
                setLoading(false);
            }
        };
        checkToken();
    }, []);


    const auth = () => {
        const url = regView ? `http://127.0.0.1:8000/api/users/` : `http://127.0.0.1:8000/auth/`;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (!regView && res.token) {
                    AsyncStorage.setItem('MR_Token', res.token);
                    props.navigation.replace("List of Movies"); // Navigate after login
                } else if (regView) {
                    setRegView(false);  // Switch to login view after registering
                }
            })
            .catch(error => console.log(error));
    };

    const toggleView = () => {
        setRegView(!regView);
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
                autoCapitalize={'none'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
            <View style={styles.btnContainer}>
                <Button onPress={() => auth()} title={regView ? 'Register' : 'Login'} />
            </View>
            <TouchableOpacity onPress={() => toggleView()}>
                {regView ?
                    <Text style={styles.viewText}>Already have an account? Login here.</Text> :
                    <Text style={styles.viewText}>Dont have an account? Register here.</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    label: {
        fontSize: 24,
        color: 'white',
        padding: 10
    },
    input: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    btnContainer: {
        marginTop: 30
    }

});
