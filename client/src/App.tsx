import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomeScreen, RoomScreen, RegisterScreen, LoginScreen } from '@screens'

const App = () => (
  <Router>
    <Route path='/' exact component={HomeScreen} />
    <Route path='/room/:id' component={RoomScreen} />
    <Route path='/register/' component={RegisterScreen} />
    <Route path='/login/' component={LoginScreen} />
  </Router>
)

export default App
