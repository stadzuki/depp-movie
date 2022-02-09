export default function loadFieldsInfo (env, localData, storeData, errorSetter, currentCountryTab, fieldsArr) {
    const fieldsInfo = env === 'store' ? storeData[currentCountryTab] : localData[currentCountryTab];

    if (fieldsInfo) {
        for (const fields of fieldsArr) {
            for (const field in fields) {
                if (fieldsInfo.hasOwnProperty(field)) {
                    fields[field].setter(fieldsInfo[field]);

                    if (fieldsInfo[field] && fieldsInfo[field].length) {
                        errorSetter((prev) => prev.filter((error) => error.id !== fields[field].id));
                    }
                }

                if (env === 'store' && storeData.commonFiles && storeData.commonFiles.hasOwnProperty(field)) {
                    fields[field].setter(storeData.commonFiles[field]);
                }
            }
        }
    }
}
