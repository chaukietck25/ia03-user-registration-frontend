import Form from "../components/Form";

function Register() {
  return <Form route="/api/user/register" method="register" />;
}

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const history = useHistory();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/auth/register", {
//         email,
//         password,
//       });
//       console.log(response);
//       history.push("/login");
//     } catch (err) {
//       setError(err.response.data);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//       {error && <span style={{ color: "red" }}>{error}</span>}
//     </div>
//   );
// }

export default Register;