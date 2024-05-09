


const checkLoggedIn = async (startVerifyLoading?: () => void, endResponseLoading?:()=>void, setRedirectingLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        startVerifyLoading && startVerifyLoading()
        const userObjectRaw = localStorage.getItem('userObject')
        if (!userObjectRaw)
        return false;
        const userObject = JSON.parse(userObjectRaw)
        const { token } = userObject
        if (!token) return false

        // const isTokenValid = await verifyToken(token)
        const response = await fetch('/api/verifyToken', { method: 'POST', body: JSON.stringify(token) })

        const decodedData = await response.json()
        // console.log(decodedData, ' is decoded data from jsonwebtoken, inside checkLoggedIn function');
        // console.log(decodedData)
        
        if(decodedData.superAdmin){// User is a super admin
        
            
            if (location.pathname.startsWith('/admin/go')  || location.pathname === ('/admin/dashboard'))
            { location.href = '/admin/dashboard/superadmin'}
            
        }
                
        else{ //user is a normal admin


            //if current page is not a section admin not supposed to visit
            if(decodedData.userName && (location.pathname.startsWith ('/admin/go') || location.pathname.startsWith('/admin/dashboard/superadmin') ) ) {location.href = '/admin/dashboard'} 
        }

        if (response.ok) {
            endResponseLoading && endResponseLoading();
            setRedirectingLoading && setRedirectingLoading(true)
            return true;
        } else {
            endResponseLoading && endResponseLoading()
            return false
        }

    } catch (error) {
        console.error(error)
        endResponseLoading && endResponseLoading()
        return false
    }finally{
        endResponseLoading && endResponseLoading()
    }
}

export default checkLoggedIn
