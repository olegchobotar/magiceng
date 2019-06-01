import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    List, Edit, Create, Datagrid, EditButton, SelectInput,
    DisabledInput, LongTextInput, SimpleForm, TextInput, TextField
} from 'admin-on-rest';

export const AdminWordsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Category" source="category" />
            <TextField source="word" />
            <TextField source="translation" />
            <EditButton />
        </Datagrid>
    </List>
);

export const AdminWordsEdit = (props) => {
    const [initialized, setInitialized] = useState(false);
    const [categories, setCategories] = useState();

    useEffect(() => {
        if (!initialized) {
            axios.get('/api/word-categories/all')
                .then(({ data }) => {
                    setCategories(data);
                });
            setInitialized(true);
        }
    });

    return (
        <Edit {...props}>
            <SimpleForm>
                <DisabledInput source="id" />
                <SelectInput
                    className="video-select"
                    source="category" choices={categories}  />
                <TextInput source="word" />
                <TextInput source="translation" />
                <TextInput source="imageSrc" />
            </SimpleForm>
        </Edit>
    )
};

export const AdminWordsCreate = (props) => {
    const [initialized, setInitialized] = useState(false);
    const [categories, setCategories] = useState();

    useEffect(() => {
        if (!initialized) {
            axios.get('/api/word-categories/all')
                .then(({ data }) => {
                    setCategories(data);
                });
            setInitialized(true);
        }
    });

    return (
        <Edit {...props}>
            <SimpleForm>
                <SelectInput
                    className="video-select"
                    source="category" choices={categories}  />
                <TextInput source="word" />
                <TextInput source="translation" />
                <LongTextInput source="imageSrc" />
            </SimpleForm>
        </Edit>
    )
};
