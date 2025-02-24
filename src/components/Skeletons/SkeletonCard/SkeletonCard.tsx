import ShimmerEffect from "../ShimmerEffect/ShimmerEffect";
import styles from "./SkeletonCard.module.scss";

const SkeletonCard = () => {
	return <ShimmerEffect className={styles.card} />;
};

export default SkeletonCard;
