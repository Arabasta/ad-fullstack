import React, { useState } from 'react';
import ScrollView from "../../components/common/container/ScrollView";
import faqData from "./faqData";
import FaqItem from "../../components/support/FaqItem";
import Container from "../../components/common/container/Container";

const SupportScreen = () => {
    const [activeSections, setActiveSections] = useState([]);

    const toggleSection = (index) => {
        setActiveSections((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    return (
        <Container>
            <ScrollView>
                {faqData.map((item, index) => (
                    <FaqItem
                        key={index}
                        item={item}
                        index={index}
                        isActive={activeSections.includes(index)}
                        toggleSection={toggleSection}
                    />
                ))}
            </ScrollView>
        </Container>
    );
};

export default SupportScreen;
