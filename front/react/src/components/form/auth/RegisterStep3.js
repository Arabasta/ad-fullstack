import React from 'react';

const RegisterStep3 = ({
                           street, setStreet, city, setCity, postalCode, setPostalCode,
                           country, setCountry, unitNo, setUnitNo, handlePrevious, handleNext
                       }) => {
    return (
        <form onSubmit={handleNext}>
            <div>
                <label>Street</label>
                <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div>
                <label>City</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label>Postal Code</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
            </div>
            <div>
                <label>Country</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div>
                <label>Unit No</label>
                <input
                    type="text"
                    value={unitNo}
                    onChange={(e) => setUnitNo(e.target.value)}
                />
            </div>
            <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit">Next</button>
        </form>
    );
};

export default RegisterStep3;
