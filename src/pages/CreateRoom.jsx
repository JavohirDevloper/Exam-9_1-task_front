import "./styles.css";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const POST_ROOM = gql`
  mutation create($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`;
function CreateRoom() {
  const [name, setName] = useState("");
  const [floor, setFloor] = useState("");
  const [for_stuff, setForStuff] = useState(false);
  const [createRoom, { data, loading, error }] = useMutation(POST_ROOM);
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000 + 1); //
    createRoom({
      variables: { id, input: { name, floor: parseInt(floor), for_stuff } },
    });
    setName("");
    setFloor("");
    setForStuff(false);
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return `Error: ${error.message}`;

  return (
    <div className="w-100 h-100 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="form-control">
        <label> 
          Xona nomi:
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Xona nomi"
          />
        </label>
        <br />
        <label>
          Qavati:
          <input
            className="input"
            type="number"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            placeholder="Qavati"
          />
        </label>{" "}
        <br />
        <label>
          <br />
          <label>
            <input
              className="input"
              type="checkbox"
              checked={for_stuff}
              onChange={(e) => setForStuff(e.target.checked)}
            />
            Adminlar uchunmi?
          </label>
        </label>
        <br />
        <button className="btn" type="submit">
          AddRoom
        </button>
      </form>
      {data && (
        <p className="result">
          Xona yaratildi: {data.createRoom.name} Qavat: {data.createRoom.floor}{" "}
          Jihozlar: {data.createRoom.for_stuff.toString()}
        </p>
      )}
    </div>
  );
}

export default CreateRoom;
