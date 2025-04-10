import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./AppNavbar.module.css";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AppNavbar() {
  const { user, logout } = useAuth();

  const location = useLocation();
  const disabledPages = ["/videoadd", "/videoedit/", "/videodelete/", "/videoshow/", "/useradd"];
  let greeting = "";
  const isDisabled = disabledPages.some((page) => location.pathname.startsWith(page));
  if (user) {
    greeting = "Olá, " + user.email;
  }

  return (
    <Navbar fixed="top" expand="sm" className={`bg-body-secondary fs-6 ${styles.navbar}`}>
      <Container>
        {isDisabled ? (
          <Navbar.Brand className="text-danger fs-2 fw-bold">MilkFlix</Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} className="text-danger fs-2 fw-bold" to={"/"}>
            MilkFlix
          </Navbar.Brand>
        )}

        {user ? (
          <>
            <span className="text-dark fst-italic fs-6 me-3">{user ? greeting : ""}</span>

            <div>
              {user.role === "adm" ? (
                <>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggle} />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto fw-medium gap-3">
                      <NavDropdown
                        title={
                          <span className={isDisabled ? styles.dropdownDisabled : ""}>
                            Usuários
                          </span>
                        }
                        id="basic-nav-dropdown"
                        className={isDisabled ? styles.dropdownDisabled : ""}
                        onToggle={(isOpen, e) => isDisabled && e.preventDefault()}
                      >
                        <NavDropdown.Item as={Link} to={"/useradd"}>
                          Adicionar
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">Alterar</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Excluir</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to={"/videoadd"} className={isDisabled ? "disabled" : ""}>
                        Adiciona Vídeo
                      </Nav.Link>

                      <Nav.Link
                        as={Link}
                        style={{ fontFamily: "var(--bs-btn-font-family)" }}
                        className={isDisabled ? "disabled" : ""}
                        onClick={logout}
                      >
                        Sair
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </>
              ) : (
                <Nav.Link
                  as={Link}
                  style={{ fontFamily: "var(--bs-btn-font-family)" }}
                  className={isDisabled ? "disabled" : ""}
                  onClick={logout}
                >
                  Sair
                </Nav.Link>
              )}
            </div>
          </>
        ) : (
          <span>Faça Login</span>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
