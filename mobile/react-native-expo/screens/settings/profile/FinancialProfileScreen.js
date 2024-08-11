import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Container from "../../../components/common/container/Container";
import Text from "../../../components/common/text/Text";

const FinancialProfileScreen = ({ navigation }) => {
    return (
        <Container>
            <Text style={styles.heading}>Financial Profile</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Annual Income</Text>
                <Text style={styles.value}>$60,000 - $80,000</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Net Worth</Text>
                <Text style={styles.value}>$100,000 - $200,000</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Investment Experience</Text>
                <Text style={styles.value}>Intermediate</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Edit Pressed')}>
                <Text style={styles.buttonText}>Edit Financial Profile</Text>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fieldContainer: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        marginTop: 5,
    },
    button: {
        marginTop: 30,
        paddingVertical: 15,
        backgroundColor: '#000',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FinancialProfileScreen;
