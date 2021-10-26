import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

console.log("--> Startseite")
export default function Startseite() {
    const { query } = useRouter()
    const router = useRouter()
    
    return (
        <div>
            <Button onClick={() => router.push(`/mitarbeiter/profil?param=${query.param}`)}>Profil</Button>
            <Button onClick={() => router.push(`/auftrag/uebersicht?param=${query.param}`)}>Übersicht</Button>
            <Button onClick={() => router.push(`/auftrag/formular?param=${query.param}`)}>Freigabe</Button>
        </div>
    )
}