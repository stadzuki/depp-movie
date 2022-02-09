export default function isOfferDataValid (countryTabs) {
    let isValid = true;

    for (const tab in countryTabs) {
        for (const key in countryTabs[tab]) {
            if (typeof countryTabs[tab][key] === 'string' && !countryTabs[tab][key]) {
                isValid = false
                break;
            }

            if (typeof countryTabs[tab][key] === 'array' && !countryTabs[tab][key].length) {
                isValid = false;
                break;
            }

            if (typeof countryTabs[tab][key] === 'object' && !Object.values(countryTabs[tab][key]).length) {
                isValid = false;
                break;
            }
        }
    }

    return isValid;
}
