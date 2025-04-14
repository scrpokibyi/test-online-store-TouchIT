import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { MenuList } from './MenuList/MenuList';
import { useProducts } from '../../hooks/useProducts';
import { useProductFilters } from '../../hooks/useProductFilters';

export function Menu() {
    const { 
        products, 
        isLoading, 
        error, 
        categories
    } = useProducts();

    const {
        displayedProducts,
        filters,
        handleSearchChange,
        handleCategoryChange,
        handleSortChange,
        handleItemsPerPageChange,
    } = useProductFilters(products);

    return (
        <>
            <div className={styles.head}>
                <Headling>Меню</Headling>
                <div className={styles.filters}>
                    <Search 
                        placeholder='Что вы хотите найти?' 
                        onChange={(e) => handleSearchChange(e.target.value)} 
                        value={filters.searchTerm}
                    />
                    <select
                        className={styles.categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        value={filters.category}
                    >
                        <option value="">Все категории</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        className={styles.pageSizeFilter}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        value={filters.itemsPerPage}
                    >
                        {[5, 10, 15, 20].map(size => (
                            <option key={size} value={size}>
                                Показывать: {size}
                            </option>
                        ))}
                    </select>
                    <button 
                        className={styles.sortButton}
                        onClick={handleSortChange}
                    >
                        Цена {filters.sortDirection === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>
            <div>
                {error && <div className={styles.error}>{error}</div>}
                {isLoading && <div>Загружаем товары...</div>}
                {!isLoading && displayedProducts.length > 0 && (
                    <MenuList products={displayedProducts} />
                )}
                {!isLoading && displayedProducts.length === 0 && (
                    <div>
                        {filters.category || filters.searchTerm
                            ? `Не найдено товаров${filters.searchTerm ? ` по запросу "${filters.searchTerm}"` : ''}${filters.category ? ` в категории "${filters.category}"` : ''}`
                            : 'Нет доступных товаров'}
                    </div>
                )}
            </div>
        </>
    );
}

export default Menu;