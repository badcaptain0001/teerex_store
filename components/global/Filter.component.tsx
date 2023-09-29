import { useEffect, useState } from "react";
import styled from "styled-components";
interface FilterProps {
    data?: [] | any;
    filterData?: any;
    setFilterData?: any;
}

export default function Filter({ data, filterData, setFilterData }: FilterProps) {
    const [filteredData, setFilteredData] = useState([] as any);
    const [color, setColor] = useState([]);
    const [price, setPrice] = useState([] as any);
    const [type, setType] = useState<string[]>([]);


    const handleColorFilter = (e: any, color: any, index: any) => {
        if (e.target.checked) {
            const tempData = data && data.filter((item: any) => item.color === color);
            setFilteredData([...filteredData, ...tempData]);
        }
        else {
            const tempData = filteredData && filteredData.filter((item: any) => item.color !== color);
            setFilteredData(tempData);
        }
    };

    const handlePriceFilter = (e: any) => {
        const IntVal = parseInt(e.target.value);
        const tempData = filteredData.length > 0 ? filteredData.filter((item: any) => item.price <= IntVal) : data && data.filter((item: any) => item.price <= IntVal);
        setFilteredData(tempData);
    };

    const handleTypeFilter = (e: any, type: any, index: any) => {
        if (e.target.checked) {
            const tempData = data && data.filter((item: any) => item.type === type);
            setFilteredData([...filteredData, ...tempData]);
        }
        else {
            const tempData = filteredData && filteredData.filter((item: any) => item.type !== type);
            setFilteredData(tempData);
        }
    };


    useEffect(() => {
        if (filteredData.length > 0) {
            console.log(filteredData, 'filteredData');
            setFilterData(filteredData);
        }
    }, [filteredData, setFilterData]);

    useEffect(() => {
        const colorList = data && data.map((item: any) => item.color);
        const uniqueColor = colorList && colorList.filter((item: any, index: any) => colorList.indexOf(item) === index);
        setColor(uniqueColor); //for unique color

        const priceList = data && data.map((item: any) => item.price);
        const minPrice = Math.min(...priceList);
        const maxPrice = Math.max(...priceList);
        setPrice([minPrice, maxPrice]); //for min and max price

        const typeList = data && data.map((item: any) => item.type);
        const uniqueType = typeList && typeList.filter((item: any, index: any) => typeList.indexOf(item) === index);
        setType(uniqueType); //for unique type

    }, [data]);
    return (
        <MainFilterContainer className="heading">
            <ColorContainer>
                <Heading>Color</Heading>
                {/* checkbox and color */}
                <ColorFilterContainer>
                    {color && color.map((item: any, index: number) => {
                        return <ColorFilter key={index}>
                            <ColorFilterInput type="checkbox" onChange={(e) => handleColorFilter(e, item, index)} />
                            <ColorFilterLabel htmlFor={item}>{item}</ColorFilterLabel>
                            <ColorFilterColor color={item}></ColorFilterColor>
                        </ColorFilter>
                    })}
                </ColorFilterContainer>
            </ColorContainer>
            <GenderContainer>
                <Heading>Gender</Heading>
                <ColorFilterContainer>
                    <ColorFilter >
                        <ColorFilterInput type="checkbox" />
                        <ColorFilterLabel htmlFor="Male">Male</ColorFilterLabel>
                    </ColorFilter>
                    <ColorFilter >
                        <ColorFilterInput type="checkbox" />
                        <ColorFilterLabel htmlFor="Female">Female</ColorFilterLabel>
                    </ColorFilter>
                </ColorFilterContainer>
            </GenderContainer>
            <PriceContainer>
                <Heading>Price</Heading>
                <PriceRangeContainer>
                    <MinPrice>₹ {price[0]}</MinPrice>
                    <PriceRange type="range" min={price[0]} max={price[1]} onChange={handlePriceFilter} />
                    <MaxPrice>₹ {price[1]}</MaxPrice>
                </PriceRangeContainer>
            </PriceContainer>
            <TypeContainer>
                <Heading>Type</Heading>
                <ColorFilterContainer>
                    {type && type.map((item: any, index: number) => {
                        return <ColorFilter key={index}>
                            <ColorFilterInput type="checkbox" onChange={(e) => handleTypeFilter(e, item, index)} />
                            <ColorFilterLabel htmlFor={item}>{item}</ColorFilterLabel>
                        </ColorFilter>
                    })}
                </ColorFilterContainer>
            </TypeContainer>
        </MainFilterContainer>
    );
}

export const ColorContainer = styled.div``;

export const GenderContainer = styled.div``;

export const PriceContainer = styled.div``;

export const TypeContainer = styled.div``;

export const Heading = styled.h3``;

export const MainFilterContainer = styled.div`
    position: sticky;
    top: 70px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.44);
`;

export const ColorFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
`;

export const ColorFilter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const ColorFilterInput = styled.input`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-bottom: 5px;
`;

export const ColorFilterLabel = styled.label`
    font-size: 0.8rem;
    color: #000;
    width: 200px;
    margin-left: 10px;
`;

export const ColorFilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
`;

export const PriceRange = styled.input`
    width: 100%;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    &:focus {
        outline: none;
    }
`;

export const PriceRangeContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

export const MinPrice = styled.div`
    width: 50px;
    font-size: 0.7rem;
`;

export const MaxPrice = styled.div`
    width: 50px;
    font-size: 0.7rem;
`;