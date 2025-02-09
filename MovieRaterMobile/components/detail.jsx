import { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Detail(props) {
    const { movie, token } = props.route.params;
    const [highlight, setHightlight] = useState(0);


    const editClicked = (movie) => {
        props.navigation.navigate("Edit", { movie: movie, title: movie.title });
    }

    const rateClicked = () => {
        if (highlight > 0 && highlight < 6) {
            fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stars: highlight })
            })
                .then(res => res.json())
                .then(res => {
                    Alert.alert(res.message);
                    setHightlight(0);
                    updatedMovie();
                })
                .catch(error => Alert.alert("Error ", error));

        }
    }

    const updatedMovie = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(res => res.json())
            .then(updatedMovie => {
                props.navigation.setParams({ movie: updatedMovie });
            })
            .catch(error => console.log("Error fetching updated movie data: ", error));
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: movie?.title || "Movie Details",
            headerRight: () => (
                <TouchableOpacity onPress={() => editClicked(movie)}>
                    <Icon name="edit" size={24} color="white" style={{ marginRight: 20 }} />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "orange" },
            headerTintColor: "#fff",
        });
    }, [props.navigation, movie]);

    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                <Icon name="star" size={20} style={movie.avg_rating > 0 ? styles.orange : styles.white} />
                <Icon name="star" size={20} style={movie.avg_rating > 1 ? styles.orange : styles.white} />
                <Icon name="star" size={20} style={movie.avg_rating > 2 ? styles.orange : styles.white} />
                <Icon name="star" size={20} style={movie.avg_rating > 3 ? styles.orange : styles.white} />
                <Icon name="star" size={20} style={movie.avg_rating > 4 ? styles.orange : styles.white} />
                <Text style={styles.noOfRatings}>({movie.no_of_ratings})</Text>
            </View>
            <Text style={styles.description}>{movie.description}</Text>

            <View style={{ borderTopColor: 'white', borderTopWidth: 2, marginTop: 50 }} >
                <Text style={styles.description}>Rate The Movie</Text>
                <View style={styles.starContainer}>
                    <Icon name="star" size={40} style={highlight > 0 ? styles.yellow : styles.gray} onPress={() => setHightlight(1)} />
                    <Icon name="star" size={40} style={highlight > 1 ? styles.yellow : styles.gray} onPress={() => setHightlight(2)} />
                    <Icon name="star" size={40} style={highlight > 2 ? styles.yellow : styles.gray} onPress={() => setHightlight(3)} />
                    <Icon name="star" size={40} style={highlight > 3 ? styles.yellow : styles.gray} onPress={() => setHightlight(4)} />
                    <Icon name="star" size={40} style={highlight > 4 ? styles.yellow : styles.gray} onPress={() => setHightlight(5)} />
                </View>
                <View style={styles.btnContainer}>
                    <Button title="Rate" onPress={() => rateClicked()} />
                </View>
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
    item: {
        flex: 1,
        padding: 10,
        height: 50,
    },
    itemText: {
        fontSize: 24,
    },
    starContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    orange: {
        color: "orange"
    },
    white: {
        color: "white"
    },
    noOfRatings: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20,
    },
    description: {
        fontSize: 20,
        color: 'white',
        padding: 10
    },
    yellow: {
        color: "yellow"
    },
    gray: {
        color: "gray"
    },
    btnContainer: {
        marginTop: 30
    }

});
