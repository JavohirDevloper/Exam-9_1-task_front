import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
const GET_ROOM = gql`
  query getRoom($roomId: ID!) {
    room(id: $roomId) {
      id
      name
      floor
      for_stuff
    }
  }
`;
const UPDATE_ROOM = gql`
  mutation update($updateRoomId: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $updateRoomId, input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [update, setUpdate] = useState({});
  const [loadUser, { called, loading, error, refetch }] =
    useLazyQuery(GET_ROOM);
  const [updateRoom, { loading: loading1, error: error1 }] =
    useMutation(UPDATE_ROOM);

  useEffect(() => {
    loadUser({
      variables: { roomId: id, input: update, updateRoomId: id },
    }).then(({ data }) => {
      setUpdate(data.room);
    });
  }, []);

  if ((loading && called) || loading1) {
    return "Loading...";
  }

  if (error || error1) {
    return `Error: ${error ? error.message : error1.message}`;
  }

  return (
    <form
      className="form-control my-2"
      onSubmit={(e) => {
        e.preventDefault();
        updateRoom({
          variables: {
            updateRoomId: id,
            input: {
              name: update.name,
              floor: update.floor,
              for_stuff: update.for_stuff,
            },
          },
        });
      }}
    >
      <label>
        {" "}
        <br />
        Xona nomi:
        <input
          type="text"
          value={update.name}
          onChange={(e) => setUpdate({ name: e.target.value })}
        />
      </label>{" "}
      <br />
      <label>
        Qavati:
        <input
          type="number"
          value={update.floor}
          onChange={(e) =>
            setUpdate({
              floor: +e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Admin uchunmi?
        <input
          type="checkbox"
          checked={update.for_stuff}
          value={update.for_stuff}
          onChange={(e) =>
            setUpdate({
              for_stuff: e.target.checked,
            })
          }
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateRoom;
