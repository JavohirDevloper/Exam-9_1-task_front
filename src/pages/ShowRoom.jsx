import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_ROOM = gql`
  query ($roomId: ID!) {
    room(id: $roomId) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function ShowRoom() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { roomId: id },
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <div>
      <div className="col-md-4" key={data.room.id}>
        <div className="card mb-4 p-4">
          <div className="card-block">
            <span>Xona raqami: {data.room.id}</span>
            <h4 className="card-title">Xona nomi: {data.room.name}</h4>
            <p className="card-text p-y-1">Qavati: {data.room.floor}</p>
            <p className="card-text p-y-1">
              Adminlar uchunmi? {data.room.for_stuff ? "true" : "false"}
            </p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default ShowRoom;
