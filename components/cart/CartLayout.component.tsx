import Card, { CardContainer } from "../global/Card.component";
import Navbar from "../global/Navbar.component";
import { useState, useEffect } from 'react';
import { Gap, MainCardContainer } from "../ProductListing/ListingLayout";

export default function CartLayout() {
    const [userCartData, setUserData] = useState([] as any);
    useEffect(() => {
        const cartData = localStorage.getItem('cartData');
        if (cartData) {
            const cartDataParse = JSON.parse(cartData);
            setUserData(cartDataParse);
        }
        else {
            localStorage.setItem('cartData', JSON.stringify([]));
            setUserData([]);
        }
    }, []);
    return (
        <>
            <Navbar />
            <Gap></Gap>
            <MainCardContainer>
            {userCartData && userCartData.map && userCartData.map((item: any, index: number) => {
                return <Card key={index} data={item} page="cart" />
            })}
            </MainCardContainer>
        </>
    )
}   