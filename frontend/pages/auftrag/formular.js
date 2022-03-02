import { useRouter } from 'next/router';
import Appbar from '../../components/AppBars'
import FormularGrid from '../../components/Auftrag/FormularGrid'

console.log("--> Formular")

export default function Formular() {

    const { query } = useRouter()
  
    return (
        <form>
            <div>
                <Appbar StartseiteButton="" Überschrift="Auftrag" Kurzzeichen={query.param} />
                <FormularGrid/>
            </div>
        </form>
    )
}





