import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Kauppa } from '../types/kauppa';
const StoreList = ({ stores, setSelected }: { stores: Kauppa[], setSelected: React.Dispatch<React.SetStateAction<Kauppa | null>> }): React.JSX.Element => {
    return (
        <ListGroup>
            {stores.filter(store => store.id !== "nlsfi:addresses#1").map((store, index) => ( // nlsfi:addresses#1 is junk data always delivered from the server
                <ListGroup.Item key={index} action onClick={() => setSelected(store)}>{store.title}</ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export { StoreList }