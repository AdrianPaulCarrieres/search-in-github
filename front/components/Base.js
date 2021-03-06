import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SocialIcon } from 'react-native-elements';
import * as Linking from 'expo-linking';


const InputScreen = ({ navigation }) => {

    const [gitHubUsername, setGithubUsername] = React.useState("");

    async function getUser() {
        if (gitHubUsername === "") {
            alert("Please type your username");
        } else {
            console.log(gitHubUsername)
            //exp://:19000
            fetch("http://localhost:4000/api" + "/users/" + gitHubUsername)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.login) {
                        navigation.navigate("My Github profile", {
                            user: data
                        })
                    } else {
                        throw new Error("User not found");
                    }
                }).catch(error => {
                    alert("We didn't find an user called " + gitHubUsername);
                });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    onChangeText={setGithubUsername}
                    placeholder="Type your Github username here"
                />

            </View>
            <TouchableOpacity style={{ backgroundColor: "#D97378", borderRadius: 50 }} onPress={() => getUser()}>
                <View style={{ borderRadius: 50, margin: "5%" }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: "center" }}>Get my data!</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const GithubProfile = ({ route, _navigation }) => {

    const { user } = route.params

    function openBrowser() {
        Linking.openURL("https://github.com/AdrianPaulCarrieres")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: user.avatar_url,
                    }}
                    style={styles.image}
                />
                <View style={{ flewDirection: "column", margin: "5%", justifyContent: "center" }}>
                    <Text style={{ color: '#ffff', fontWeight: 'bold' }}>{user.name}</Text>
                    <Text style={{ color: '#dcddde', fontSize: 10 }}>{user.login}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.label}>
                    <Text>????</Text>
                    <Text style={{ color: '#dcddde' }}> {user.company}</Text>
                </View>
                <View style={styles.label}>
                    <Text>????</Text>
                    <Text style={{ color: '#dcddde' }}> {user.location}</Text>
                </View>
                <View style={styles.label}>
                    <Text>????</Text>
                    <Text style={{ color: '#dcddde' }}> {user.bio}</Text>
                </View>
                <View style={styles.label}>
                    <SocialIcon
                        raised={false}
                        light
                        iconSize={10}
                        type='twitter'
                    />
                    <Text style={{ color: '#dcddde' }}> {user.twitter_username}</Text>
                </View>
                <View style={styles.label}>
                    <Text>????</Text>
                    <Text style={{ color: '#dcddde' }}> {user.public_repos} public repos</Text>
                </View>
                <View style={styles.label}>
                    <Text>??????????????????</Text>
                    <Text style={{ color: '#dcddde' }}> {user.followers} followers ?? {user.following} following</Text>
                </View>
                <View style={styles.label}>
                    <Text>????</Text>
                    <Text style={{ color: '#dcddde' }}> joined the {user.created_at.split("T")[0]}</Text>
                </View>

            </View>
            <TouchableOpacity onPress={() => openBrowser()}>
                <SocialIcon
                    title='Go to my profile'
                    button
                    type='github'
                    style={{ backgroundColor: "#D97378" }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 100,
        width: 100,
        height: 100
    },
    text: {
        color: "blue"
    },
    input: {
        height: 40,
        marginHorizontal: 12,
        marginBottom: 50,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 50
    },
    container: {
        flex: 1,
        padding: "5%",
        backgroundColor: "#2f3136",
    },
    header: {
        flexDirection: "row",
        borderRadius: 50,
        padding: "5%",
        backgroundColor: "#36393f",
        margin: "5%"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#36393f",
        margin: "5%"
    },
    label: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        padding: "5%",
    }
});

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 255, 255)',
        background: 'rgb(255, 255, 255)',
        card: 'rgb(32, 34, 37)',
        text: 'rgb(255, 255, 255)',
        border: 'rgb(255, 255, 255)',
        notification: 'rgb(255, 255, 255)',
    }
};

const Stack = createNativeStackNavigator();
const Base = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen name="Welcome!" component={InputScreen} />
                <Stack.Screen name="My Github profile" component={GithubProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Base;