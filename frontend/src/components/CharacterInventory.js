import { useState } from "react";

function CharacterInventory({ character, onCharacterUpdate }) {
  const [inventory, setInventory] = useState(character.inventory.length ? character.inventory : [''])


  
  const onInventoryChange = (index, value) => {
    const newInventory = [...inventory];
    newInventory[index] = value;
    setInventory(newInventory);

    const updatedCharacter = {
      ...character,
      inventory: newInventory
  }

  onCharacterUpdate(updatedCharacter)
    // Add a new field when the last field is filled
    if (index === newInventory.length - 1 && value !== "") {
      newInventory.push("");
      setInventory(newInventory);
    }
  }

  const handleDelete = (index) => {
    const newInventory = [...inventory];
    newInventory.splice(index, 1);
    setInventory(newInventory);
    const updatedCharacter = {
      ...character,
      inventory: newInventory
  }
    onCharacterUpdate(updatedCharacter)
  };

  return (
    <div className="inventory">
      <h3>Inventory:</h3>
      {inventory.map((item, index) => (
        <div className='item' key={index}>
          <input
            key={index}
            value={item}
            onChange={(event) => onInventoryChange(index, event.target.value)}
          />
          <span
            className="item material-symbols-outlined"
            onClick={() => handleDelete(index)}
          >
            delete
          </span>
        </div>
      ))}
    </div>
  );
}

export default CharacterInventory;