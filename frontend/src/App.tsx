import "./output.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import RegisterForm from "./register/RegisterForm";
import Footer from "./components/Footer";
import RegisterNavbar from "./register/RegisterNavbar";
import LoginForm from "./login/LoginForm";
import AuthProvider from "./AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Routes from "./Routes";

function App() {
    return (
        // <AuthProvider>
        //     <BrowserRouter>
        //         <div className="min-h-screen flex flex-col">
        //             <RegisterNavbar />
        //             <div className="flex-grow flex items-center justify-center">
        //                 <Routes>
        //                     <ProtectedRoute>
        //                         <Route
        //                             path="/home"
        //                             element={
        //                                 <Home
        //                                 // username={user?.username}
        //                                 // email={user?.email}
        //                                 />
        //                             }
        //                         ></Route>
        //                     </ProtectedRoute>
        //                     <Route
        //                         path="/register"
        //                         element={<RegisterForm />}
        //                     ></Route>
        //                     <Route
        //                         path="/login"
        //                         element={<LoginForm />}
        //                     ></Route>
        //                 </Routes>
        //             </div>
        //             <Footer />
        //         </div>
        //     </BrowserRouter>
        // </AuthProvider>

        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
