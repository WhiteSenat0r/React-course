import {Link} from 'react-router-dom'

export default function NotFoundComponent()
{
    return(
        <>
            <h1 className="text-red-600 text-3xl">404</h1>
            <Link to='/'>Return home</Link>
        </>
    )
}