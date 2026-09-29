import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, about, imageUrl} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
            <img
            src={imageUrl}
            alt="userImage" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{`${gender}, ${age}`}</p>
            <p>{about}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Show Interest</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard