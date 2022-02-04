import Contest from '../components/contest-ADM'
import SimpleLayout from '../components/layout/simple'

/**
 * componant for editing one contest.
 * @returns html code
 */
export default function ContestAdm() {
  return (
    <SimpleLayout>
      <div style={{ padding: '50px 0 500px 0' }}>
        {<Contest/>}
      </div>
    </SimpleLayout>

  )
}
