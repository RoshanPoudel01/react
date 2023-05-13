import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const RequireAuth = (props) => {
    const { role, children } = props
    const navigate = useNavigate();
  useEffect(() => {
roleChecker()  }, [])
  
    const roleChecker = async() => {
        const userole = await localStorage.getItem("userrole")
        if (userole !== role) {
          navigate("/signup")
            
        }
}
  return (
      <div>{children }</div>
  )
}

export default RequireAuth