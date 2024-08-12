export const validateAddress = (address) => {
    const validationErrors = {};
    let valid = true;

    if (!address.street) {
        validationErrors.street = "Street is required";
        valid = false;
    } else if (address.street.length > 50) {
        validationErrors.street = "Street cannot be more than 50 characters";
        valid = false;
    }

    if (!address.city) {
        validationErrors.city = "City is required";
        valid = false;
    } else if (address.city.length > 50) {
        validationErrors.city = "City cannot be more than 50 characters";
        valid = false;
    }

    if (!address.postalCode) {
        validationErrors.postalCode = "Postal code is required";
        valid = false;
    } else if (address.postalCode.length > 50) {
        validationErrors.postalCode = "Postal code cannot be more than 50 characters";
        valid = false;
    }

    if (!address.country) {
        validationErrors.country = "Country is required";
        valid = false;
    } else if (address.country.length > 50) {
        validationErrors.country = "Country cannot be more than 50 characters";
        valid = false;
    }

    if (!address.unitNo) {
        validationErrors.unitNo = "Unit number is required";
        valid = false;
    } else if (address.unitNo.length > 10) {
        validationErrors.unitNo = "Unit number cannot be more than 10 characters";
        valid = false;
    }

    return { valid, validationErrors };
};
