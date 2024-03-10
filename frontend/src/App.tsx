import './App.css';
import StartPage from './Pages/StartPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';
import { Fragment, useState } from 'react';
import { Developer } from './Pages/Developer';
import { AuthCompany, AuthDeveloper, AuthHR, AuthUser } from './Pages/Auth';
import Company from './Pages/Company';
import { ContestEditPage } from './Pages/Contest';
import User from './Pages/User';
import UserContests from './Pages/UserContests';
import UserTasks, { ContestResult } from './Pages/UserTasks';
import HR from './Pages/HR';
import HRTechInterviews, { HRPlanTechInterview } from './Pages/HRTechInterviews';
import UserTechInterviews from './Pages/UserTechInterview';
import DeveloperTechInterviews from './Pages/DeveloperTechInterviews';
import CommentPage from './Pages/TechInterviewComment';


const App = () => {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const customSetToken = (t: string) => {
    setToken("Bearer " + t);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<StartPage />}/>
        <Route path='/login' element={<Login setRole={setRole} setToken={customSetToken}/>} />
        <Route path='/register' element={<Register setRole={setRole} setToken={customSetToken}/>} />
        <Route path='/main' element={<Main role={role} />} />
        <Route path='/company/*' element={
          <Fragment>
            <Routes>
              <Route path='' element={<Company token={token} role={role}/>}/>
              <Route path='contest/:id' element={<ContestEditPage token={token} />} />
              <Route path='contest/add' element={<ContestEditPage token={token} />} />
            </Routes>
            <AuthCompany role={role} fallbackPage='/main'/>
          </Fragment>
        }/>
        <Route path='/user/*' element={
          <Fragment>
            <Routes>
              <Route path='' element={ <User /> }/>
              <Route path='contests' element={ <UserContests token={token} role={role} /> }/>
              <Route path='contest/:id' element = { <UserTasks token={token} /> } />
              <Route path='contest/:id/results' element = { <ContestResult token={token} /> } />
              <Route path='tech-interview' element={ <UserTechInterviews token={token} role={role} /> }/>
              <Route path='team-interview' element={ <User /> }/>
              <Route path='offer' element={ <User /> }/>
            </Routes>
            <AuthUser role={role} fallbackPage='/main'/>
        </Fragment>
        } />
        <Route path='/developer/*' element={
          <Fragment>
            <Routes>
              <Route path='' element={ <Developer /> } />
              <Route path='tech-interview' element={ <DeveloperTechInterviews token={token} role={role} /> }/>
              <Route path='team-interview' element={ <Developer /> }/>
              <Route path='tech-interview/:interview_id/task/:task_id/comment' element={ <CommentPage token={token} /> }/>
            </Routes>
            <AuthDeveloper role={role} fallbackPage='/main'/>
        </Fragment>
        } />
        <Route path='/hr/*' element={
          <Fragment>
            <Routes>
              <Route path='' element={ <HR token={token}/> } />
              <Route path='tech-interview' element={ <HRTechInterviews token={token} role={role} /> }/>
              <Route path='tech-interview/add' element={ <HRPlanTechInterview token={token} /> }/>
              <Route path='team-interview' element={ <HR token={token} /> }/>
              <Route path='team-interview/add' element={ <HR token={token} /> }/>
              <Route path='offer' element={ <HR token={token} /> }/>
              <Route path='offer/add' element={ <HR token={token} /> }/>
            </Routes>
            <AuthHR role={role} fallbackPage='/main'/>
        </Fragment>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
