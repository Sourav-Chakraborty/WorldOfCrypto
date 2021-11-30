import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '57bf0eb394msh073f6fa69ef75c0p18cc64jsn65d3a7e4e14b'
}

const baseUrl='https://coinranking1.p.rapidapi.com'
const createRequest=(url)=>({
    url,
    headers:cryptoApiHeaders
})

export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails:builder.query({
            query:(coinId)=> createRequest(`/coin/${coinId}`)
        })
    })
})

export const {useGetCryptosQuery,useGetCryptoDetailsQuery}=cryptoApi