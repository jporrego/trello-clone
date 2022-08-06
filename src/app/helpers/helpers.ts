export function handleShowForm(
  formState: boolean,
  setFormState: React.Dispatch<React.SetStateAction<boolean>>,
  idsToCheck: string[]
): void {
  const handleClickOutside = (e: MouseEvent) => {
    console.log(1);
    let filteredIds: string[] = [];
    if (e.target instanceof Element) {
      //@ts-ignore
      filteredIds = idsToCheck.filter((id) => id === e.target.id);
      if (filteredIds.length === 0) {
        setFormState(false);
      }
    }
  };

  if (formState) {
    document.addEventListener("click", handleClickOutside, true);
  } else {
    console.log(2);
    document.removeEventListener("click", handleClickOutside, true);
  }
}
