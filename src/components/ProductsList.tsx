import React, { useEffect } from 'react';
import { Tuote } from '../types/Tuote';
import { Button, ListGroup } from 'react-bootstrap';


const ProductsList = ({ products, startIndex, setFrom }: { products: Tuote[], startIndex: number, setFrom: React.Dispatch<React.SetStateAction<number>> }) => {
    
    const ItemList: React.ReactElement[] = [];

    products.map((p, index) => {
        console.log(p);
        if (p.ktuote && p.ean == p.ktuote?.ean) {
            let priceToCompare = 0;
            if (p.ktuote.pricing.discount) {
                priceToCompare = p.ktuote.pricing.discount.price;
            } else {
                priceToCompare = p.ktuote.pricing.normal.price;
            }
            if (priceToCompare > p.price) {
                ItemList.push(<ListGroup.Item key={index}>
                    {p.name} | S: <span style={{ color: "green" }}>{p.price}€</span> | K: <span style={{ color: "red" }}>{priceToCompare}€</span>
                </ListGroup.Item>)
            } else if (priceToCompare == p.price) {
                ItemList.push(<ListGroup.Item key={index}>{p.name + " | S:" + p.price + "€ " + " | K: " + priceToCompare + "€"}</ListGroup.Item>)
            } else if (priceToCompare < p.price) {
                ItemList.push(<ListGroup.Item key={index}>
                    {p.name} | S: <span style={{ color: "red" }}>{p.price}€</span> | K: <span style={{ color: "green" }}>{priceToCompare}€</span>
                </ListGroup.Item>)
            }
        } else {
            ItemList.push(<ListGroup.Item key={index}>{p.name + " | S:" + p.price + "€ " + " | K: ?€"}</ListGroup.Item>)
        }
    });

    return (
        <>
            <ListGroup>
                {ItemList}
            </ListGroup>
            <Button disabled={startIndex == 0} onClick={() => setFrom(startIndex - 10)}>{"<"}</Button> <Button onClick={() => setFrom(startIndex + 10)} disabled={products.length < 10}>{">"}</Button>
        </>
    )
}

export { ProductsList }