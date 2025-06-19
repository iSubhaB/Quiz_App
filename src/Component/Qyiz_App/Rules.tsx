
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Question_Quiz } from './Question'
import { Quiz_App } from './Selection'
import { Certification } from './Certification'

export const Rules_Quiz = () => {
    return (
        <>
            <BrowserRouter>
           
                <Routes>
                    <Route path='' element={ <Quiz_App/>}></Route>
                    <Route path='/question/:catagory' element={<Question_Quiz />} />
                    <Route path='/certificate/:score' element={ <Certification/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
