import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import { Header } from "./components/Header/Header";
import LibraryPage from "./components/LibraryPage/LibraryPage";
import BookPage from "./components/BookPage/BookPage";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import StartPage from "./components/StartPage/StartPage";
import "./App.scss";

const App: React.FC = () => {
	return (
		<>
			<Provider store={store}>
				<Router basename="/project_online-library-app">
					<div className="app">
						<Routes>
							<Route path="/" element={<StartPage />} />
							<Route
								path="/library"
								element={
									<>
										{" "}
										<Header /> <LibraryPage />
									</>
								}
							/>
							<Route
								path="/book/:id"
								element={
									<>
										{" "}
										<Header /> <BookPage />
									</>
								}
							/>
							<Route
								path="/addbook"
								element={
									<>
										{" "}
										<Header />
										<AddBookForm />
									</>
								}
							/>
						</Routes>
					</div>
				</Router>
			</Provider>
		</>
	);
};

export default App;
