import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { KKauppa } from '../../types/Kkauppa';

const KKauppaStoreList = ({ kStores, setKId }: { kStores: KKauppa[], setKId: React.Dispatch<React.SetStateAction<string>> }): React.JSX.Element => {
    return (
        <ListGroup>
            {kStores.map((store:KKauppa, index:number) => (
                <ListGroup.Item key={index} action onClick={() => setKId(store.id)}>{store.name}</ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export {KKauppaStoreList}