export default function saveFieldsData (KEY_IN_STORE, env, localDataSetter, storeData, currentCountryTab, fieldsArr, callback = null, formErrors) {
    if (env === 'store-set-errors') {
        for(const tabData in storeData) {
            storeData[tabData].errors = formErrors;
        }

        callback(KEY_IN_STORE, {...storeData});
        return;
    }

    const dataForSave = {
        key: KEY_IN_STORE,
        data: {}
    }

    const commonFiles = {};

    for (const fields of fieldsArr) {
        for(const field in fields) {
            if (fields[field].fieldType && fields[field].fieldType === 'commonFile') {
                commonFiles[field] = fields[field].getter;
                continue;
            }

            dataForSave.data[field] = fields[field].getter;
        }
    }

    if (formErrors) {
        dataForSave.data.errors = formErrors;
    }

    if (env === 'local' && localDataSetter) {
        localDataSetter((prev) => ({...prev, [currentCountryTab]: dataForSave.data, commonFiles}))
    }

    if (env === 'store' && callback) {
        if (storeData.hasOwnProperty('commonFiles')) {
            callback(dataForSave.key, {...storeData, [currentCountryTab]: dataForSave.data, commonFiles});
            return;
        }

        callback(dataForSave.key, {...storeData, [currentCountryTab]: dataForSave.data, commonFiles});
    }
}
