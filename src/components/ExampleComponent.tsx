import {Link} from 'react-router-dom'

export default function ExampleComponent()
{
    return(
        <>
            <h1 className="text-3xl font-bold underline font-sans">
                Hello world!
            </h1>
            <div className="flex flex-col">
                <Link to='/invalid-route' className='my-2'>Test invalid route</Link>
                <Link to='/sign-in' className='my-2'>Test sing-in route</Link>
            </div>
        </>
    )
}