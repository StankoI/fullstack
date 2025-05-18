import { useEffect, useState } from "react";
import { Recipe } from "../models/recipe";

type Props = {
    onSubmit: (recipe: Recipe) => Promise<void>;
    initialData?: Recipe;
    mode: "create" | "edit";
};

const RecipeForm = ({ onSubmit, initialData, mode }: Props) => {
    const stored = sessionStorage.getItem("authUser");
    const parsedUser = stored ? JSON.parse(stored) : null;

    const [formData, setFormData] = useState({
        name: "",
        shortDescription: "",
        timeToBeCooked: 0,
        products: "",
        photo: "",
        longDescription: "",
        tags: ""
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                shortDescription: initialData.shortDescription,
                timeToBeCooked: initialData.timeToBeCooked,
                products: initialData.products.join(", "),
                photo: initialData.photo,
                longDescription: initialData.longDescription,
                tags: initialData.tags.join(", "),
            });
        }
    }, [initialData]);

    if (parsedUser === null) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const recipeData: any = {
            userId: parsedUser.id,
            name: formData.name,
            shortDescription: formData.shortDescription,
            timeToBeCooked: Number(formData.timeToBeCooked),
            products: formData.products.split(",").map(p => p.trim()),
            photo: formData.photo,
            longDescription: formData.longDescription,
            tags: formData.tags.split(",").map(t => t.trim()),
            lastEditTime: new Date()
        };

        if (mode === "create") {
            recipeData.sharedTime = new Date();
        }

        if (mode === "edit" && initialData?.id) {
            recipeData.id = initialData.id;
        }

        onSubmit(recipeData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <h3>{mode === "create" ? "Добави нова рецепта" : "Редактирай рецепта"}</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input name="name" placeholder="Име на рецепта" value={formData.name} onChange={handleChange} required />
            <input name="shortDescription" placeholder="Кратко описание" value={formData.shortDescription} onChange={handleChange} required />
            <input type="number" name="timeToBeCooked" placeholder="Време за приготвяне (минути)" value={formData.timeToBeCooked} onChange={handleChange} required />
            <input name="products" placeholder="Продукти (разделени със запетая)" value={formData.products} onChange={handleChange} required />
            <input name="photo" placeholder="URL на снимка" value={formData.photo} onChange={handleChange} required />
            <textarea name="longDescription" placeholder="Подробно описание" value={formData.longDescription} onChange={handleChange} required />
            <input name="tags" placeholder="Тагове (разделени със запетая)" value={formData.tags} onChange={handleChange} />
            <button type="submit">{mode === "create" ? "Публикувай рецепта" : "Запази промените"}</button>
        </form>
    );
};

export default RecipeForm;
