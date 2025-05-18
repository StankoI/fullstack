import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./registerPage.module.css"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        gender: "male",
        role: "user",
        avatarUrl: "",
        bio: "",
        status: "active"
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const usernameRegex = /^\w{1,15}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

        if (!usernameRegex.test(formData.username)) return "Невалидно потребителско име.";
        if (!passwordRegex.test(formData.password)) return "Паролата трябва да съдържа поне 8 символа, една цифра и специален символ.";
        if (formData.bio.length > 512) return "Биографията трябва да е до 512 символа.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const now = new Date().toISOString();
        const avatarFallback =
            formData.avatarUrl ||
            (formData.gender === "male"
                ? "https://example.com/default-male-avatar.png"
                : "https://example.com/default-female-avatar.png");

        const newUser = {
            ...formData,
            avatarUrl: avatarFallback,
            createdAt: now,
            updatedAt: now,
        };

        try {
            await axios.post("http://localhost:9000/users", newUser);
            navigate("/login");
        } catch (err) {
            setError("Грешка при регистрация.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input name="name" placeholder="Име" value={formData.name} onChange={handleChange} required />
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Парола" value={formData.password} onChange={handleChange} required />

            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Мъж</option>
                <option value="female">Жена</option>
            </select>

            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <input name="avatarUrl" placeholder="URL на снимка (по избор)" value={formData.avatarUrl} onChange={handleChange} />
            <textarea name="bio" placeholder="Кратко представяне" maxLength={512} value={formData.bio} onChange={handleChange} />

            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Активен</option>
                <option value="suspended">Спрян</option>
                <option value="deactivated">Деактивиран</option>
            </select>

            <button type="submit">Регистрирай се</button>
        </form>
    );
};

export default RegisterPage;
