import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Kauppa } from '../types/kauppa';
const StoreList = ({ stores, setSelected }: { stores: Kauppa[], setSelected: React.Dispatch<React.SetStateAction<Kauppa | null>> }) => {
    return (
        <ListGroup>
            {stores.filter(store => store.id != "nlsfi:addresses#1").map((store, index) => (
                <ListGroup.Item key={index} action onClick={() => setSelected(store)}>{store.title}</ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export { StoreList }