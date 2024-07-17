import React from 'react';
import { hanldeGetAllBusinessType, hanldeAddBusinessType, hanldeDeleteBusinessType } from 'apis/other';
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
            fetchData={hanldeGetAllBusinessType}
            createItem={hanldeAddBusinessType}
            deleteItem={hanldeDeleteBusinessType}
            itemFields={itemFields}
            itemKey="id"
        />
    );
};

export default PackagingTypes;
