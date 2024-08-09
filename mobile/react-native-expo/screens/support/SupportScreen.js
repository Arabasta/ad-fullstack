import React, { useState } from 'react';
import ScrollView from "../../components/common/container/ScrollView";
import faqData from "./FaqData";
import FaqItem from "../../components/support/FaqItem";

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
    );
};

export default SupportScreen;
