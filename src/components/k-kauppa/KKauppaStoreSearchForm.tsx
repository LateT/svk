import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { KKauppa } from '../../types/Kkauppa';

const KKauppaStoreSearchForm = ({setKStores}: {setKStores: React.Dispatch<React.SetStateAction<KKauppa[]>>}) => {
    const [search, setSearch] = useState<string>("");
    const [doSearch,setDoSearch] = useState<number>(0);
    const fetchStores = async (query: string) => {
        const url = "https://api.mobile.k-ruoka.fi/graphql";
        const f = await fetch(url, {
            method: "POST",
            headers: {
                Host: "api.mobile.k-ruoka.fi",
                Accept: "*/*",
                "X-Client-Version": "6.36.5",
                "X-Client-Platform": "android",
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "User-Agent": "K-Ruoka/6.36.5/4820 (Android 9; AOSP on IA Emulator; google generic_x86_arm)"
            },
            body: JSON.stringify({
                "operationName": "storeList",
                variables: {
                    query: query,
                    limit: 50,
                    offset: 0,
                    deliveryMethods: []
                },
                "query":"query storeList($query: String!, $limit: Float, $offset: Float, $deliveryMethods: [DeliveryMethodFilters!], $zipCode: String) {\n  storeList(\n    storesQuery: {query: $query, view: {limit: $limit, offset: $offset}, deliveryMethods: $deliveryMethods, zipCode: $zipCode}\n  ) {\n    totalHits\n    stores {\n      ...Store\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Store on Store {\n  id\n  name\n  chain\n  chainlessName\n  openingHours {\n    date\n    opens\n    closes\n    state\n    __typename\n  }\n  deliveryMethods\n  municipality\n  firstFreeDeliveryTimes {\n    method\n    date\n    __typename\n  }\n  deliveryAreas\n  infoNotification\n  info {\n    chainOfferPdfUrl\n    storeOfferPdfUrl\n    __typename\n  }\n  __typename\n}\n"
            })
        });
        const resp = await f.json();
        const data = resp.data.storeList.stores;
        setKStores(data);
    }


    useEffect(() => {

        if (search != "" && doSearch > 0) {
            fetchStores(search);
        }
    }, [doSearch])

    return (
        <Form>
            <Form.Group className="mb-3" controlId="search">
                <Form.Control type='text' placeholder='makasiini' onChange={e => setSearch(e.target.value)} value={search} />
            </Form.Group>
            <Button variant='primary' onClick={() => setDoSearch(doSearch + 1)}>Hae</Button>
        </Form>
    )

}

export { KKauppaStoreSearchForm }