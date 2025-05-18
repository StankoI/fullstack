import { Product, type IdType } from "./product";
import ProductItem from "./productItem";

type Props = {
    prods: Product[];
    onRemoveProduct: (id: IdType) => void;
};

const ProductList = ({ prods, ...rest }: Props) => {
    return (
        <>
            {prods.map((prod) => (
                <ProductItem key={prod.id} product={prod} {...rest}/>
            ))}
        </>
    );
};

export default ProductList;
