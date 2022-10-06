import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Todo } from "./todos.jsx";

//create your first component
const Home = () => {
	return (
		<div className="container text-center">
			<h1 className="text-center mt-5 text-white pb-4">My ToDo list</h1>
			<Todo/>
		</div>
	);
};

export default Home;