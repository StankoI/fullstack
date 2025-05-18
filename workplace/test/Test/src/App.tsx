import './App.css'
import ProductList from './components/productList'
import { Product, type Category, type IdType } from './components/product'
import { ApiClient } from './service/api-client';
import useAsyncEffect from './hooks/use-async-effect';
import { useState } from 'react';
import ProductInput from './components/inputProd';
import ProductFilter from './components/filter';

const BASE_URL = 'http://localhost:9000'

const API = new ApiClient(BASE_URL);

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
    const [searchTags, setSearchTags] = useState("");

    useAsyncEffect(async () => {
        const prods = await API.findAll(Product);
        setProducts(prods);
    }, [])


    async function createProd(prod: Omit<Product, 'id'>) {
        try {
            const created = await API.create(Product, prod);
            setProducts(old => [...old, created]);
        } catch (err) {
            console.error(err);
        }
    }

    async function removeProd(id: IdType) {
        try {
            await API.deleteById(Product, id);
            setProducts(prev => prev.filter(todo => todo.id !== id));
        }
        catch (err) {
            console.log(err);
        }
    }

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === "" || product.category === selectedCategory;

        const tagsInput = searchTags
            .toLowerCase()
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);

        const tagsMatch =
            tagsInput.length === 0 ||
            tagsInput.some(tag => product.tags.map(t => t.toLowerCase()).includes(tag));

        return categoryMatch && tagsMatch;
    });

    return (
        <>
            <ProductInput onCreateProduct={createProd} onError={() => { }} />
            <ProductFilter
                selectedCategory={selectedCategory}
                searchTags={searchTags}
                onCategoryChange={setSelectedCategory}
                onTagsChange={setSearchTags}
            />
            <ProductList prods={filteredProducts} onRemoveProduct={removeProd}/>
        </>
    )
}

export default App
