import React from 'react';

const RegisterStep2 = ({
                           mobileNumber, setMobileNumber, firstName, setFirstName, lastName, setLastName,
                           nationality, setNationality, handlePrevious, handleNext
                       }) => {
    return (
        <form onSubmit={handleNext}>
            <div>
                <label>Mobile Number</label>
                <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label>Nationality</label>
                <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                />
            </div>
            <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit">Next</button>
        </form>
    );
};

export default RegisterStep2;
