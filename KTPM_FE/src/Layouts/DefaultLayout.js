import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
function DefaultLayout({ children }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            <Header />
            <main style={{ flex: 1, paddingTop: "100px" }} className="container">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout; 