import { Suspense } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Product as ProductType } from '../../interfaces/product.interface';
import styles from './Product.module.css';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';

export function Product() {
    const data = useLoaderData() as { data: ProductType };
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const addToCart = (product: ProductType) => {
        dispatch(cartActions.add(product.id));
        navigate('/cart'); 
    };

    return (
        <>
            <Suspense fallback={'Загружаю...'}>
                <Await resolve={data.data}>
                    {({ data }: { data: ProductType }) => (
                        <div className={styles.container}>
                            <div className={styles.header}>
                                <Headling>{data.title}</Headling>
                            </div>
                            
                            <div className={styles.productContent}>
                                <div className={styles.imageContainer}>
                                    <img 
                                        src={data.image} 
                                        alt={data.title}
                                        className={styles.image}
                                    />
                                </div>
                                
                                <div className={styles.details}>
                                    <div className={styles.priceRow}>
                                        <span className={styles.priceLabel}>Цена:</span>
                                        <span className={styles.price}>
                                            ${data.price.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className={styles.rating}>
                                        ★ {data.rating.rate} 
                                        <span className={styles.ratingCount}>
                                            ({data.rating.count} отзывов)
                                        </span>
                                    </div>
                                    
                                    <div className={styles.category}>
                                        <span>Категория:</span>
                                        <span className={styles.categoryValue}>
                                            {data.category}
                                        </span>
                                    </div>
                                    
                                    <p className={styles.description}>
                                        {data.description}
                                    </p>
                                    
                                    <Button 
                                        className={styles.addButton}
                                        onClick={() => addToCart(data)}
                                    >
                                        Добавить в корзину
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>
        </>
    );
}