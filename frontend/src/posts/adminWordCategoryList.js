import React from 'react';

import {
    List, Edit, Create, Datagrid, EditButton,
    DisabledInput, LongTextInput, SimpleForm, TextInput, TextField
} from 'admin-on-rest';

export const AdminWordCategoriesList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Category Name" source="categoryName" />
            <EditButton />
        </Datagrid>
    </List>
);


export const AdminWordCategoriesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput label="Category Name" source="categoryName" />
        </SimpleForm>
    </Edit>
);

export const AdminWordCategoriesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Category Name" source="categoryName" />
        </SimpleForm>
    </Create>
);
