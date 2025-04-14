import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

export function Cart() {
    const [cartProducts, setCardProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const DELIVERY = 20;

    const total = items.map(i => {
        const product = cartProducts.find(p => p.id === i.id);
        if (!product) {
            return 0;
        }
        return i.count * product.price;
    }).reduce((acc, i) => acc += i, 0);

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCardProducts(res);
    };

    const checkout = async () => {
        if (items.length === 0) {
            return;
        }
        dispatch(cartActions.clean());
        navigate('/success');
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return <>
        <Headling className={styles.headling}>Корзина</Headling>
        {items.map(i => {
            const product = cartProducts.find(p => p.id === i.id);
            if (!product) {
                return;
            }
            return <CartItem key={product.id} count={i.count} {...product} />;
        })}
        <div className={styles.line}>
            <div className={styles.text}>Итог</div>
            <div className={styles.price}>{total.toFixed(2)}&nbsp;<span>$</span></div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.line}>
            <div className={styles.text}>Доставка</div>
            <div className={styles.price}>{DELIVERY}&nbsp;<span>$</span></div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.line}>
            <div className={styles.text}>Итог <span className={styles.totalCount}>({items.length})</span></div>
            <div className={styles.price}>{(total + DELIVERY).toFixed(2)}&nbsp;<span>$</span></div>
        </div>
        <div className={styles.checkout}>
            <Button appearence="big" onClick={checkout}>Оформить</Button>
        </div>
    </>;
}