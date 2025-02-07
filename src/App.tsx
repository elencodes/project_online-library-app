import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import { Header } from "./components/Header/Header";
import LibraryPage from "./components/LibraryPage/LibraryPage";
import BookPage from "./components/BookPage/BookPage";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import "./App.scss";

const App: React.FC = () => {
	return (
		<>
			<Provider store={store}>
				<Router basename="/project_online-library-app">
					<div className="app">
						<Header />
						<Routes>
							<Route path="/" element={<LibraryPage />} />
							<Route path="/bookpage" element={<BookPage />} />
							<Route path="/addbook" element={<AddBookForm />} />
							{/* <Route path="/addbook" element={<AddBook />} />
					<Route path="*" element={<MissingPage />} /> */}
						</Routes>
					</div>
				</Router>
			</Provider>
		</>
	);
};

export default App;
