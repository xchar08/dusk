import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { AuthContext, CodeContext, HostContext } from '../services/gameState';
import { NODE_STATE_SECURED, NODE_STATE_HACKED, NODE_STATE_OPEN } from '../services/api.service';

export default function OutcomePhase({ onEnd, node }) {
    const { user, setUser } = useContext(AuthContext);
    const { code, setCode } = useContext(CodeContext);
    const { host, setHost } = useContext(HostContext);

    const handleTimeLimit = () => {
        console.log("Time Limit Advance: ", code, user.idToken);
        onEnd();


    }

    return (
        <View>
            <Text>The message was:</Text>
            {node.state === NODE_STATE_SECURED && <Text>Encrypted</Text> /** Inside this block you want to put a text element that says Encrypted. */}
            {node.state === NODE_STATE_HACKED && <Text>Intercepted</Text>/** Inside this block you want to put a text element that says Intercepted.  */}
            {/** Inside this block you want to put a text element that says Time remaining before the next round. */}
            {/** added onlimit for you because it is how we move from outcome phase back to not started for the next round. */}
            <View styles={styles.backDrop}><Timer style={styles.timer} limit={10} onLimit={onEnd}></Timer>
            </View>
            <StatusBar style="auto" />
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    backDrop: {
        borderColor: 'white',
        borderWidth: 0,
        borderRadius: 35,
        backgroundColor: '#000000c0',
        backgroundOpacity: 0.5,
        backdropFilter: 'blur(80px)',
        padding: 5,
        margin: 10,
        paddingBottom: 60,
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'stretch',
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',

        marginLeft: 20,
        marginRight: 20,
    },
    GameLobbyButton: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timer: {
        //alignSelf: 'top', doesnt work
    },


})