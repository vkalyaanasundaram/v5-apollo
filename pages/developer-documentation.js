import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DeveloperDocument() {
    return (
        <>
            <Header />
            <div className="mt-10">
                <iframe src="https://sandbox.kapitus.com/docs/" width="100%" height="650px" />
            </div>
            <Footer />
        </>
    )
}