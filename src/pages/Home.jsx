import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-[80vh] grid place-items-center w-[90%] m-auto text-center md:w-2/3 capitalize">
      <h1 className="md:text-5xl font-bold leading-normal">
        Welcome to your <span className="text-red-600">Item</span> Manager.{" "}
        <br />
        We help you organize and keep track of your Items. Follow{" "}
        <Link to="/items">
          <span className="text-red-600 hover:underline underline-offset-8">
            <i>here</i>
          </span>{" "}
        </Link>{" "}
        to check out your Items.
      </h1>
    </div>
  );
}

export default Home;
