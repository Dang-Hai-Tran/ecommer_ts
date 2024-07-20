import lodash from "lodash";

const getInfoData = (fields: string[] = [], object: Object = {}) => {
    return lodash.pick(object, fields);
};

export { getInfoData };
