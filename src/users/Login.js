export default function Login (props) {
    const button = props.button
    const loggedIn = props.loggedIn
    if (button === true && loggedIn === false)
    return(
        <>
            <form className="bg-transparent shadow-md rounded px-3 pt-0 mb-3" id='loginform'>
                <label>Username:</label>
                <input 
                    type='text'
                    id='loginname'
                    name='username'
                    onChange={(event) => props.change(event)}
                />
                <label>Password:</label>
                <input 
                    type='password'
                    id='loginpw'
                    name='password'
                    onChange={(event) => props.change(event)}
                />
                <input className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' type='button' value='Login' id='loginsubmit' onClick={props.login} />
            </form>
        </>
    )
    else 
    return (
        <>
        </>
    )
}