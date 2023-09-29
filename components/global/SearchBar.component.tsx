import styled from "styled-components";
import { useEffect, useState } from "react";

interface SearchBarProps {
    data?: [] | any;
}

export default function SearchBar({ data }: SearchBarProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const handleSearch = (e: any) => {
        setSearchInput(e.target.value);
        filterData(data);
    };
    const filterData = (data: any) => {
        // filter data here if data is not empty then return no data found 
        if (data.length > 0) {
            setFilteredData(data && data.filter((item: any) => item.name.toLowerCase().includes(searchInput)));
        }
        else {
            setFilteredData([]);
        }
    };
    const handleDropdownClick = () => {}
    return (
        <><SearchBarContainer className="container">
            <SearchBarInput type="text" placeholder="Search..." onChange={handleSearch} onFocus={() => setShowDropdown(true)} value={searchInput} />
            <SearchBarBtn>
                <svg width="128" height="128" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z" />
                </svg>
            </SearchBarBtn>
            <FilterBtn>
                <svg width="128" height="128" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M16 120h480v48H16zm80 112h320v48H96zm96 112h128v48H192z" />
                </svg>
            </FilterBtn>
        </SearchBarContainer>
            {searchInput.length > 0 && filteredData.length > 0 && showDropdown && <SearchDropdown className="container">
                {filteredData ? <ul>
                    {filteredData.map((item: any, index: number) => {
                        return <DropDownItem key={index}>{item.name ? item.name : 'No Data'}</DropDownItem>
                    })}
                </ul> : <div>No Data</div>}
            </SearchDropdown>
            }
        </>
    );
}

export const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
    @media screen and (min-width: 768px) {
        margin :20px auto;
        justify-content: center;
        gap: 20px;
    }
`;


export const SearchBarInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 10px;
    font-size: 1rem;
    &:focus {
        outline: none;
    }
    @media screen and (min-width: 768px) {
        width: 50%;
    }
`;

export const SearchBarBtn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: none;
    }
    @media screen and (min-width: 768px) {
        width: 50px;
    }
    svg {
        width: 20px;
        height: 20px;
    }
`;

export const FilterBtn = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: var(--primary-color);
    color: #000;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: none;
    }
    @media screen and (min-width: 768px) {
       display: none;
    }
    svg {
        width: 20px;
        height: 20px;
    }
`;

export const SearchDropdown = styled.div`
    width: 83%;
    margin: 10px auto;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    overflow: scroll;
    max-height: 200px;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    @media screen and (min-width: 768px) {
        width: 51%;
        position: absolute;
        top: 20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        background-color: #fff;
        z-index: 1;

    }
`;

export const DropDownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &:hover {
        background-color: #ccc;
    }
`;