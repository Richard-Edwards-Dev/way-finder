import React from "react";

function CharacterFeats({ feats, onFeatsChange }) {
  return (
    <div>
      <h3>Feats</h3>
      {feats.map((feat, index) => (
        <input
          key={index}
          value={feat}
          onChange={(e) => {onFeatsChange(index, e.target.value)}}
        />
      ))}
    </div>
  );
}

export default CharacterFeats;