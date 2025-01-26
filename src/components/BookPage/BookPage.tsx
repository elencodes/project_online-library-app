import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";
import poster from "../../assets/images/promo.svg";
import styles from "./BookPage.module.scss";

const BookPage = () => {
	return (
		<>
			<div className="container">
				<section className={styles.section}>
					<GoBackButton text={"Back to Library"} />
					<div className={styles.content}>
						<div className={styles.image__box}>
							<img className={styles.image} src={poster} alt="poster" />
						</div>
						<h1 className={styles.title}>
							Lord of the Rings: The Fellowship of The Ring
						</h1>
						<h2 className={styles.subtitle}>J. R. R. Tolkien</h2>
						<h3 className={styles.genres}>Fantasy ~ Fantasy</h3>
						<div className={styles.button__container}>
							<DeleteButton />
							<FavouritesButton />
						</div>
						<div className={styles.description__box}>
							<h4 className={styles.description__title}>About book</h4>
							<p className={styles.description}>
								The first volume in J.R.R. Tolkien's epic adventure The
								Lord of the Rings. Beautifully illustrated by renowned
								Tolkien artist Alan Lee, this jacketed hardcover edition
								of The Fellowship Of The Ring is complete with map
								endpapers (Middle-earth at the end of the Third Age) as
								well as full-color plates.
							</p>
							<p className={styles.description}>
								One Ring to rule them all, One Ring to find them, One
								Ring to bring them all and in the darkness bind them.
							</p>
							<p className={styles.description}>
								In ancient times the Rings of Power were crafted by the
								Elven-smiths, and Sauron, the Dark Lord, forged the One
								Ring, filling it with his own power so that he could
								rule all others. But the One Ring was taken from him,
								and though he sought it throughout Middle-earth, it
								remained lost to him. After many ages it fell into the
								hands of Bilbo Baggins, as told in The Hobbi...
								<span className={styles.description__toggle}>
									Read More
								</span>
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default BookPage;
