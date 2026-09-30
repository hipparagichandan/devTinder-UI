
const DisplayUserCard = ({user}) => {
  const {firstName, lastName, age, gender, imageUrl,about} = user
  return (
    <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
            <img
            alt="user image"
            src={imageUrl}
            className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
            <h1 className="text-5xl font-bold">{firstName+" " + lastName} </h1>
            <p className="py-6">
                {gender+", "+age}
            </p>
            <p className="py-6">
                {about}
            </p>
            </div>
        </div>
    </div>
  )
}

export default DisplayUserCard