import React, { useEffect, useState } from 'react';
import { StoreSearchForm } from './components/StoreSearchForm.tsx';
import { Kauppa } from './types/kauppa';
import { StoreList } from './components/StoreList.tsx';
import { ProductsSearch } from './components/ProductsSearch.tsx';
import { KKauppa } from './types/Kkauppa';
import { KKauppaStoreSearchForm } from './components/k-kauppa/KKauppaStoreSearchForm.tsx';
import { KKauppaStoreList } from './components/k-kauppa/KKauppaStoreList.tsx';
function App() {
  const [storeArr, setStoreArr] = useState<Kauppa[]>([]);
  const [selected, setSelected] = useState<Kauppa | null>(null);
  const [storeId, setStoreId] = useState<number>(0);
  const [kId,setKId] = useState<string>("");
  const [kStores,setKStores] = useState<KKauppa[]>([]);


  const getStoreId = async (selected: Kauppa) => {
    const url = `https://api.s-kaupat.fi/?operationName=GetPickupSlotsForCoordinates&variables=%7B%22startDate%22%3A%222025-01-21%22%2C%22endDate%22%3A%222025-01-21%22%2C%22closeToCoordinates%22%3A%7B%22latitude%22%3A${selected.latitude}%2C%22longitude%22%3A${selected.longitude}%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22cebc1489438e9336c0c773ec9a680a814ce369fb169653e1d2a4c0e7426f5dd1%22%7D%7D`;
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
    const id = resp.data.pickupSlotsForCoordinates.slotsInPickupPoints[0].store.id;
    console.log("id: " + id);
    setStoreId(id);
  };

useEffect(() => {
  console.log("kId: " + kId);
},[kId])


  useEffect(() => {
    if (selected != null) {
      getStoreId(selected);

    }
  }, [selected])

const renderStoreSelection = (): React.JSX.Element | null => {
  if (storeId === 0) {
    return (
      <>
        <p>Valitse S-kauppa</p>
        <StoreSearchForm setStoreArr={setStoreArr} />
        {storeArr && storeArr.length > 1 && <StoreList stores={storeArr} setSelected={setSelected} />}
      </>
    );
  }
  return null;
};

const renderKStoreSelection = (): React.JSX.Element | null => {
  if (storeId !== 0 && kId === "") {
    return (
      <>
        <p>Valitse K-kauppa</p>
        <KKauppaStoreSearchForm setKStores={setKStores} />
        {kStores.length >= 1 && <KKauppaStoreList kStores={kStores} setKId={setKId} />}
      </>
    );
  }
  return null;
};

const renderProductSearch = (): React.JSX.Element | null => {
  if (storeId !== 0 && kId !== "") {
    return <ProductsSearch id={storeId} kId={kId} />;
  }
  return null;
};

  return (
    <>
      {renderStoreSelection()}
      {renderKStoreSelection()}
      {renderProductSearch()}
    </>
  );
}

export default App;
