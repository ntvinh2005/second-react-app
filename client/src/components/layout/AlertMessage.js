import React from 'react'
import Alert from 'react-bootstrap/Alert'


const AlertMessage = ({ info }) => {
    if (info!=null)
        return (
        <div>
            <Alert variant="danger" >{info.message}</Alert>
        </div>
    )
    else return null
}

export default AlertMessage
