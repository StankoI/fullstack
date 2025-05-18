import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../models/recipe";
import RecipeForm from "../components/editRecipeForm";

const EditRecipePage = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9000/recipes/${id}`)
            .then(response => setRecipe(response.data))
            .catch(error => {
                console.error("Грешка при зареждане на рецептата", error);
                navigate("/not-found");
            });
    }, [id, navigate]);

    const handleSubmit = async (updatedRecipe: Recipe): Promise<void> => {
        try {
            await axios.put(`http://localhost:9000/recipes/${id}`, {
                ...updatedRecipe,
                lastEditTime: new Date().toISOString(),
            });
            navigate("/recipes");
        } catch (err) {
            console.error("Грешка при редакция:", err);
        }
    };

    if (!recipe) return <p>Зареждане...</p>;

    return (
        <div>
            <h2>Редактирай рецепта</h2>
            <RecipeForm
                initialData={recipe}
                onSubmit={handleSubmit}
                mode="edit"
            />
        </div>
    );
};

export default EditRecipePage;
