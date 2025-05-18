import { useState } from "react";
import axios from "axios";
import { Recipe } from "../models/recipe";

const AddRecipeForm = ({ onRecipeAdded }: { onRecipeAdded?: () => void }) => {
    const stored = sessionStorage.getItem('authUser');
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
    const [success, setSuccess] = useState<boolean>(false);

    if (parsedUser === null) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);


        const newRecipe: Omit<Recipe, "id"> = {
            userId: parsedUser.id,
            name: formData.name,
            shortDescription: formData.shortDescription,
            timeToBeCooked: Number(formData.timeToBeCooked),
            products: formData.products.split(",").map(p => p.trim()),
            photo: formData.photo,
            longDescription: formData.longDescription,
            tags: formData.tags.split(",").map(t => t.trim()),
            sharedTime: new Date(),
            lastEditTime: new Date(),
        };

        try {
            await axios.post("http://localhost:9000/recipes", newRecipe);
            setSuccess(true);
            setFormData({
                name: "",
                shortDescription: "",
                timeToBeCooked: 0,
                products: "",
                photo: "",
                longDescription: "",
                tags: ""
            });
            if (onRecipeAdded) onRecipeAdded();
        } catch {
            setError("Грешка при съхраняване на рецептата.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <h3>Добави нова рецепта</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Рецептата е добавена успешно!</p>}

            <input name="name" placeholder="Име на рецепта" value={formData.name} onChange={handleChange} required />
            <input name="shortDescription" placeholder="Кратко описание" value={formData.shortDescription} onChange={handleChange} required />
            <input type="number" name="timeToBeCooked" placeholder="Време за приготвяне (минути)" value={formData.timeToBeCooked} onChange={handleChange} required />
            <input name="products" placeholder="Продукти (разделени със запетая)" value={formData.products} onChange={handleChange} required />
            <input name="photo" placeholder="URL на снимка" value={formData.photo} onChange={handleChange} required />
            <textarea name="longDescription" placeholder="Подробно описание" value={formData.longDescription} onChange={handleChange} required />
            <input name="tags" placeholder="Тагове (разделени със запетая)" value={formData.tags} onChange={handleChange} />
            <button type="submit">Публикувай рецепта</button>
        </form>
    );
};

export default AddRecipeForm;
