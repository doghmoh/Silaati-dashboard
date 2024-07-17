import React from 'react';
import { hanldeGetAllPackagingType, hanldeAddPackagingType, hanldeDeletePackagingType } from 'apis/other';
import GenericTable from './reusable';

const PackagingTypes = () => {
    const itemFields = [
        { label: '#', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Description', key: 'description' },
    ];

    return (
        <GenericTable
            title="Packaging Type"
            fetchData={hanldeGetAllPackagingType}
            createItem={hanldeAddPackagingType}
            deleteItem={hanldeDeletePackagingType}
            itemFields={itemFields}
            itemKey="id"
        />
    );
};

export default PackagingTypes;
