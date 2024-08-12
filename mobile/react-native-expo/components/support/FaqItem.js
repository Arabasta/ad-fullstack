import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Text from "../common/text/Text";

const FaqItem = ({ item, index, isActive, toggleSection }) => (
    <View style={styles.faqItem}>
        {/* Question */}
        <TouchableOpacity onPress={() => toggleSection(index)} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            <MaterialCommunityIcons
                name={isActive ? 'minus' : 'plus'}
                size={20}
                color="#000"
            />
        </TouchableOpacity>
        {/* Answer */}
        <Collapsible collapsed={!isActive}>
            <Text style={styles.answer}>{item.answer}</Text>
        </Collapsible>
    </View>
);

const styles = StyleSheet.create({
    faqItem: {
        marginBottom: 10,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181c37'
    },
    answer: {
        paddingTop: 10,
        fontSize: 14,
        color: '#555',
    },
});

export default FaqItem;
