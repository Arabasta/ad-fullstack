import React from 'react';
import Header2 from "../components/pageSections/headers/Header2";
import ParagraphWithImageCard from "../components/elements/cards/ParagraphWithImageCard";
import Footer2 from "../components/pageSections/footers/Footer2";


const HomePage = () => {

    return (
        <div>
            <Header2 />
            <main>
                <ParagraphWithImageCard />
            </main>
            <Footer2 />

        </div>
    );
};

export default HomePage;
