import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const RequireAuth = (props) => {
  const { role, children } = props
    const navigate = useNavigate();
  useEffect(() => {
roleChecker()  }, [])
  function hasMatchingItem(array1, array2) {
// if null retun
    if (array1 == null || array2 == null) {
       return false;
    }
    for (let i = 0; i < array1.length; i++) {
    if (array2.includes(array1[i])) {
      return true;
    }
    }
    console.log("first")
  return false;
}

// Example usage:
const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9, 3];

console.log(hasMatchingItem(array1, array2)); // Output: true

    const roleChecker = async() => {
      const userole = await JSON.parse(localStorage.getItem("userrole"))
      console.log(userole)
      console.log(role)

        if (!hasMatchingItem(role,userole)) {
          navigate("/login")
            
        }
}
  return (
      <div className="aaa">{children }</div>
  )
}

export default RequireAuth