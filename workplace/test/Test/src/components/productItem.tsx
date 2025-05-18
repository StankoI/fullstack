import type { IdType, Product } from "./product";

type Props = {
    product: Product;
    onRemoveProduct: (id: IdType) => void;
};

const ProductItem = ({ product , onRemoveProduct}: Props) => {

    function removeProd(){
        onRemoveProduct(product.id);
    }

    return (
        <div className="ProductItem-card">
            <h3>{product.name}</h3>
            <p>{product.info}</p>
            <p>Price: €{product.price.toFixed(2)}</p>
            <p>categoty: {product.category}</p>
            <img src={product.imageUrl} width="150" />
            <p>tags: {product.tags.join(", ")}</p>
            <button onClick={removeProd}></button>
        </div>
    );
};

export default ProductItem;
