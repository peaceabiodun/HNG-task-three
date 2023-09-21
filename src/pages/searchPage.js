import React, { useState } from "react";
import search from "../assets/Search.svg";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/arrowBack.svg";
import { fruitList } from "../utils/data";

const SearchPage = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch();
  };

  const handleSearch = () => {
    const filteredItems = fruitList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredItems);
  };

  return (
    <div className="p-2 sm:p-5 py-10 flex flex-col gap-6 items-center">
      <div className="flex w-full ">
        <div
          onClick={() => navigate('/Dashboard')}
          className="h-[40px] w-[40px] flex justify-center items-center bg-gray-300 rounded-[30px]"
        >
          <img className="cursor-pointer" src={arrow} alt="" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="flex border border-[#D1D5DB] rounded-[6px] h-[36px] w-[96%] sm:w-[80%]">
          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-[10px] text-sm bg-transparent outline-none"
            placeholder="What do you want to watch"
            onFocus={() => {
              navigate("/Search");
            }}
          />
          <div
            onClick={handleSearch}
            className="w-8 bg-slate-800 flex rounded-r-[6px] justify-center cursor-pointer items-center"
          >
            <img className="h-[16px] w-[16px]" src={search} alt="" />
          </div>
        </div>

        {results.length > 0 && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 ">
            {results.map((result) => (
              <div className="pt-4" key={result.id}>
                <div className="relative">
                  <img className="h-[240px] xs:h-[280px] w-[300px]" src={result.img} alt="" />
                  <div className="absolute bottom-3 bg-[#000000ad] text-white py-1 flex justify-center w-full">
                    <p>{result.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
