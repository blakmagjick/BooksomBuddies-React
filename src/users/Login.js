export default function Login (props) {
    const button = props.button
    const loggedIn = props.loggedIn
    if (button === true && loggedIn === false)
    return(
        <>
            <form id='loginform'>
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
                <input className='btn btn-secondary btn-sm' type='button' value='Login' id='loginsubmit' onClick={props.login} />
            </form>
        </>
    )
    else 
    return (
        <>
        </>
    )
}