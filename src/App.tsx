import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import LibraryPage from "./components/LibraryPage/LibraryPage";
import "./App.scss";
import BookPage from "./components/BookPage/BookPage";

function App() {
	return (
		<>
			<Router basename="/project_online-library-app">
				<div className="app">
					<Header />
					<Routes>
						<Route path="/" element={<LibraryPage />} />
						<Route path="/bookpage" element={<BookPage />} />
						{/* <Route path="/addbook" element={<AddBook />} />
					<Route path="*" element={<MissingPage />} /> */}
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
