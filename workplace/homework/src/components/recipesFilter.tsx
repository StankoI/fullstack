import { type ChangeEvent, useEffect, useState } from "react";
import { User } from "../models/user";

type Props = {
    filter: {
        tag: string;
        userId: string;
    };
    onFilterChange: (filter: { tag: string; userId: string }) => void;
};

const RecipeFilter = ({ filter, onFilterChange }: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:9000/users")
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.error("Error loading users", err));
    }, []);

    const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filter, tag: e.target.value });
    };

    const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ ...filter, userId: e.target.value });
    };

    return (
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
            <input
                type="text"
                placeholder="Филтър по таг"
                value={filter.tag}
                onChange={handleTagChange}
            />

            <select value={filter.userId} onChange={handleUserChange}>
                <option value="">Всички автори</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RecipeFilter;
