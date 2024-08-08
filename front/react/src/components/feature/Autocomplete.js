import React from 'react';
import { useCombobox } from 'downshift';
import { Box, Input, List, ListItem } from '@chakra-ui/react';

const Autocomplete = ({
                          label, value,
                          onChange, category,
                          borderColor = 'brand.300'
}) => {
    const items = category.filter(item =>
        item.toLowerCase().startsWith(value.toLowerCase())
    );

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
        highlightedIndex,
    } = useCombobox({
        items,
        inputValue: value,
        onInputValueChange: ({ inputValue }) => {
            onChange({ target: { value: inputValue } });
        },
        onSelectedItemChange: ({ selectedItem }) => {
            onChange({ target: { value: selectedItem } });
        },
    });
    return (
        <Box borderColor={borderColor}>
            <label>{label}</label>
            <Box {...getComboboxProps}>
                <Input
                    {...getInputProps()}
                    borderColor={borderColor}
                />
            </Box>
            <List
                {...getMenuProps()}
                borderColor={borderColor}
            >
                {isOpen &&
                    items.map((item, index) => (
                        <ListItem
                            key={index}
                            {...getItemProps({ item, index })}
                            bg={highlightedIndex === index ? 'brand.200' : 'brand.100'}

                        >
                            {item}
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
};

export default Autocomplete;
