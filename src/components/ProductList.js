import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { useProductsContext } from '../context/products_context';
import GridView from './GridView';
import ListView from './ListView';
import Loading from './Loading';
import Error from './Error';

const ProductList = () => {
	const { filtered_products: products, grid_view } = useFilterContext();
	const { products_loading: loading, products_error: error } =
		useProductsContext();

	if (loading) return <Loading />;
	if (error) return <Error />;

	if (!grid_view) {
		return <ListView products={products} />;
	}
	if (products.length < 1) {
		return (
			<h5 style={{ textTransform: 'none' }}>
				Sorry, no products matched your search!
			</h5>
		);
	}

	return <GridView products={products}></GridView>;
};

export default ProductList;
