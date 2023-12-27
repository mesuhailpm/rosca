import Confirmation from '@components/Confirmation'
import LoaderSpinner from '@components/Spinner'
import Layout from '@components/Layout'


const layout = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className='p-2 '>
            {/* Adding a Layout as component as building fails on Vercel as useStore can be used only on custom hooks and
            React Hook "useStore" is called in function "layout" that is neither a React function component nor a custom React Hook function.
            React component names must start with an uppercase letter. React Hook names must start with the word "use".  react-hooks/rules-of-hooks
            */}
            <Layout />

            {/* Adding a Layout as component as building fails on Vercel as useStore can be used only on custom hooks and
            React Hook "useStore" is called in function "layout" that is neither a React function component nor a custom React Hook function.
            React component names must start with an uppercase letter. React Hook names must start with the word "use".  react-hooks/rules-of-hooks
            */}
            <Layout />

            {children}

            <Confirmation />
            <LoaderSpinner color='#000000' />
        </div>
    )
}

export default layout
