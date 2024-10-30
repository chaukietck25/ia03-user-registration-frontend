import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post(route, {
                email,
                password,
            });

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
                navigate("/");
            } else {
                navigate("/");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
        />
        <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
        />
        <button className='form-button' type="submit" disabled={loading}>
            {name}
        </button>   
    </form>;
}

export default Form;