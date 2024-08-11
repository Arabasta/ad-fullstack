import { ScrollView as NativeScrollView } from 'react-native';

// Parent component for pages needing a scrollable container
const ScrollView = ({ children, customStyle }) => {
    return (
        <NativeScrollView style={customStyle}>
            {children}
        </NativeScrollView>
    );
}

ScrollView.defaultProps = {
    customStyle: {},
};

export default ScrollView;
