import { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieList(props) {

    const [movies, setMovies] = useState([]);
    const [token, setToken] = useState(null);
    const getData = async () => {
        const storedToken = await AsyncStorage.getItem('MR_Token');
        if (storedToken) {
            setToken(storedToken);
            getMovies(storedToken);
        }
        else props.navigation.navigate("Login");
    };

    useEffect(() => {
        getData();
    }, []);

    const getMovies = (authToken) => {
        fetch('http://127.0.0.1:8000/api/movies/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`
            }
        })
            .then(res => res.json())
            .then(jsonRes => setMovies(jsonRes))
            .catch(error => console.log(error));
    }

    const movieClicked = (movie) => {
        console.log("är token null?: " + token);
        props.navigation.navigate("Detail", { movie: movie, title: movie.title, token: token });
    }

    const addClicked = () => {
        props.navigation.navigate("Edit", { movie: { title: '', description: '' } });
    }

    const logoutUser = async () => {
        try {
            await AsyncStorage.removeItem('MR_Token');
            props.navigation.navigate("Login");
        } catch (error) {
            console.log('Error logging out:', error);
        }
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => addClicked()}>
                    <Icon name="plus-circle" size={24} color="white" style={{ marginRight: 20 }} />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "orange" },
            headerTintColor: "#fff",
        });
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/mr-logo.png')}
                style={{ width: '100%', height: 135, paddingTop: 30, resizeMode: 'contain' }}
            />
            <FlatList
                data={movies}
                keyExtractor={(index) => index.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => movieClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText} >{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity onPress={() => logoutUser()}>
                <Icon name="sign-out" style={styles.logout} />
            </TouchableOpacity>
            {/* <a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by fjstudio - Flaticon</a> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35',
    },
    itemText: {
        color: '#fff',
        fontSize: 24,
    },
    logout: {
        fontSize: 24,
        color: 'white',
        margin: 15,
        
    }

});
