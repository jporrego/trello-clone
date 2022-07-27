import React, { useState, useEffect } from "react";
import { List as ListType } from "../../types";

interface ListProps {
  list: ListType;
}
const List: React.FC<ListProps> = ({ list }) => {
  return <div>{list.name}</div>;
};

export default List;
