export default function Login(props) {
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
                <input type='button' value='Login' id='submit' onClick={props.login} />
            </form>
        </>
    )
}