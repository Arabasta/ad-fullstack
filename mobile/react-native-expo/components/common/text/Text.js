import React from 'react';
import { Text as NativeText } from 'react-native-paper';

/**
 * Usage:
 * - For a large display heading:
 *   <Text variant="displayLarge">Heading 1</Text>
 *
 * - For a medium body text:
 *   <Text variant="bodyMedium">Body text.</Text>
 *
 * Options:
 * - Display: 'displayLarge', 'displayMedium', 'displaySmall'
 * - Headline: 'headlineLarge', 'headlineMedium', 'headlineSmall'
 * - Title: 'titleLarge', 'titleMedium', 'titleSmall'
 * - Label: 'labelLarge', 'labelMedium', 'labelSmall'
 * - Body: 'bodyLarge', 'bodyMedium', 'bodySmall'
 */
const Text = ({ variant, children, ...props }) => {
    return <NativeText variant={variant} {...props}>{children}</NativeText>;
};

Text.defaultProps = {
    variant: 'bodyMedium',
};

export default Text;
