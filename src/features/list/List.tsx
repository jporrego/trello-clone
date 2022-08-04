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
import { BiDotsHorizontalRounded } from "react-icons/bi";
import styles from "./List.module.css";
import ListPopover from "./ListPopover/ListPopover";
import CardModal from "../card/card_modal/CardModal";

interface ListProps {
  list: ListType;
  id: string;
  fetchlists: () => Promise<void>;
}
const List: React.FC<ListProps> = ({ list, fetchlists }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardsOrder, setCardsOrder] = useState<number[]>([]);
  const [showListMenu, setShowListMenu] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<CardType>();

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

  const handleDeleteList = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/lists/${list.id}`
      );
      fetchlists();
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging && 100,
    boxShadow: isDragging && "0px 2px 4px rgba(0,0,0,.35)",
  };

  const zIndexStyle = () => {
    if (showListMenu || selectedCard) {
      return styles.list;
    } else {
      return undefined;
    }
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
      id={zIndexStyle()}
      ref={setNodeRef}
      //@ts-ignore
      style={style}
    >
      <div className={styles.header}>
        <div className={styles.title} {...listeners} {...attributes}>
          {list.name}
        </div>
        <ListPopover
          setShowListMenu={setShowListMenu}
          handleDeleteList={handleDeleteList}
        ></ListPopover>
        {/*
        <div
          className={styles.btnListMenu}
          onClick={() => setShowListMenu(true)}
        >
          <BiDotsHorizontalRounded></BiDotsHorizontalRounded>
  </div>*/}
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
      {selectedCard && (
        <CardModal
          card={selectedCard}
          setSelectedCard={setSelectedCard}
          fetchCards={fetchCards}
          fetchCardsOrder={fetchCardsOrder}
        ></CardModal>
      )}
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
