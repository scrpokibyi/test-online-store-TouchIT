import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export function MenuList({ products }: MenuListProps) {
	return <div className={styles.wrapper}>{products.map(p => (
		<ProductCard
			key={p.id}
			id={p.id}
			title={p.title}
			description={p.description}
			rating={{
				rate: p.rating.rate,
				count: p.rating.count 
  }}
			price={p.price}
			image={p.image}
			category={p.category}
			
		/>
	))}
	</div>;
}