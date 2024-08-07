import {Link} from 'react-router-dom'

export default function SignInComponent()
{
    return(
        <>
            <h1 className="text-green-600 text-3xl">Sign-in</h1>
            <Link to='/'>Return home</Link>
        </>
    )
}