import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomeScreen, RoomScreen } from '@screens'

const App = () => (
  <Router>
    <Route path='/' exact component={HomeScreen} />
    <Route path='/room/:id' component={RoomScreen} />
  </Router>
)

export default App
