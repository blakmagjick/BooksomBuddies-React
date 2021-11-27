export default function Register (props) {
    const buttonId = props.buttonId
    const loggedIn = props.loggedIn
    if (buttonId === true && loggedIn === false) 
    return (
        <>
            <form id='regform'>
                <label>Username:</label>
                <input 
                    type='text'
                    id='regname'
                    name='username'
                    onChange={(event) => props.change(event)}
                />
                <label>Email:</label>
                <input 
                    type='text'
                    id='regemail'
                    name='email'
                    onChange={(event) => props.change(event)}
                />
                <label>Password:</label>
                <input 
                    type='password'
                    id='regpw'
                    name='password'
                    onChange={(event) => props.change(event)}
                />
                <input type='button' value='Register' id='regsubmit' onClick={props.register} />
            </form>
        </>
    )
    else 
    return(
        <></>
    )
    // else 
    // return (
    //     <button onClick={props.setButton}>Register</button>
    // )
}