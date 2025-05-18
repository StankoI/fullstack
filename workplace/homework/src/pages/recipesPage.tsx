import { useEffect, useState } from "react";
import type { Recipe } from "../models/recipe";
import RecipesList from "../components/recipesList";
import axios from "axios";
import AddRecipeForm from "../components/addRecipeForm";
import RecipeFilter from "../components/recipesFilter";

const RecipesPage = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [filter, setFilter] = useState({ tag: "", userId: "" });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get<Recipe[]>("http://localhost:9000/recipes");
                setRecipes(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        let result = recipes;

        if (filter.tag) {
            result = result.filter((r) =>
                r.tags.some((tag) =>
                    tag.toLowerCase().includes(filter.tag.toLowerCase())
                )
            );
        }

        if (filter.userId) {
            result = result.filter((r) => r.userId === filter.userId);
        }

        result = result.sort((a, b) => {
            return new Date(b.lastEditTime).getTime() - new Date(a.lastEditTime).getTime();
        });

        result = result.slice(0, 10);

        setFilteredRecipes(result);
    }, [recipes, filter]);

    const deleteRecipe = async (id: string) => {
        try {
            await axios.delete(`http://localhost:9000/recipes/${id}`);
            setRecipes((prev) => prev.filter((r) => r.id !== id));
        } catch (error) {
            console.error("Грешка при изтриване на рецепта:", error);
        }
    };

    return (
        <>
            <AddRecipeForm />
            <RecipeFilter filter={filter} onFilterChange={setFilter} />
            <RecipesList recipes={filteredRecipes} onDelete={deleteRecipe}></RecipesList>
        </>
    );
}

export default RecipesPage;