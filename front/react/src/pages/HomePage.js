import React from 'react';
import ParagraphWithImageCard from "../components/elements/cards/ParagraphWithImageCard";
import Footer from "../components/pageSections/footers/Footer";


const HomePage = () => {

    return (
        <div>
            <main>
                <ParagraphWithImageCard
                    title="Turn Your Money into"
                    subtitle="Assets"
                    description="The secure way to buy, sell. Asking permission,
                        not forgiveness. Millions use
                        FourQuant.ai to diversify
                        their portfolios."
                    buttonText="Start Now"
                    imageUrl="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&auto=format&fit=crop&w=750&q=80"
                />
            </main>
            <Footer />

        </div>
    );
};

export default HomePage;
