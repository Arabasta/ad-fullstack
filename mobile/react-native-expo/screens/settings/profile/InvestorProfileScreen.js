import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Container from "../../../components/common/container/Container";
import Text from "../../../components/common/text/Text";

const InvestorProfileScreen = ({ navigation }) => {
    return (
        <Container>
            <Text style={styles.heading}>Investor Profile</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Risk Tolerance</Text>
                <Text style={styles.value}>Moderate</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Investment Goals</Text>
                <Text style={styles.value}>Growth</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Time Horizon</Text>
                <Text style={styles.value}>5-10 years</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Edit Pressed')}>
                <Text style={styles.buttonText}>Edit Investor Profile</Text>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
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

export default InvestorProfileScreen;
