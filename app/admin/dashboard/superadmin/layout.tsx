

const layout = async ({ children }: { children: React.ReactNode}) => {



    

    return (
        <div className='superadminlayout border-4 bg-slate-900/50 border-green-500 w-full' >
            <h1 className='text-center md:text-3xl font-bold text-cyan-200'>Master Admin Page</h1>
            {children}
            </div>
    )
}

export default layout
