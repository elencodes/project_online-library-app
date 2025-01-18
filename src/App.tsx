import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { LibraryPage } from "./components/LibraryPage/LibraryPage";
import "./App.scss";

function App() {
	return (
		<>
			<Router basename="/project_online-library-app">
				<div className="app">
					<div className="container">
						<Header />
						<Routes>
							<Route path="/" element={<LibraryPage />} />
							{/* <Route path="/addbook" element={<AddBook />} />
					<Route path="*" element={<MissingPage />} /> */}
						</Routes>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
