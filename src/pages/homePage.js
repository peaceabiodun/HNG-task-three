import React, { useState, useEffect } from "react";
import search from "../assets/Search.svg";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { imageArray } from "../utils/data";

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log( uid);
      } else {
        console.log("user logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const [imagelist, setImageList] = useState(imageArray);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImageList = [...imagelist];
    const [reorderedItem] = updatedImageList.splice(result.source.index, 1);
    updatedImageList.splice(result.destination.index, 0, reorderedItem);
    setImageList(updatedImageList);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredItems = imageArray.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(filteredItems);
  };

  return (
    <div className="p-2 sm:p-5 py-10 flex flex-col gap-6 items-center">
      <div className="flex justify-end w-full">
        <button
          onClick={handleLogout}
          className="text-xs text-white bg-[#ff3939] w-28 h-[38px] flex justify-center items-center font-bold rounded-[8px]"
        >
          LOG OUT
        </button>
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
          <ul>
            <div className="flex justify-end">x</div>
            {results.map((result) => (
              <li key={result.id}>
                <img src={result.img} alt='' />
              </li>
            ))}
          </ul>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 xs:gap-5 xl:grid-cols-4 gap-y-8 justify-items-center"
            >
              {imagelist.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative shadow "
                    >
                      <img className=" w-[300px] h-[270px] xs:h-[360px]" src={item.img} />
                      <div className="absolute bottom-3 bg-[#000000ad] text-white py-1 flex justify-center w-full">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
