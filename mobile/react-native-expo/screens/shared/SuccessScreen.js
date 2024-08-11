import React from 'react';
import { StyleSheet } from 'react-native';
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from "../../components/common/text/Text";
import Container from "../../components/common/container/Container";

const SuccessScreen = ({ navigation, route }) => {
    const { message = 'Operation Successful!', returnScreen } = route.params || {};

    return (
        <Container>
            <Icon name="check-circle" size={200} color="green" style={styles.icon} />

            <Text style={styles.message}>{message}</Text>

            <ButtonPrimary
                title="Return"
                onPress={() => navigation.navigate(returnScreen)}
                style={styles.button}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginBottom: 20,
        alignSelf: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
    },
});

export default SuccessScreen;
