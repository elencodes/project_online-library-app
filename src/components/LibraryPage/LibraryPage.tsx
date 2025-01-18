import styles from "./LibraryPage.module.scss";

export function LibraryPage() {
	return (
		<>
			<div className={styles.title}>
				<h1 className={styles.title}>Library</h1>
				<input type="text" />
			</div>
			<div className={styles.filters__box}>
				<button></button>
				<button></button>
				<button></button>
				<button></button>
			</div>
		</>
	);
}
