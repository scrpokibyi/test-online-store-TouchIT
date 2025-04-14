import { useEffect, useState, useCallback } from "react";
import { PREFIX } from "../helpers/API";
import { Product } from "../interfaces/product.interface";
import axios, { AxiosError } from "axios";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [categories, setCategories] = useState<string[]>([]);

  const fetchProducts = useCallback(
    async (category: string = "", limit: number = 20) => {
      try {
        setIsLoading(true);
        setError(undefined);

        let url = `${PREFIX}/products`;
        if (category) {
          url = `${PREFIX}/products/category/${category}`;
        }

        const response = await axios.get<Product[]>(url, { params: { limit } });
        setProducts(response.data);
        setIsLoading(false);
        return response.data;
      } catch (e) {
        console.error(e);
        if (e instanceof AxiosError) {
          setError(e.message);
        }
        setIsLoading(false);
        return [];
      }
    },
    []
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get<string[]>(
        `${PREFIX}/products/categories`
      );
      setCategories(response.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      await fetchCategories();
    };
    loadData();
  }, [fetchProducts, fetchCategories]);

  return {
    products,
    isLoading,
    error,
    categories,
    fetchProducts,
    fetchCategories,
  };
}
