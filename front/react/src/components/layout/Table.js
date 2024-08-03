import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, useColorModeValue, Box, Text,Icon  } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown, FaExclamation, FaCalendarAlt } from 'react-icons/fa';

const TransactionTable = ({title,date1, date2, transactions}) => {
    //const bg = useColorModeValue('white', 'gray.800');
    const colorIncome = useColorModeValue('green.500', 'green.300');
    const colorExpense = useColorModeValue('red.500', 'red.300');
    const colorPending = useColorModeValue('gray.500', 'gray.300');

    return (
        <Flex w="full" bg="#edf3f8" _dark= {{bg: "#3e3e3e"}}
            p={10}
            alignItems="center"
            justifyContent="center">
            <Table w="full" bg="white" _dark= {{bg: "gray.800"}}
                display={{base: "block", md: "table"}}
                sx={{"@media print": {display: "table"},}}>
                <Thead
                    display={{ base: "none", md: "table-header-group"}}
                    sx={{"@media print": {display: "table-header-group"}}}>
                    <Tr>
                        <Th>{title}</Th>
                        <Th>
                            <Icon as={FaCalendarAlt} me={2} />
                            {date1} - {date2}
                        </Th>
                    </Tr>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                    </Tr>
                </Thead>
                <Tbody
                    display={{base: "block", lg: "table-row-group"}}
                    sx={{"@media print": {display: "table-row-group"},
                    }}>
                    {transactions.map((transactionGroup, index) => (
                        <React.Fragment key={index}>
                            <Tr>
                                <Th colSpan={2} textAlign="left">{transactionGroup.title}</Th>
                            </Tr>
                            {transactionGroup.items.map((transaction, idx) => (
                                <Tr key={idx}
                                    display={{base: "grid", md: "table-row"}}
                                    sx={{"@media print": {display: "table-row"},
                                        gridTemplateColumns: "minmax(0px, 70%) minmax(0px, 60%)",
                                        gridGap: "0px",}}>
                                    <Td display={{ base: "table-cell", md: "none" }} sx={{ "@media print": { display: "none" } }}> Date </Td>
                                    <Td>
                                        <Flex alignItems="center" >
                                            <IconButton
                                                icon={transaction.type === 'Deposit' ? (<FaArrowUp />)
                                                    : transaction.type === 'Withdrawal' ? (<FaArrowDown />) : (<FaExclamation />)}
                                                variant="outline"
                                                colorScheme={transaction.type === 'Deposit' ? 'green'
                                                    : transaction.type === 'Withdrawal' ? 'red' : 'gray'}
                                                size="sm"
                                                className="mb-0 me-3 d-flex align-items-center justify-content-center"
                                                mr="5"
                                                aria-label="transaction type"
                                            />
                                            <Box>
                                                <Text as="h6" mb={1} fontSize="sm">
                                                    {transaction.name}
                                                </Text>
                                                <Text as="span" fontSize="xs">
                                                    {transaction.date}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Td>

                                    <Td display={{ base: "table-cell", md: "none" }} sx={{ "@media print": { display: "none" } }}>
                                        Amount
                                    </Td>
                                    <Td
                                        color={
                                            transaction.type === 'Deposit' ? colorIncome
                                                : transaction.type === 'Withdrawal' ? colorExpense : colorPending
                                        }
                                        fontSize="md"
                                        fontWeight="bold"
                                    >
                                        {transaction.amount}
                                    </Td>
                                </Tr>
                            ))}
                        </React.Fragment>
                    ))}

                </Tbody>
            </Table>
        </Flex>
    );
};

export default TransactionTable;