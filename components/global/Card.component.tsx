import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CardProps {
    data?: [] | any;
    page?: string;
}

interface AddToCartBtnProps {
    data?: [] | any;
    page?: string;
}

export default function Card({ data,page }: CardProps) {
    const [showCount, setShowCount] = useState(0);
    const [showConter, setShowCounter] = useState(false);
    const [userCartData, setUserData] = useState([] as any);

    const addToCart = (item: any) => {
        setShowCount(showCount + 1);
        setShowCounter(true);
        if (showCount === item.quantity) {
            console.log("Limited Stock")
            alert('Limited Stock');
            setShowCount(item.quantity);
        }
        if (showCount >= 0 && showCount < item.quantity) {
            // store cart data in local storage
            const cartData = localStorage.getItem('cartData');
            if (cartData) {
                const cartDataParse = JSON.parse(cartData);
                const cartDataParseArray = [...cartDataParse, item];
                localStorage.setItem('cartData', JSON.stringify(cartDataParseArray));
                setUserData(cartDataParseArray);
            }
            else {
                localStorage.setItem('cartData', JSON.stringify([item]));
                setUserData([item]);
            }
        }
    };

    const decrement = () => {
        setShowCount(showCount - 1);
        if (showCount === 0) {
            setShowCounter(false);
        }
        if (showCount > 0) {
            console.log("Removed from cart");
            // remove cart data from local storage
            const cartData = localStorage.getItem('cartData');
            if (cartData) {
                const cartDataParse = JSON.parse(cartData);
                const cartDataParseArray = [...cartDataParse];
                cartDataParseArray.pop();
                localStorage.setItem('cartData', JSON.stringify(cartDataParseArray));
                setUserData(cartDataParseArray);
            }
            else {
                localStorage.setItem('cartData', JSON.stringify([]));
                setUserData([]);
            }
        }
    };
    return (
        <CardContainer>
            <ImageContainer>
                <Image
                    src={data.imageURL}
                    fill
                    alt="product"
                    priority
                />
            </ImageContainer>
            <Border></Border>
            <ProductInfo className="heading">
                <ProductTitle>{data.name}</ProductTitle>
                <ProductPrice>₹ {data.price}</ProductPrice>
            </ProductInfo>
            {page != 'cart' && showConter === false ? <AddToCartBtn className="heading" data={data} onClick={() => addToCart(data)}>
                {data.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </AddToCartBtn> :
                <ShowConterContainer className="heading">
                   {page != 'cart' && <><DecrementBtn onClick={() => decrement()}>-</DecrementBtn><Counter>{showCount}</Counter><IncrementBtn onClick={() => addToCart(data)}>+</IncrementBtn></>}
                </ShowConterContainer>
            }
        </CardContainer>
    );
}

export const CardContainer = styled.div`
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.44);
    border-radius: 5px;
    margin: 0 auto;
    width: 80%;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
        width: 300px;
        height: 340px;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img{
        object-fit: contain;
    }
`;

export const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ProductTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    color: #000;
    margin-top: 10px;
`;

export const ProductPrice = styled.div`
        font-size: 1rem;
        font-weight: 500;
        color: #000;
        margin-top: 10px;
`;

export const AddToCartBtn = styled.button<AddToCartBtnProps>`
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: none;
        background-color: ${(props) => props.data?.quantity > 0 ? 'var(--primary-color)' : '#ccc'};
        color: ${(props) => props.data?.quantity > 0 ? '#fff' : '#000'};
        font-size: 1rem;
        cursor: ${(props) => props.data?.quantity > 0 ? 'pointer' : 'not-allowed'};
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        &:focus {
                outline: none;
        }
        svg {
                width: 20px;
                height: 20px;
        }
`;

export const Border = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
`;

export const ShowConterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const DecrementBtn = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #ccc;
    color: #000;
    font-size: 1rem;
    margin-right: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

export const Counter = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: #000;
`;

export const IncrementBtn = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #ccc;
    color: #000;
    font-size: 1rem;
    margin-left: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

