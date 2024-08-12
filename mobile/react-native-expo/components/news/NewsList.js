import React from 'react';
import { FlatList, View, Text } from 'react-native';
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
    console.log("NewsList props:", news);

    if (!Array.isArray(news) || news.length === 0) {
        return <Text>No news available.</Text>;
    }

    return (
        <FlatList
            data={news}
            renderItem={({ item }) => (
                <View>
                    <NewsItem
                        title={item.title}
                        url={item.article_url}
                        author={item.author}
                        description={item.description}
                        imageUrl={item.image_url}
                    />
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default NewsList;
