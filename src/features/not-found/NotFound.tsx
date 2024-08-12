import {Link} from 'react-router-dom'
import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

export default function NotFound()
{
    return(
        <>
            <h1 className="text-red-600 text-3xl">404</h1>
            <Link to={APP_ROUTES.USERS}>Return to users</Link>
        </>
    )
}