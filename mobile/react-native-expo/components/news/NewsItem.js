import React from 'react';
import TouchableOpacity from "../common/button/TouchableOpacity";
import {Linking} from "react-native";
import Text from "../common/text/Text";

const NewsItem = ({ title, url, author, description, image_url }) => {
    console.log("NewsItem props:", { title, url, author, description, image_url });

    return (
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
            {image_url && (
                <Image
                    source={{ uri: image_url }}
                    style={{ height: 150, width: '100%' }}
                />
            )}
            <Text>{title}</Text>
            {author && (
                <Text>Author: {author}</Text>
            )}
            <Text numberOfLines={3}>{description}</Text>
            <Text>Read full article</Text>
        </TouchableOpacity>
    );
};

export default NewsItem;
