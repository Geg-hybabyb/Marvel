import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Helmet } from "react-helmet";

const Page404 = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="page not found"
                    />
                <title>404</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page not found</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </>
    )
}

export default Page404;