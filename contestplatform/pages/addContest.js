import AddContest from '../components/AddContest'
import SimpleLayout from '../components/layout/simple'

/**
 * componant for adding one contest.
 * @returns html code
 */
export default function addContest() {
  return (
    <SimpleLayout>
      <div style={{ padding: '50px 0 500px 0' }}>
        {<AddContest />}
      </div>
    </SimpleLayout>

  )
}
