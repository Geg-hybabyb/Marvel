import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Page404 = () => {
    return(
        <>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page not found</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </>
    )
}

export default Page404;