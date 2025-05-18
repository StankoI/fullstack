import { type ChangeEvent, useCallback } from "react";
import type { Category } from "../components/product"

type Props = {
    selectedCategory: Category | "";
    searchTags: string;
    onCategoryChange: (category: Category | "") => void;
    onTagsChange: (tags: string) => void;
};

const ProductFilter = ({selectedCategory,searchTags,onCategoryChange,onTagsChange }: Props) => {

    const handleCategoryChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            onCategoryChange(event.target.value as Category | "");
        },
        [onCategoryChange]
    );

    const handleTagsChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onTagsChange(event.target.value);
        },
        [onTagsChange]
    );

    return (
        <div>
            <label>
                Categories:
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Всички</option>
                    <option value="Computers">Computers</option>
                    <option value="Phones">Phones</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Software">Software</option>
                </select>
            </label>

            <label>
                Tags:
                <input
                    type="text"
                    value={searchTags}
                    onChange={handleTagsChange}
                    placeholder="exmle"
                />
            </label>
        </div>
    );
};

export default ProductFilter;
