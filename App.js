import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    const [sound, setSound] = useState();

    async function loadAndPlaySound() {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
            require('./assets/dog_panting.mp3'),
            { shouldPlay: true } // Automatically start playing after loading
        );
        setSound(loadedSound);
    }

    useEffect(() => {
        loadAndPlaySound();

        // This function will be called once component is unmounted
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/dog.gif')}
                style={styles.gifStyle}
            />
            <Pressable style={styles.buttonStyle} >
                <Text style={styles.buttonText}>Play</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    gifStyle: {
        width: 350,
        height: 350,
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: '#964B00',
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 20,
       
        
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 38,
    },
});
