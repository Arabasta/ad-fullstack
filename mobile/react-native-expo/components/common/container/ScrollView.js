import { StyleSheet, ScrollView as NativeScrollView } from 'react-native';

const ScrollView = ({ children, customStyle }) => {
    return (
        <NativeScrollView style={[styles.container, customStyle]}>
            {children}
        </NativeScrollView>
    );
}

ScrollView.defaultProps = {
    customStyle: {},
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default ScrollView;
