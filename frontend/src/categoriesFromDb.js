import axios from 'axios';

export const videoCategories = function () {
    let vals = [];
    axios.get('/api/video-categories')
        .then(res => {
            return res.data;
    });
};
