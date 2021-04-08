import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Join, Room } from '@components'

const App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/room' component={Room} />
  </Router>
)

export default App
