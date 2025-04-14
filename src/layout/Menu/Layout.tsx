import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function Layout() {
    const items = useSelector((s: RootState) => s.cart.items);

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.menu}>
                    <NavLink 
                        to='/' 
                        className={({ isActive }) => cn(styles.link, {
                            [styles.active]: isActive
                        })}
                    >
                        <img src="/menu-icon.svg" alt="Иконка меню" />
                        Меню
                    </NavLink>
                    <NavLink 
                        to='/cart' 
                        className={({ isActive }) => cn(styles.link, {
                            [styles.active]: isActive
                        })}
                    >
                        <img src="/cart-icon.svg" alt="Иконка корзины" />
                        Корзина 
                        <span className={styles.cartCount}>
                            {items.reduce((acc, item) => acc += item.count, 0)}
                        </span>
                    </NavLink>
                </div>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}