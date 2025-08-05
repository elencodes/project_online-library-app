<div id="header">
<h1>LIBRI D'ORO - online library for searching books</h1>
	<p>A Single Page Application  (SPA) using the Google Books API allows you to find books based on various criteria (title, author, keyword) and get detailed information about them, including covers, genres and annotations. Built using Typescript, React and Redux.</p>
<img src="https://github.com/elencodes/project_online-library-app/blob/main/public/gif/promo.gif">
<h2>Application link:</h2>
<a href="https://elencodes.github.io/project_online-library-app/">LIBRI D'ORO</a>
<h2>Used technologies:</h2> 
	<div id=technologies>
		<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
		<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
		<img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white">
		<img src="https://img.shields.io/badge/vite-%23CCD3FF?style=for-the-badge&logo=vite&logoColor=%23FFB600&color=%23827FFF">
		<img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white">
		<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
		<img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
	</div>
<h2>Application functionality:</h2>
<ul>
  <li>The "Library" page will display the top 100 books by default. Books are cards derived from the book cover image, book title and author name. A book card can be added to favorites or removed from the screen if it is not interesting.</li>
  <li>Using the search bar, you can find the books or authors you are interested in. You can search in both English and Russian. The maximum number of search results returned is 30.</li>
  <li>To optimize data loading from the server and sequential display of content, page-by-page pagination is used (step is 10 cards).</li>
  <li>Filtering has been implemented: to view all book cards ("All books"), added to favorites ("Favorites") and created book cards ("New books"). The "All books" filter is set by default.</li>
  <li>When you click on the card, the "Book Page" opens with its data: cover, title, all genres, all authors, description. The function of adding to favorites and deleting is also available.</li>
  <li>On the "Add Book Page", a form of adding a new book to the library has been implemented (with validation hints for correct data entry). When a card is successfully added, a notification appears, and the card itself can be found on the "Library" page in the active filter "New books".</li>
</ul>
<img src="https://github.com/elencodes/project_online-library-app/blob/main/public/github/mobile-library-page.png" height="380">
<img src="https://github.com/elencodes/project_online-library-app/blob/main/public/github/mobile-book-page.png" height="380">
<img src="https://github.com/elencodes/project_online-library-app/blob/main/public/github/mobile-form-page.png" height="380">
<h2>Developed by:</h2> 
<div id=bages>
	<p><a href="https://github.com/elencodes"><img src="https://img.shields.io/badge/ELENA-2E2844?style=for-the-badge&logo=github"></a></p>
  <p>Contacts: <a href="https://t.me/elencodes">Telegram</a> | <a href="mailto:esadikova.codes@gmail.com">E-mail</a></p>
</div>
