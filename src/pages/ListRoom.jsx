import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const GET_ROOM = gql`
  query GetRooms {
    rooms {
      list {
        id
        name
        floor
        for_stuff
      }
    }
  }
`;

const REMOVE_ROOMS = gql`
  mutation removeRoom($id: ID!) {
    removeRoom(id: $id) {
      id
    }
  }
`;
const ListRoom = () => {
  const [removeRoom, { loading: loadingRemove, error: errorRemove }] =
    useMutation(REMOVE_ROOMS);

  const { loading, error, data, refetch } = useQuery(GET_ROOM);

  if (loading || loadingRemove) {
    return "Loading...";
  }

  if (error || errorRemove) {
    return `Error: ${error ? error.message : errorRemove.message}`;
  }
  return (
    <div>
      <div className="py-5">
        <div className="container">
          <div className="row flex-row flex-wrap">
            {data.rooms.list.map((d, i) => (
              <div className="col-md-4" key={i}>
                <div className="card mb-4 p-4">
                  <div className="card-block">
                    <span>Xona raqami: {i}</span>
                    <h4 className="card-title">Xona nomi: {d.name}</h4>
                    <p className="card-text p-y-1">Qavati: {d.floor}</p>
                    <p className="card-text p-y-1">
                      Adminlar uchunmi? {d.for_stuff ? "true" : "false"}
                    </p>
                  </div>
                  <Link className="btn" to={`/show-room/${d.id}`}>
                    Show Room
                  </Link>
                  <Link
                    className="btn"
                    onClick={() =>
                      removeRoom({
                        variables: { id: Number(d.id) },
                      }).then(refetch)
                    }
                  >
                    Remove
                  </Link>
                  <Link
                    className="btn"
                    type="submit"
                    to={`/update-room/${d.id}`}
                  >
                    {" "}
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
