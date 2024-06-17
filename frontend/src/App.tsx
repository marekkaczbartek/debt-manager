import "./output.css";
import AuthProvider from "./AuthContext";
import Routes from "./Routes";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
