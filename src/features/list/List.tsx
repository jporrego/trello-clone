import React, { useState, useEffect } from "react";
import { List as ListType } from "../../types";
import { Card as CardType } from "../../types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

import Card from "../card/Card";
import AddCard from "../card/add_card/AddCard";
import styles from "./List.module.css";

interface ListProps {
  list: ListType;
  id: string;
}
const List: React.FC<ListProps> = ({ list }) => {
  const [cards, setCards] = useState<CardType[]>();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/lists/${list.id}/cards`
      );
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const renderedCards = cards?.map((card) => {
    return <Card key={card.id} card={card} fetchCards={fetchCards}></Card>;
  });

  return (
    <div
      className={styles.list}
      ref={setNodeRef}
      //@ts-ignore
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={styles.title}>{list.name}</div>
      {renderedCards}
      <AddCard listId={list.id} fetchCards={fetchCards}></AddCard>
    </div>
  );
};

export default List;
