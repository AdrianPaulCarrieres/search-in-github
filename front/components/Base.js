import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { mockApiUser } from '../core/proxy';
import { SocialIcon } from 'react-native-elements'


const InputScreen = ({ navigation }) => {

    const [gitHubUsername, setGithubUsername] = React.useState("");

    async function getUser() {
        if (gitHubUsername === "") {
            alert("Please type your username");
        } else {
            let user = await mockApiUser();
            if (user) {
                navigation.navigate("My Github profile", {
                    user: user
                })
            } else {
                alert("We didn't find an user called " + gitHubUsername);
            }
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={setGithubUsername}
                placeholder="Type your Github username here"
            />
            <TouchableOpacity onPress={() => getUser()} >
                <Text style={styles.text}>Get my data!</Text>
            </TouchableOpacity>
        </View>
    );
}

const GithubProfile = ({ route, navigation }) => {

    const { user } = route.params

    function openBrowser() {
        Linking.canOpenURL("https://github.com/AdrianPaulCarrieres").then(supported => {
            if (supported) {
                alert("We didn't find an user called " + gitHubUsername);

                Linking.openURL("https://github.com/AdrianPaulCarrieres");
            } else {
                alert("We didn't find an user called " + gitHubUsername);
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: user.avatar_url,
                    }}
                    style={{ width: 100, height: 100 }}
                />
                <View style={{ flewDirection: "column", margin: "5%", justifyContent: "center" }}>
                    <Text>{user.name}</Text>
                    <Text style={{ fontSize: 10 }}>{user.login}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.label}>
                    <Text>🏢</Text>
                    <Text> {user.company}</Text>
                </View>
                <View style={styles.label}>
                    <Text>📭</Text>
                    <Text> {user.location}</Text>
                </View>
                <View style={styles.label}>
                    <Text>🧑</Text>
                    <Text> {user.bio}</Text>
                </View>
                <View style={styles.label}>
                    <SocialIcon
                        raised={false}
                        iconSize={7}
                        type='twitter'
                    />
                    <Text> {user.twitter_username}</Text>
                </View>
                <View style={styles.label}>
                    <Text>📚</Text>
                    <Text> {user.public_repos} public repos</Text>
                </View>
                <View style={styles.label}>
                    <Text>🧑‍🤝‍🧑</Text>
                    <Text> {user.followers} followers · {user.following} following</Text>
                </View>
                <View style={styles.label}>
                    <Text>📆</Text>
                    <Text> joined the {user.created_at.split("T")[0]}</Text>
                </View>

            </View>
            <TouchableOpacity>
                <SocialIcon
                    title='Go to my profile'
                    button
                    type='github'
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "blue"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        padding: "5%"
    },
    header: {
        flexDirection: "row",
    },
    content: {
        flex: 1,
        padding: "5%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    label: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "5%",
    }
});

const Stack = createNativeStackNavigator();
const Base = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome!" component={InputScreen} />
                <Stack.Screen name="My Github profile" component={GithubProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Base;