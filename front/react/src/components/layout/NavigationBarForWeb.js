import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function NavigationBarForWeb() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark text-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" className="logo" style={{ height: '40px' }} />
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">NEWS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wallet">WALLET</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">SUPPORT</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">SETTINGS</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


