import styles from "./ShimmerEffect.module.scss";

interface ShimmerEffectProps {
	className?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ className }) => {
	return (
		<>
			<div className={`${styles.shimmer} ${className || ""}`}></div>
		</>
	);
};

export default ShimmerEffect;
