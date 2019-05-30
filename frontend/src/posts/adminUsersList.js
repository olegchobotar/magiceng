import React from 'react';

import {
    List, Edit, Create, Datagrid, EditButton, SelectInput,
    DisabledInput, LongTextInput, SimpleForm, TextInput, TextField
} from 'admin-on-rest';

export const AdminUsersList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="role" />
            <TextField label="Registration Date" source="registrationDate" />
            <EditButton />
        </Datagrid>
    </List>
);


export const AdminUsersEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="name" />
            <DisabledInput source="email" />
            <SelectInput source="role" choices={[
            { id: 'Admin', name: 'Admin' },
            { id: 'User', name: 'User' }
        ]}
            />
            <DisabledInput label="Registration Date" source="registrationDate" />
        </SimpleForm>
    </Edit>
);

export const AdminUsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="word" />
            <TextInput source="translation" />
            <LongTextInput source="imageSrc" />
        </SimpleForm>
    </Create>
);