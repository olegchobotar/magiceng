import React from 'react';

import {
    List, Edit, Create, Datagrid, EditButton,
    DisabledInput, LongTextInput, SimpleForm, TextInput, TextField
} from 'admin-on-rest';

export const WordPostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField source="word" />
            <TextField source="translation" />
            <TextField source="imageSrc" />
            <EditButton />
        </Datagrid>
    </List>
);


export const WordPostEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="word" />
            <TextInput style={{maxWidth: '300px'}} source="translation" />
            <TextInput source="imageSrc" />
        </SimpleForm>
    </Edit>
);

export const WordPostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="word" />
            <TextInput source="translation" />
            <TextInput source="imageSrc" />
        </SimpleForm>
    </Create>
);