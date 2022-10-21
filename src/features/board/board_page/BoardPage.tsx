import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectBoardById } from "../boardsSlice";
import { selectUser } from "../../user/UserSlice";
import { useNavigate } from "react-router-dom";

import { List as ListType } from "../../../types";
import { Card } from "../../../types";
import List from "../../list/List";
import AddList from "../add_list/AddList";
import styles from "./BoardPage.module.css";
import CardModal from "../../card/card_modal/CardModal";

interface ParamType {
  boardId: string;
}

const Board = () => {
  const user = useAppSelector(selectUser);
  let boardId: string = useParams().boardId || "";
  const board = useAppSelector((state) => selectBoardById(state, boardId));
  const [lists, setLists] = useState<ListType[]>([]);
  const [listsOrder, setlistsOrder] = useState<number[]>([]);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchLists();
    fetchListsOrder();
  }, []);

  useEffect(() => {
    if (user.id === null) {
      navigate("/login");
    }
  }, []);

  const fetchLists = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/boards/${boardId}/lists`
      );
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListsOrder = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/boards/${boardId}/lists/order`
      );

      const data = await response.json();
      setlistsOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateListOrder = async (newListOrder: number[]) => {
    try {
      const url =
        process.env.REACT_APP_API_URL + `api/boards/${boardId}/lists/order`;
      const data = {
        list_order: newListOrder,
      };
      const response = await axios.put(url, data);
      if (response.status === 200) {
        fetchLists();
        fetchListsOrder();
      }
    } catch (error) {
      console.log(error, 111);
    }
  };

  const renderedLists = lists.map((list) => {
    return (
      <List
        key={list.id}
        id={list.id}
        list={list}
        //setSelectedCard={setSelectedCard}
        fetchlists={fetchLists}
      ></List>
    );
  });

  return (
    <div className={styles.boardPage}>
      <div className={styles.boardPageTopSection}>
        <div className={styles.title}>{board?.name}</div>
      </div>

      <div className={styles.lists}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lists}
            strategy={horizontalListSortingStrategy}
          >
            {renderedLists}
          </SortableContext>
        </DndContext>
        <AddList
          boardId={boardId}
          fetchLists={fetchLists}
          fetchListsOrder={fetchListsOrder}
        ></AddList>
      </div>
      {/*selectedCard && (
        <CardModal
          card={selectedCard}
          setSelectedCard={setSelectedCard}
        ></CardModal>
      )*/}
    </div>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;
    console.log(active, over);
    if (active.id !== over.id) {
      setLists((lists) => {
        const oldIndex = lists.findIndex((list) => list.id === active.id);
        const newIndex = lists.findIndex((list) => list.id === over.id);
        console.log(oldIndex, newIndex);
        return arrayMove(lists, oldIndex, newIndex);
      });
      const oldIndex = listsOrder.findIndex((id) => id === active.id);
      const newIndex = listsOrder.findIndex((id) => id === over.id);
      const newArray = arrayMove(listsOrder, oldIndex, newIndex);
      updateListOrder(newArray);
    }
  }
};

export default Board;
