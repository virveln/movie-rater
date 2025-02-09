import { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Edit(props) {
    const { movie, token } = props.route.params;
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);

    const saveMovie = () => {
        if (movie.id) {
            fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token 6331fa24fbd100bae39c3bd6d7f6ae4bd59b7bdc`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(movie => { props.navigation.navigate("Detail", { movie: movie, title: movie.title }) })
                .catch(error => console.log(error));
        } else {
            fetch(`http://127.0.0.1:8000/api/movies/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(movie => { props.navigation.navigate("List of Movies") })
                .catch(error => console.log(error));
        }

        // props.navigation.goBack();
    }

    const removeClicked = (movie) => {
        if (movie.id) {
            fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token 6331fa24fbd100bae39c3bd6d7f6ae4bd59b7bdc`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => { props.navigation.replace("List of Movies") })
                .catch(error => console.log(error));
        }
    }

    useLayoutEffect(() => {
        if (movie.id) props.navigation.setOptions({ title: movie?.title ? `Edit ${movie.title}` : "Edit" });
        else props.navigation.setOptions({ title: "Add New Movie" });
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => removeClicked(movie)}>
                    <Icon name="trash" size={24} color="white" style={{ marginRight: 20 }} />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "orange" },
            headerTintColor: "#fff",
        });
    }, [props.navigation, movie]);


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <View style={styles.btnContainer}>
                <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
            </View>
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
    btnContainer: {
        marginTop: 30
    }

});
