//import { data } from './index'

// export default function handler(req, res) {
//     const { auftragID } = req.query

//     if (req.method === 'GET') {


//         const auftrag = data.find((auftrag) => auftrag.ID === parseInt(auftragID))
//         res.status(200).json(auftrag)
//     } else if (req.method === 'DELETE') {
//         const deletedAuftrag = data.find(
//             (auftrag) => auftrag.ID === parseInt(auftragID)
//         )

//         const index = data.findIndex(
//             auftrag => auftrag.ID === parseInt(auftragID)
//         )
//         data.splice(index, 1)

//         res.status(200).json(deletedAuftrag)

//     }
// }

const ContactPage = () => {
    return <h1>This is contact page</h1>;
  };
  
  export default ContactPage;
