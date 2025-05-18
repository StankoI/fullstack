import { Recipe } from "../models/recipe";
import type { IdType } from "../types/commonType";
import styles from "./recipeItem.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
    recipe: Recipe;
    onDelete:(RecipeId: IdType) => void;
};

const RecipeItem = ({ recipe, onDelete }: Props) => {
    const navigate = useNavigate();
    const stored = window.sessionStorage.getItem('authUser');
    const parsedUser = stored ? JSON.parse(stored) : null;

    const deleteRecipe = () =>{
        onDelete(recipe.id);
    }

     const handleEdit = () => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    return (
        <div className={styles["recipe-card"]}>
            <img
                className={styles["recipe-photo"]}
                src={recipe.photo}
                alt={recipe.name}
            />
            <div className={styles["recipe-content"]}>
                <h3 className={styles["recipe-title"]}>{recipe.name}</h3>
                <p className={styles["recipe-description"]}>
                    {recipe.shortDescription}
                </p>
                <p className={styles["recipe-time"]}>
                    Време за приготвяне: {recipe.timeToBeCooked} мин.
                </p>
                <div className={styles["tags"]}>
                    {recipe.tags.map((tag, idx) => (
                        <span key={idx} className={styles["tag"]}>
                            #{tag}
                        </span>
                    ))}
                </div>
                {parsedUser?.id === recipe.userId && (<div className={styles["buttons"]}>
                    <div className={styles["button"]} onClick={handleEdit}>редактирай</div>
                    <div className={styles["button"]} onClick={deleteRecipe}>изтрий</div>
                </div>)}
            </div>

        </div>
    );
};

export default RecipeItem;
