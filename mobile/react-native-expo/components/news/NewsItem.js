import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from "../../components/common/text/Text";
import TouchableOpacity from "../../components/common/button/TouchableOpacity";
import { Linking } from 'react-native';

const NewsItem = ({ item }) => {
    const openUrl = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <TouchableOpacity onPress={() => openUrl(item.article_url)}>
            <View style={styles.newsItem}>
                {item.image_url && (
                    <Image source={{ uri: item.image_url }} style={styles.newsImage} />
                )}

                <View style={styles.textContainer}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsDate}>{new Date(item.published_utc).toLocaleDateString()}</Text>
                    <Text style={styles.newsContent} numberOfLines={3}>{item.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    newsItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    newsImage: {
        width: 100,
        height: 100,
        marginRight: 15,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    newsDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    newsContent: {
        fontSize: 14,
        color: '#333',
    },
});

export default NewsItem;
