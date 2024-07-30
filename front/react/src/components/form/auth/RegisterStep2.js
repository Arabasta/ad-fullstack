import React from 'react';
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    ButtonGroup,
    Heading,
    Tooltip,
    InputGroup,
    Select,
} from '@chakra-ui/react';

const RegisterStep2 = ({
                           mobileNumber, setMobileNumber, firstName, setFirstName, lastName, setLastName,
                           nationality, setNationality, handlePrevious, handleNext
                       }) => {
    const countryCodes = [
        { label: "United States (+1)", value: "+1" },
        { label: "Canada (+1)", value: "+1" },
        { label: "United Kingdom (+44)", value: "+44" },
        { label: "Australia (+61)", value: "+61" },
        { label: "India (+91)", value: "+91" },
        { label: "Singapore (+65)", value: "+65" },
        { label: "Germany (+49)", value: "+49" },
        { label: "France (+33)", value: "+33" },
        { label: "China (+86)", value: "+86" },
        { label: "Japan (+81)", value: "+81" },
        { label: "South Korea (+82)", value: "+82" },
        { label: "Brazil (+55)", value: "+55" },
        { label: "South Africa (+27)", value: "+27" },
        { label: "Mexico (+52)", value: "+52" },
        { label: "Russia (+7)", value: "+7" },
    ];

    const nationalities = [
        "American",
        "Canadian",
        "British",
        "Australian",
        "Indian",
        "Singaporean",
        "German",
        "French",
        "Chinese",
        "Japanese",
        "Korean",
        "Brazilian",
        "South African",
        "Mexican",
        "Russian",
    ];

    return (
        <Stack spacing={6}>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Details
            </Heading>
            <FormControl id="mobileNumber" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Tooltip label="Enter your mobile number including country code" fontSize="md">
                    <InputGroup>
                        <Select
                            width="150px"
                            value={mobileNumber.split('-')[0] || "+65"}
                            onChange={(e) => setMobileNumber(e.target.value + '-' + (mobileNumber.split('-')[1] || ""))}
                        >
                            {countryCodes.map(code => (
                                <option key={code.value} value={code.value}>{code.label}</option>
                            ))}
                        </Select>
                        <Input
                            type="tel"
                            value={mobileNumber.split('-')[1] || ""}
                            onChange={(e) => setMobileNumber(mobileNumber.split('-')[0] + '-' + e.target.value)}
                            placeholder="123456789"
                        />
                    </InputGroup>
                </Tooltip>
            </FormControl>
            <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Tooltip label="Enter your first name" fontSize="md">
                    <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Tooltip label="Enter your last name" fontSize="md">
                    <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="nationality" isRequired>
                <FormLabel>Nationality</FormLabel>
                <Tooltip label="Select your nationality" fontSize="md">
                    <Select
                        value={nationality || "Singaporean"}
                        onChange={(e) => setNationality(e.target.value)}
                    >
                        {nationalities.map(nation => (
                            <option key={nation} value={nation}>{nation}</option>
                        ))}
                    </Select>
                </Tooltip>
            </FormControl>
            <ButtonGroup mt="5%" w="100%">
                <Button onClick={handlePrevious} colorScheme="teal" variant="solid" w="7rem" mr="5%">
                    Back
                </Button>
                <Button onClick={handleNext} colorScheme="teal" variant="outline" w="7rem">
                    Next
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default RegisterStep2;
