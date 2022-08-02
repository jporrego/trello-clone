import React, { useState, useEffect } from "react";
import { List as ListType } from "../../types";
import { Card as CardType } from "../../types";
import axios from "axios";

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
  setSelectedCard: React.Dispatch<React.SetStateAction<CardType | undefined>>;
}
const List: React.FC<ListProps> = ({ list, setSelectedCard }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardsOrder, setCardsOrder] = useState<number[]>([]);

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
    fetchCardsOrder();
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

  const fetchCardsOrder = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/lists/${list.id}/cards/order`
      );

      const data = await response.json();
      setCardsOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCardOrder = async (newCardOrder: number[]) => {
    try {
      const url =
        process.env.REACT_APP_API_URL + `api/lists/${list.id}/cards/order`;
      const data = {
        card_order: newCardOrder,
      };
      const response = await axios.put(url, data);
      if (response.status === 200) {
        fetchCards();
        fetchCardsOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging && 100,
  };

  const renderedCards = cards?.map((card) => {
    return (
      <Card
        key={card.id}
        card={card}
        fetchCards={fetchCards}
        setSelectedCard={setSelectedCard}
      ></Card>
    );
  });

  return (
    <div
      className={styles.list}
      ref={setNodeRef}
      //@ts-ignore
      style={style}
    >
      <div className={styles.title} {...listeners} {...attributes}>
        {list.name}
      </div>
      <div className={styles.cards}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={cards} strategy={verticalListSortingStrategy}>
            {renderedCards}
          </SortableContext>
        </DndContext>
      </div>
      <AddCard
        listId={list.id}
        fetchCards={fetchCards}
        fetchCardsOrder={fetchCardsOrder}
      ></AddCard>
    </div>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCards((cards) => {
        const oldIndex = cards.findIndex((card) => card.id === active.id);
        const newIndex = cards.findIndex((card) => card.id === over.id);
        const newArray = arrayMove(cards, oldIndex, newIndex);
        return newArray;
      });
      const oldIndex = cardsOrder.findIndex((id) => id === active.id);
      const newIndex = cardsOrder.findIndex((id) => id === over.id);
      const newArray = arrayMove(cardsOrder, oldIndex, newIndex);
      updateCardOrder(newArray);
    }
  }
};

export default List;
