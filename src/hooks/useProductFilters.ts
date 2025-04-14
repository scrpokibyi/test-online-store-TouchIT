import { useMemo } from "react";
import { Product } from "../interfaces/product.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { filtersActions } from "../store/filters.slice";

export function useProductFilters(initialProducts: Product[]) {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);

  const displayedProducts = useMemo(() => {
    let result = [...initialProducts];

    if (filters.searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    result.sort((a, b) => {
      return filters.sortDirection === "asc"
        ? a.price - b.price
        : b.price - a.price;
    });

    return result.slice(0, filters.itemsPerPage);
  }, [initialProducts, filters]);

  const handleSearchChange = (value: string) => {
    dispatch(filtersActions.setSearchTerm(value));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(filtersActions.setCategory(category));
  };

  const handleSortChange = () => {
    const newDirection = filters.sortDirection === "asc" ? "desc" : "asc";
    dispatch(filtersActions.setSortDirection(newDirection));
  };

  const handleItemsPerPageChange = (size: number) => {
    dispatch(filtersActions.setItemsPerPage(size));
  };

  return {
    displayedProducts,
    filters,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleItemsPerPageChange,
  };
}
