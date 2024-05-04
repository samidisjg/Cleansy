import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:5173';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURI}),
    endpoints:builder =>({
        getCategories: builder.query({
            //get:'http://localhost:5173/api/categories'
            query: () => '/api/categeories/',
        })
    })
});

export default apiSlice;