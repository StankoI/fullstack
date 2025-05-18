import { Recipe } from "../models/recipe";
import type { IdType } from "../types/commonType";
import RecipeItem from "./recipeItem";
import styles from "./recipeList.module.css"

type Props = {
    recipes: Recipe[];
    onDelete:(recipeId: IdType) => void;
}

const RecipeList = ({ recipes, ...rest }: Props) => {

    return (
        <div className={styles["container"]}>
            {recipes.map(recipe => (<RecipeItem key={recipe.id} recipe={recipe} {...rest} />))}
        </div>
    );
}

export default RecipeList;