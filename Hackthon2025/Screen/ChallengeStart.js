import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChallengeStart() {
    const [friend, setFriend] = useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Good Habit, Better Life!</Text>

            {/* Custom Start the Challenge Button */}
            <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('ChallengeDetail')}
            >
                <Text style={styles.startButtonText}>Start the Challenge</Text>
            </TouchableOpacity>

            {/* Find a new friend */}
            <Text style={styles.label}>Find a New Friend?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter friend's username or email"
                value={friend}
                onChangeText={setFriend}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => alert('This will add friend later!')}
            >
                <Text style={styles.addButtonText}>Add Friend</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: '#FFE5B4',
    },
    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#D2691E',
        textAlign: 'center',
        marginBottom: 70,
    },
    label: {
        fontSize: 20,
        color: '#8B4513',
        marginBottom: 12,
        marginLeft: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D2691E',
        borderRadius: 12,
        backgroundColor: '#FFF8F0',
        padding: 10,
        marginBottom: 20,
        height: 50,
    },
    startButton: {
        marginBottom: 70,
        backgroundColor: '#FFDAB9',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',

    },
    startButtonText: {
        fontSize: 22,
        color: '#8B4513',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FFDAB9',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 22,
        color: '#8B4513',
        fontWeight: 'bold',
    },
});