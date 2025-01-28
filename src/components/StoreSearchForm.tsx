import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const StoreSearchForm = ({setStoreArr}) => {
    const [pc, setPc] = useState("");
    const [search,setSearch] = useState(0);
    const [errortxt, setErrortxt] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchStores = async (code: string) => {
            setLoading(true);
            const url = `https://api.s-kaupat.fi/?operationName=GetAddressAutosuggestions&variables=%7B%22query%22%3A%22${code}%22%2C%22countryCode%22%3A%22FIN%22%2C%22lang%22%3A%22fi%2Csv%22%2C%22limit%22%3A20%2C%22includeInternal%22%3Atrue%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%221f835b26865594c2c30d7d5389e1b32bab29505e254210963bbc2bd6abb3570d%22%7D%7D`;
            const f = await fetch(url, {
                method: "GET",
                headers: {
                    host: "api.s-kaupat.fi",
                    accept: "*/*",
                    "Content-Type": "application/json",
                    "X-Client-Name": "skaupat-mobile-android",
                    "X-Client-Version": "2.64.0(24944)",
                    "Accept-Encoding": "gzip, deflate, br",
                    "User-Agent": "okhttp/4.10.0"
                }
            });
            const resp = await f.json();
            const storesArr = resp.data.addressAutosuggest;
            console.log(storesArr);
            setStoreArr(storesArr);
            setLoading(false);
        }

        if (pc !== "" && search > 0) {
            if (pc.length !== 5) {
                setErrortxt("Postinumeron täytyy olla 5 numeron mittainen");
            } else {
                fetchStores(pc);
            }
        }
    }, [search])

    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="PostalCode">
                <Form.Label>Postinumero</Form.Label>
                <Form.Control type="text" placeholder="70100" onChange={e => setPc(e.target.value)} />
            </Form.Group>
            <Button variant='primary' onClick={() => setSearch(search + 1)}>Hae</Button>
        </Form>
        {loading && <p>Loading...</p>}
        {errortxt && <p>{errortxt}</p>}
        </>
    )

}

export { StoreSearchForm } 
