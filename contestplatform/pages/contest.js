import Contest from '../components/Contest'
import SimpleLayout from '../components/layout/simple'

/**
 * componant for one contest.
 * @returns html code
 */
export default function ContestPage() {
  return (
    <SimpleLayout>
      <div style={{ padding: '50px 0 500px 0' }}>
        {<Contest />}
      </div>
    </SimpleLayout>

  )
}
