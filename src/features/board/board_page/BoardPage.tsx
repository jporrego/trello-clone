import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
  let boardId: string = useParams().boardId || "";
  const board = useAppSelector((state) => selectBoardById(state, boardId));
  const [lists, setLists] = useState<ListType[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchLists();
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

  const renderedLists = lists.map((list) => {
    return (
      <List
        key={list.id}
        id={list.id}
        list={list}
        setSelectedCard={setSelectedCard}
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
        <AddList boardId={boardId} fetchLists={fetchLists}></AddList>
      </div>
      {selectedCard && (
        <CardModal
          card={selectedCard}
          setSelectedCard={setSelectedCard}
        ></CardModal>
      )}
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
    }
  }
};

export default Board;
