import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Tuote } from '../types/Tuote';
import { ProductsList } from './ProductsList.tsx';
import { KTuote } from '../types/KTuote';

const ProductsSearch = ({ id, kId}: { id: number, kId:string}): React.JSX.Element => {
    const [query, setQuery] = useState<string>(""); // search term
    const [search, setSearch] = useState<number>(0); // increase by 1 to trigger useEffect to fetch
    const [from, setFrom] = useState<number>(0);
    const [products, setProducts] = useState<Tuote[]>([]);
    /**
     * 
     * @param from search result to start listing from
     * @param search search term
     * @param id store id
     * @param limit maximum amount of results
     */
    const getProducts = async (from: number, search: string, id: number, limit: number): Promise<void> => {
        const formattedDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const url = `https://api.s-kaupat.fi/?operationName=GetFilteredProducts&variables=%7B%22queryString%22%3A%22${search}%22%2C%22id%22%3A%22${id}%22%2C%22from%22%3A${from}%2C%22limit%22%3A${limit}%2C%22slug%22%3A%22%22%2C%22hierarchyId%22%3A%22%22%2C%22includeAgeLimitedByAlcohol%22%3Atrue%2C%22structuredFacets%22%3A%5B%7B%22key%22%3A%22brandName%22%2C%22order%22%3A%22asc%22%7D%2C%7B%22key%22%3A%22labels%22%7D%5D%2C%22searchProvider%22%3A%22loop54%22%2C%22useRandomId%22%3Atrue%2C%22generatedSessionId%22%3Anull%2C%22sortForAvailabilityLabelDate%22%3A%22${formattedDate}%22%2C%22fallbackToGlobal%22%3Afalse%2C%22availabilityDate%22%3A%22${formattedDate}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22b9f82e99fdd98688eecd70760cad76d1a53381521a2aad06604a53663c4af505%22%7D%7D`;
        const f = await fetch(url, {
            method: "GET",
            headers: {
                Host: "api.s-kaupat.fi",
                Accept: "*/*",
                "Content-Type": "application/json",
                "X-Client-Name": "skaupat-mobile-android",
                "X-Client-Version": "2.64.0(24944)",
                "Accept-Encoding": "gzip, deflate, br",
                "User-Agent": "okhttp/4.10.0"
            }
        });
        const resp = await f.json();
        const data: Tuote[] = resp.data.store.products.items;
        await Promise.all(data.map(async d => {
            // Vertaa K-kaupan hintoihin
            d.ktuote = await kGetProduct(d.ean);
        }));
        setProducts(data);
    }

    /**
     * 
     * @param ean The EAN code of a product
     * @returns The first matching product or null
     */
    const kGetProduct = async (ean: string): Promise<KTuote | null> => {
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
                "operationName": "productAndAssortmentSearchV2",
                "variables": {
                    "query": ean,
                    "storeId": kId,
                    "limit": 50,
                    "offset": 0
                },
                query: "query productAndAssortmentSearchV2($query: String!, $storeId: String!, $limit: Float!, $offset: Float!, $categoryPath: String, $deliveryStart: String, $orderBy: ProductSearchOrderBy, $lang: String) {\n  productAndAssortmentSearchV2(\n    query: $query\n    storeId: $storeId\n    limit: $limit\n    offset: $offset\n    categoryPath: $categoryPath\n    deliveryStart: $deliveryStart\n    orderBy: $orderBy\n    lang: $lang\n  ) {\n    results {\n      ... on Product {\n        ...ProductSearch\n        __typename\n      }\n      ... on AssortmentSearchResult {\n        ...AssortmentSearch\n        __typename\n      }\n      __typename\n    }\n    queryId\n    totalHits\n    __typename\n  }\n}\n\nfragment ProductSearch on Product {\n  localizedName {\n    finnish\n    swedish\n    english\n    __typename\n  }\n  localStoreId\n  productType\n  imageUrl\n  restriction {\n    type\n    i18n {\n      fi\n      sv\n      en\n      __typename\n    }\n    __typename\n  }\n  isDomestic\n  adInfo {\n    ...AdInfo\n    __typename\n  }\n  ...ProductDeliveryRestrictions\n  ...Pricing\n  __typename\n}\n\nfragment AdInfo on AdInfo {\n  highlightAd\n  isSponsored\n  clickUrl\n  impressionUrl\n  __typename\n}\n\nfragment ProductDeliveryRestrictions on Product {\n  id\n  ean\n  storeId\n  productType\n  productAvailabilities {\n    storeId\n    web\n    store\n    __typename\n  }\n  __typename\n}\n\nfragment Pricing on Product {\n  pricing {\n    normal {\n      price\n      unit\n      isApproximate\n      componentPrice\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      __typename\n    }\n    discount {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      tosRestrictionText {\n        finnish\n        swedish\n        english\n        __typename\n      }\n      maxItems\n      discountAvailability {\n        store\n        web\n        daily {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n          startTime\n          endTime\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    batch {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      amount\n      maxItems\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment AssortmentSearch on AssortmentSearchResult {\n  id\n  eans\n  localizedName {\n    finnish\n    swedish\n    english\n    __typename\n  }\n  productType\n  imageUrl\n  adInfo {\n    ...AdInfo\n    __typename\n  }\n  ...AssortmentDetails\n  ...AssortmentPricing\n  __typename\n}\n\nfragment AssortmentDetails on AssortmentSearchResult {\n  assortmentDetails {\n    availability {\n      web\n      store\n      __typename\n    }\n    restriction {\n      type\n      i18n {\n        fi\n        sv\n        en\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment AssortmentPricing on AssortmentSearchResult {\n  pricing {\n    normal {\n      price\n      unit\n      isApproximate\n      componentPrice\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      __typename\n    }\n    discount {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      maxItems\n      discountAvailability {\n        store\n        web\n        daily {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n          startTime\n          endTime\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    batch {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      amount\n      maxItems\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n"
            })
        });
        const resp = await f.json();
        if (resp.data.productAndAssortmentSearchV2.results.length > 0) {
            const data:KTuote = resp.data.productAndAssortmentSearchV2.results[0];
            return data;
        } else {
            return null;
        }
    }

    useEffect(() => {
        if (search > 0) {
            getProducts(from, encodeURIComponent(query), id, 10);
        }
    }, [search, from])

    const clickSearch = () => {
        setFrom(0);
        setSearch(search + 1);
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="product">
                    <Form.Label>Hae tuotetta</Form.Label>
                    <Form.Control type='text' placeholder='Maito' value={query} onChange={e => setQuery(e.target.value)} />
                </Form.Group>
                <Button onClick={() => clickSearch()}>Hae tuotteita</Button>
            </Form>
            {(products.length > 0) && <ProductsList products={products} startIndex={from} setFrom={setFrom} />}
        </>
    )
}

export { ProductsSearch }