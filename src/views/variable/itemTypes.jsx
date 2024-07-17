import React from 'react';
import { hanldeGetAllItemType, hanldeAddItemType, hanldeDeleteItemType } from 'apis/other';
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
            fetchData={hanldeGetAllItemType}
            createItem={hanldeAddItemType}
            deleteItem={hanldeDeleteItemType}
            itemFields={itemFields}
            itemKey="id"
        />
    );
};

export default PackagingTypes;
