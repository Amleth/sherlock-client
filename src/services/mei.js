import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { makeIdentityQueryFragment } from '../common/rdf'
import { sparqlEndpointBody } from '../common/sparql'

export const meiApi = createApi({
    reducerPath: 'meiApi',
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getNoteIdentity: builder.query({
            query: (noteIri) => sparqlEndpointBody(makeIdentityQueryFragment(noteIri, true, null, true, false)),
        }),
    }),
})

export const { useGetNoteIdentityQuery } = meiApi