import {schemes, superAdmin} from '@constants/paths'



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
        const response = await fetch('/api/verifyToken', { method: 'POST', body: JSON.stringify(token) });
        if(!response.ok){
            endResponseLoading && endResponseLoading()
            return false
            }
        const decodedData = await response.json()

        if(decodedData){
            localStorage.setItem('userId', decodedData.adminId)
        }
        
        if(decodedData.superAdmin){// User is a super admin
            if(location.href.endsWith('/admin/dashboard/manage')) location.href = superAdmin 
        }
                
        else{ //user is a normal admin

            //if current page is not a section admin not supposed to visit
            if(decodedData.userName && (location.pathname.startsWith ('/admin/go') || location.pathname.startsWith('/admin/dashboard/superadmin') ) ) {location.href = schemes} 
        }

            endResponseLoading && endResponseLoading();
            setRedirectingLoading && setRedirectingLoading(true)
            return true;
        

    } catch (error) {
        console.error(error)
        endResponseLoading && endResponseLoading()
        return false
    }finally{
        endResponseLoading && endResponseLoading()
    }
}

export default checkLoggedIn
