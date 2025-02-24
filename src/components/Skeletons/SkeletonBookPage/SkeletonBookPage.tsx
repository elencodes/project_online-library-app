import ShimmerEffect from "../ShimmerEffect/ShimmerEffect";
import styles from "./SkeletonBookPage.module.scss";

const SkeletonBookPage: React.FC = () => {
	return (
		<>
			<div className={styles.skeletonPage}>
				<ShimmerEffect className={styles.poster} />
				<ShimmerEffect className={styles.title} />
				<ShimmerEffect className={styles.subtitle} />
				<ShimmerEffect className={styles.genres} />
				<ShimmerEffect className={styles.buttons} />
			</div>
		</>
	);
};

export default SkeletonBookPage;
